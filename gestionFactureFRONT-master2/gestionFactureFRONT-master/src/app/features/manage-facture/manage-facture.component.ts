import { Component, OnInit } from '@angular/core';
import { FactureService } from '../services/facture.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MessagePopupComponent } from 'src/app/shared/message-popup/message-popup.component';

@Component({
  selector: 'app-manage-facture',
  templateUrl: './manage-facture.component.html',
  styleUrls: ['./manage-facture.component.scss']
})
export class ManageFactureComponent implements OnInit {

  visible!: boolean
  allFacture: any[] = [];
  helper = new JwtHelperService()

  constructor(private factureService: FactureService, private messageService: MessageService, private dialogService: DialogService){}

  status: any[] = [
    {name: "PANDING"},
    {name: "PAID"}
  ]
  ngOnInit(): void {
    this.getAllFacture()
  }

  showDialog(){
    this.visible = true;
  }

  getAllFacture(){
    this.factureService.getAllFacture().subscribe((data: any[])=>{
      console.log(data);
      this.allFacture = data;
    })
  }

  paid(id: number){
    if(localStorage.getItem("role")==="ROLE_USER"){
     // this.messageService.add({severity:'danger', summary:'Access denied', detail:'you are not allowed to do this operation'});
      this.dialogService.open(MessagePopupComponent, {
        width: '20rem',
        height: "20rem",
        header: "ACCESS DENIED"
      })
      return;
    }else if (localStorage.getItem("role")==="ROLE_ADMIN"){
      this.factureService.updateFacture(id).subscribe((data: any)=>{
        console.log(data);
        this.getAllFacture( )
      })
    }
    
    
  }

}
