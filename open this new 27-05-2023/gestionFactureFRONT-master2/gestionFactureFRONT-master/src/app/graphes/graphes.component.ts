
import { Chart, ChartOptions, ChartType } from 'chart.js';
import { ChartDataset } from 'chart.js';
import { Component, OnInit } from '@angular/core';
//import { Label } from 'ng2-charts';

@Component({
  selector: 'app-graphes',
  templateUrl: './graphes.component.html',
  styleUrls: ['./graphes.component.scss']
})
export class GraphesComponent {
 chart: any;

  ngAfterViewInit() {
 
  }

  //public barChartOptions: ChartOptions = {
   // responsive: true,
  //};
 // public barChartLabels: Label[] = ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'];
 // public barChartType: ChartType = 'bar';
 // public barChartLegend = true;
 // public barChartPlugins = [];
  
 // public barChartData: ChartDataSets[] = [
  //  { data: [10, 20, 30, 40, 50], label: 'Data' }
  //];
  
}



