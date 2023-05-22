import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConventionService } from '../services/convention.service';
import * as moment from 'moment';

@Component({
  selector: 'app-manage-convention',
  templateUrl: './manage-convention.component.html',
  styleUrls: ['./manage-convention.component.scss'],
})
export class ManageConventionComponent implements OnInit {
  
  conventionForm!: FormGroup;
  visible!: boolean
  conventionList : any[] = []
  constructor(private fb: FormBuilder, private conventionService: ConventionService){}

  ngOnInit(): void {
    this.initForm()
    this.getAllConventions()
  }

  oopenDialog(){
    this.visible = true;
  }

  initForm(){
    this.conventionForm = this.fb.group({
      application: ["", Validators.required],
      structure: ["", Validators.required],
      nbr_reel: [0, Validators.required],
      nbr_Min: [0, Validators.required],
      nbr_Max: [0, Validators.required],
      dateSignature: ["", Validators.required],
      dueDate: ["", Validators.required],
      conventionDuration: [0, Validators.required],
    })
  }

  submitConvention(){
    const dateSignatureYear = new Date(this.conventionForm.value.dateSignature).getFullYear()
    const dateSignatureday = new Date(this.conventionForm.value.dateSignature).getDate()
    const dateSignaturemonth = new Date(this.conventionForm.value.dateSignature).getMonth()+1
    const d = `${dateSignatureday}-${dateSignaturemonth}-${dateSignatureYear}`
    
    
    console.log(d);
    console.log(dateSignatureday);
    console.log(dateSignaturemonth);
    
    const convention = {...this.conventionForm.value, dateSignature:  moment(new Date(this.conventionForm.value.dateSignature)).format("DD-MM-yyyy"),
    dueDate:  moment(new Date(this.conventionForm.value.dueDate)).format("DD-MM-yyyy") }
    
    
    this.conventionService.createConvention(convention).subscribe((data: any)=>{
      console.log(data);
      this.conventionForm.reset();
      this.getAllConventions()
      this.visible = false;      
    })
  }

  getAllConventions(){
    this.conventionService.getAllConvention().subscribe((data: any[])=>{
      console.log(data);
      this.conventionList = data
    })
  }
}
