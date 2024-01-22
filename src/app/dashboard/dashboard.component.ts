import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { SharedService } from '../Shared/shared.service';
import * as XLSX from 'xlsx';
import { Adminservice } from '../services/admin.service';

export interface Projectdetails {
  ProjectName: string;
  EmployeeName: string;
  NumberOfWorkingDays: string;
  TotalWorkingHours: string;
  CarbonFootprint: string;
  CarbonFootprintPercentage: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  projectdetails = [

    ['ProjectName', 'EmployeeName', 'NumberOfWorkingDays', 'TotalWorkingHours', 'CarbonFootprint', 'CarbonFootprintPercentage']

  ]
  searchParams!: HttpParams;


  exportToExcel(): void {

    /*if (this.projectdetails.length === 0) {
      console.warn('No data to download.');
      return;
    }*/
    for (let i = 0; i < this.TableData.length; i++) {
      this.projectdetails.push(Object.values(this.TableData[i]));
    }
    console.log(this.projectdetails);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.projectdetails);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Projectdetails');
    XLSX.writeFile(wb, 'projectdetails.xlsx');

  }



  onSubmit() {

    this.searchParams = new HttpParams();
    this.searchParams = this.searchParams.append('projectName', this.selectedProject);
    this.searchParams = this.searchParams.append('startDate', this.startDate);
    this.searchParams = this.searchParams.append('endDate', this.endDate);

    this.adminservice.getTableData(this.searchParams).subscribe((data: any) => {
      this.TableData = data;
      this.shared.setemployeedata(this.TableData, this.startDate, this.endDate);
      console.log(data);
    });



    this.adminservice.getBarGraphData(this.searchParams).subscribe((data: any) => {
      this.BarGraphData = data;
      console.log(this.BarGraphData);
      this.projectDetails = this.BarGraphData.projectDetails;
      this.averageValues = this.BarGraphData.averageValues;
      this.averageCarbonFootprint = this.averageValues.averageCarbonFootprint;
      this.averageEnergyConsumed = this.averageValues.averageEnergyConsumed;
      this.averageCarbonFootprintPercentage = this.averageValues.averageCarbonFootprintPercentage;
      console.log(this.averageValues);
      console.log(this.projectDetails);
      this.getGraphData();
    });



    /*this.adminservice.getCardData().subscribe(data => {
      this.CardData = data;
      console.log(this.CardData);
    });*/


  }

  getGraphData() {

    /*this.chartDatalabels.push(e.dateCreated);
     this.graph.append(e.carbonFootprint)
       console.log(this.graph);
     this.hours.append(e.totalWorkingHours)
      console.log(this.hours);*/
    this.chartDatalabels = [];
    this.graph = [];
    this.hours = [];
    for (var e of this.projectDetails) {
      this.chartDatalabels.push(e.dateCreated);
      this.graph.push(e.carbonFootprint)

      this.hours.push(e.totalWorkingHours)

    }




    this.ctx = document.getElementById('myChart');

    this.config = {
      type: 'bar',
      data: {
        labels: this.chartDatalabels,
        datasets: [{
          label: 'Co2',
          data: this.graph,
          borderWidth: 0,
          // borderColor: 'grey',
          backgroundColor: 'RoyalBlue'
        },
        {
          label: 'Hours',
          data: this.hours,
          borderWidth: 0,
          // borderColor: 'blue',
          backgroundColor: 'LightBlue'
        },

        ],
        options: {
          scales: {
            x: {
              // grid: {
              //   offset: true
              // }
            },
            y: {
              grid: {
                offset: true
              }
            }
          }
        }
      }
    }

    if (this.myChart) this.myChart.destroy(); //destroy prev chart
    this.myChart = new Chart(this.ctx, this.config);

  }






  toppingList: string[] = [''];

  projectNames: string[] = [];
  teams: string[] = [];
  selectedTeam: any;
  selectedProject: any;
  startDate: any;
  endDate: any;
  TableData: any;
  BarGraphData: any;
  graph: string[] = [];
  hours: string[] = [];
  CardData: any;
  myChart!: Chart;
  projectDetails: any;
  averageValues: any;
  averageCarbonFootprint: any;
  averageEnergyConsumed: any;
  averageCarbonFootprintPercentage: any;
  /*pageSize=10;
  currentPage=1;*/




  constructor(public httpClient: HttpClient,
    private shared: SharedService,
    public router: Router,
    public adminservice: Adminservice) { }


  ctx: any;
  config: any;
  chartDatalabels: any[] = [];


  ngOnInit(): void {

    this.adminservice.getProjectNames().subscribe(data => {
      this.projectNames = data;
      this.projectDetails = [];
      console.log(this.projectNames);
      this.getGraphData();

    });






  }
}
