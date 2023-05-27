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

  visible!: boolean;
  allFacture: any[] = [];
  helper = new JwtHelperService();
  isAdmin = localStorage.getItem("role") === "ROLE_ADMIN";
  public items: any[] = [];
  columns: any[] = [];
  searchText: string = '';
  rowLimit: number = 10;
  value: number = 10;

  offset: number = 0;
  totalItems: number = 0;

  constructor(private factureService: FactureService, private messageService: MessageService, private dialogService: DialogService) {}

  ngOnInit(): void {
    this.getAllFacture({ limit: this.rowLimit, offset: this.offset });
  }

  showDialog() {
    this.visible = true;
  }

  getAllFacture(config: { limit: number; offset: number }): void {
    this.factureService.getAllFacture(config).subscribe((data: any[]) => {
      console.log(data);
      this.allFacture = data;
      this.items = data;
      this.totalItems = data.length;
    });
    this.columns = [
      { name: 'Structure', prop: 'structureLibelle' },
      { name: 'Status', prop: 'status' },
      { name: 'Structure', prop: 'structure' },
      { name: "Date d'echeance fct", prop: 'dueDatefct' },
      { name: 'Montant', prop: 'amount' },
      { name: 'Periode', prop: 'period' }
    ];
  }

  onPageChange(event: any): void {
    this.offset = (event.page - 1) * this.rowLimit;
    this.getAllFacture({ limit: this.rowLimit, offset: this.offset });
  }

  onRowLimitChange(): void {
    this.offset = 0;
    this.getAllFacture({ limit: this.rowLimit, offset: this.offset });
  }

  paid(id: number): void {
    if (localStorage.getItem("role") === "ROLE_USER") {
      this.dialogService.open(MessagePopupComponent, {
        width: '20rem',
        height: "20rem",
        header: "ACCESS DENIED"
      });
      return;
    } else if (localStorage.getItem("role") === "ROLE_ADMIN") {
      this.factureService.updateFacture(id).subscribe((data: any) => {
        console.log(data);
        this.getAllFacture({ limit: this.rowLimit, offset: this.offset });
      });
    }
  }

}
