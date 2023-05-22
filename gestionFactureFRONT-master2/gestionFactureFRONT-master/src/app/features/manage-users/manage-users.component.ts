import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from '../services/role.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  userForm!: FormGroup;
  userUpdateForm!: FormGroup;

  visible!: boolean;
  update!: boolean;
  roles: any[] = [];
  allUsers: any[] = []
  delete!: boolean
  username!: string
  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private userService: UserService){}
  ngOnInit(): void {
    this.initForm()
    this.initUpdateForm()
    this.getAllRoles()
    this.getAllUsers()
  }

  openDialog(){
    this.visible = true;
  }

  initForm(){
    this.userForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ["", Validators.required]
    })
  }

  initUpdateForm(){
    this.userUpdateForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      role: ["", Validators.required]
    })
  }

  getAllRoles(){
    this.roleService.getAllRoles().subscribe((rolesData: any[])=>{
      this.roles = rolesData;
      console.log(rolesData);
      
    })
  }

  submitUser(){
    console.log(this.userForm.value);
    
    this.userService.saveNewUser(this.userForm.value).subscribe((res: any)=>{
      console.log(res);
      this.visible = false;
      this.getAllUsers()
      
    })
  }

  getAllUsers(){
    this.userService.getAllUsers().subscribe((data: any[])=>{
      console.log(data);
      this.allUsers = data
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

}
