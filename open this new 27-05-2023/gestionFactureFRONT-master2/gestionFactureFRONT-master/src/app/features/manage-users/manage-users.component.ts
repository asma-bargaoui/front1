import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';
import {  AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  userRoleCount!: number;
  adminRoleCount!: number;
  userForm!: FormGroup;
  userUpdateForm!: FormGroup;
  chart: any;
  visible!: boolean;
  update!: boolean;
  roles: any[] = [];
  allUsers: any[] = []
  delete!: boolean
  username!: string
  search!: string;
  filter: string = '';

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,public dialog: MatDialog
    ){}
     
    
    sortUsers(column: string, order: string) {
     
      if (column === 'username') {
        if (order === 'asc') {
          this.allUsers.sort((a, b) => a.username.localeCompare(b.username));
        } else if (order === 'desc') {
          this.allUsers.sort((a, b) => b.username.localeCompare(a.username));
        }
      }
      // Add additional logic for sorting based on other columns if needed
    }
  ngOnInit(): void {
    this.userRoleCount = 0;
    this.adminRoleCount = 0;
    this.initForm()
    this.initUpdateForm()
    this.getAllRoles()
    this.getAllUsers()

    //this.createChartDoughnutCategorie();
    
  }
  


  openDialog(){
    this.visible = true;
  }

  initForm(){
    this.userForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      roles: ["", Validators.required]
    })
  }

  initUpdateForm(){
    this.userUpdateForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      roles: ["", Validators.required]
    })
  }

  getAllRoles(){
    this.roleService.getAllRoles().subscribe((rolesData: any[])=>{
      this.roles = rolesData;
      console.log(rolesData);
    
    })
  }


  calculateRoleCounts() {
    this.userRoleCount = 0;
    this.adminRoleCount = 0;
    for (const user of this.allUsers) {
      for (const role of user.roles) {
        if (role.name === 'ROLE_USER') {
          this.userRoleCount++;
          break; // Exit the inner loop once the ROLE_USER is found
        }
        if (role.name === 'ROLE_ADMIN') {
          this.adminRoleCount++;
          break; // Exit the inner loop once the ROLE_ADMIN is found
        }
      }
    }
  
  }
  private createChartDoughnutCategorie(): void {
    const canvas = document.getElementById('analyseCategorie') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
  
    this.chart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Users', 'Admins'],
        datasets: [{
          label: 'User and Admin Counts',
          data: [this.userRoleCount, this.adminRoleCount],
          backgroundColor: ['blue', 'red']
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        aspectRatio: 1
      }
    });
  }
  
  
  submitUser(){
    console.log(this.userForm.value);    
    this.userService.saveNewUser(this.userForm.value).subscribe((res: any)=>{
      console.log(res);
      this.visible = false;
      this.getAllUsers()
      const successMsg = 'User saved successfully.';
      console.log(successMsg);
    },
    (error: any) => {
      console.log(error);
      const errorMsg = error?.error?.message || 'An error occurred while saving the user.';
      console.log(errorMsg);

    })
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((data: any[])=>{
      console.log(data);
      this.allUsers = data
      this.calculateRoleCounts();
    })
   
  }

  openUpdateDialog(user: any){
    this.update = true;
    this.userUpdateForm.patchValue({
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.roles[0]
    })
  }

  updateUser(){
    this.userService.updateUser(this.userUpdateForm.value).subscribe((data: any)=>{
      console.log(data);
      this.getAllUsers();
      this.update = false;
    })
  }

  openDeleteDialog(username: string){
    this.delete= true;
    this.username = username;
    
    
  }

  deleteUser(){
    this.userService.deleteUser(this.username).subscribe((data: any)=>{
      this.getAllUsers();
      console.log(data);
      this.delete= false
    })
  }
searchUser(){this.userService.deleteUser(this.username).subscribe((data: any)=>{this.getAllUsers();
console.log(data);
})

}

toggleBlock(user: any): void {
  const blockUrl = `http://localhost:8060/api/test/${user.blocked ? 'unblock' : 'block'}/${user.id}`;
  
  this.http.put(blockUrl, {}).subscribe(
    (response: any) => {
      // Handle the response if needed
      console.log(response);
    },
    (error: any) => {
      // Handle errors if any
      console.error(error);
    }
  );
}

}