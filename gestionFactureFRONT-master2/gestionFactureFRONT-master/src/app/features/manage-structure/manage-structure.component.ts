import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StructureService } from '../services/structure.service';

@Component({
  selector: 'app-manage-structure',
  templateUrl: './manage-structure.component.html',
  styleUrls: ['./manage-structure.component.scss']
})
export class ManageStructureComponent implements OnInit {

  visible!: boolean;
  update!: boolean;
  ministereList: any[] = [];
  structureList: any[] = [];
  structureForm!: FormGroup;
  structureUpdateForm!: FormGroup
  delete!: boolean;
  structId!: number;
  constructor(private fb: FormBuilder, private structureService: StructureService){}

  ngOnInit(): void {
    this.initForm();
    this.initUpdateForm()
    this.getAllMinistere()
    this.getAllStructure();
  }

  initForm(){
    this.structureForm = this.fb.group({
      code: ["", Validators.required],
      libelle: ["", Validators.required],
      ministere: ["", Validators.required]
    })
  }

  initUpdateForm(){
    this.structureUpdateForm = this.fb.group({
      code: ["", Validators.required],
      libelle: ["", Validators.required],
      ministere: ["", Validators.required],
      id: [0]
    })
  }

  openDialog(){
    this.visible = true;
  }

  openUpdateDialog(st: any){
    this.update = true;
    this.structureUpdateForm.patchValue({
      code: st.code,
      libelle: st.libelle,
      ministere: st.ministere,
      id: st.id
    })
    console.log(this.structureUpdateForm.value);
    
  }

  getAllMinistere(){
    this.structureService.getAllStructureWithoutMinistere().subscribe((data: any[])=>{
      console.log(data);
      this.ministereList = data;
    })
  }

  submitStructure(){
    console.log(this.structureForm.value);
    this.structureService.createStructure(this.structureForm.value).subscribe((data:any)=>{
      console.log(data);
      this.visible = false;
      this.getAllStructure()
    })
    
  }

  getAllStructure(){
    this.structureService.getAllStructureWithMinistere().subscribe((data: any[])=>{
      console.log(data);
      this.structureList = data
    })
  }

  updateStructure(){
    this.structureService.updateStructure(this.structureUpdateForm.value.id, this.structureUpdateForm.value).subscribe((data: any)=>{
      console.log(data);
      this.update = false;
      this.getAllStructure()
      
    })
    
  }

  opendeleteDialog(structId: number){
    this.delete= true
    this.structId = structId;
   
  }

  deleteStructure(){
    this.structureService.deleteStructure({ id: this.structId }).subscribe((data: any)=>{
      console.log(data);
      this.getAllStructure();
      this.delete = false
    })
  }
}
