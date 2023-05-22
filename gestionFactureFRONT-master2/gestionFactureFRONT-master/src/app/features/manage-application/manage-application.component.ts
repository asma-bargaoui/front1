import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationService } from '../services/application.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-manage-application',
  templateUrl: './manage-application.component.html',
  styleUrls: ['./manage-application.component.scss']
})
export class ManageApplicationComponent implements OnInit {

  visible!: boolean;
  update!: boolean
  applicationForm!: FormGroup;
  applicationUpdateForm!: FormGroup
  applications: any[] = [];
  termToFind: string = ""
  helper = new JwtHelperService()

  constructor(private fb: FormBuilder, private applicationService: ApplicationService, private dialogService: DialogService){}

  ngOnInit(): void {
    const jwt = localStorage.getItem("jwt")!;
    console.log(jwt);
    
    const decodedJwt = this.helper.decodeToken(jwt);
    console.log(decodedJwt);
    
    this.getAllApplications()
    this.initForm()
    this.initUpdateForm()
  }

  openDialog(){
    this.visible = true;
  }

  initForm(){
    this.applicationForm = this.fb.group({
      code: ["", Validators.required],
      libelle: ["", Validators.required],
      prix: ["", Validators.required]
    })
  }

  initUpdateForm(){
    this.applicationUpdateForm = this.fb.group({
      code: ["", Validators.required],
      libelle: ["", Validators.required],
      prix: ["", Validators.required]
    })
  }

  submitApplication(){
    this.applicationService.addNewApplication(this.applicationForm.value).subscribe((data:any)=>{
      this.visible = false;
      this.getAllApplications();
    })
    this.applicationForm.reset();
    console.log(this.applicationForm.value);
    
  }

  getAllApplications(){
    this.applicationService.getAllApplications().subscribe((data: any)=>{
      this.applications = data
      console.log(data);
      this.applications = data;
    })
  }

  openUpdateDialog(app: any){
    if(localStorage.getItem("role")==="ROLE_USER"){
      return;
    }else if(localStorage.getItem("role")==="ROLE_ADMIN"){
      this.update = true;
      this.applicationUpdateForm.patchValue({
        code: app.code,
        libelle: app.libelle,
        prix: app.prix
      })
    }
  }

 

  deleteApp(app: any){
    if(localStorage.getItem("role")==="ROLE_USER"){
      return;
    }else if(localStorage.getItem("role")==="ROLE_ADMIN"){
      if(confirm("Supprimer cette application?!")){
        this.applicationService.deleteApplication(app.id).subscribe((data: any)=>{
          console.log(data);
          this.getAllApplications()
        })
      }
    }
    
  }
 
}
