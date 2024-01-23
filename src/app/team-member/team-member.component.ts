import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Chart } from 'chart.js';

import * as XLSX from 'xlsx';

import { TeamService } from '../services/team.service';
@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.css']
})
export class TeamMemberComponent implements OnInit {
  employeedetails = [

    ['TeamMemberName', 'Date', 'TotalWorkingHours', 'CarbonFootprint', 'CarbonFootprintPercentage']

  ]
  exportToExcel(): void {

    /*if (this.projectdetails.length === 0) {
      console.warn('No data to download.');
      return;
    }*/
    for (let i = 0; i < this.TableData.length; i++) {
      this.employeedetails.push(Object.values(this.TableData[i]));
    }
    console.log(this.employeedetails);
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.employeedetails);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Employeedetails');
    XLSX.writeFile(wb, 'Employeedetails.xlsx');

  }
  searchParams!: HttpParams;
  onSubmit() {


    this.selectedEmployee = this.authService.userFullName;
    this.searchParams = new HttpParams();
    this.searchParams = this.searchParams.append('employeeName', this.selectedEmployee);
    this.searchParams = this.searchParams.append('startDate', this.startDate);
    this.searchParams = this.searchParams.append('endDate', this.endDate);

    this.teamService.getTableData(this.searchParams).subscribe(data => {
      this.TableData = data.workLogs;
      console.log(data);
    });



    this.teamService.getBarGraphData(this.searchParams).subscribe(data => {
      this.BarGraphData = data;
      console.log(this.BarGraphData);
      this.teamDetails = this.BarGraphData.workLogs;
      this.averages = this.BarGraphData.averages;
      this.averageCarbonFootprint = this.averages.averageCarbonFootprint;
      this.averageEnergyConsumed = this.averages.averageEnergyConsumed;
      this.averageCarbonFootprintPercentage = this.averages.averageCarbonFootprintPercentage;
      console.log(this.averages);
      console.log(this.teamDetails);
      this.getGraphData();
    });



  }

  getGraphData() {

    /*this.chartDatalabels.push(e.workDate);
     this.graph.append(e.carbondioxide)
       console.log(this.graph);
     this.hours.append(e.workingHours)
      console.log(this.hours);*/
    this.chartDatalabels = [];
    this.graph = [];
    this.hours = [];
    for (var e of this.teamDetails) {
      this.chartDatalabels.push(e.workDate);
      this.graph.push(e.carbonDioxide)

      this.hours.push(e.workingHours)

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

  employeeNames: string[] = [];
  teams: string[] = [];

  selectedEmployee: any;
  startDate: any;
  endDate: any;
  TableData: any;
  BarGraphData: any;
  graph: string[] = [];
  hours: string[] = [];
  myChart!: Chart;
  teamDetails: any;
  averages: any;
  averageCarbonFootprint: any;
  averageEnergyConsumed: any;
  averageCarbonFootprintPercentage: any;

  constructor(public httpClient: HttpClient,
    public router: Router,
    public teamService: TeamService,
    public authService: AuthService) { }


  ctx: any;
  config: any;
  chartDatalabels: any[] = [];

  ngOnInit(): void {
    this.teamDetails = [];

    this.getGraphData();

    /*  this.adminservice.getProjectNames().subscribe(data => {
        this.projectNames = data;
        console.log(this.projectNames);
      });*/


  }
}

export interface Employeedetails {
  TeamMemberName: string;
  Date: string;
  NumberOfWorkingDays: string;
  TotalWorkingHours: string;
  CarbonFootprint: string;
  CarbonFootprintPercentage: string;
}