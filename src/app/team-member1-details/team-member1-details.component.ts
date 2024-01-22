import { Component } from '@angular/core';
import { Chart } from 'chart.js';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SharedService } from '../Shared/shared.service';
import { TeamMember1Service } from '../services/team-member1.service';


@Component({
  selector: 'app-team-member1-details',
  templateUrl: './team-member1-details.component.html',
  styleUrls: ['./team-member1-details.component.css']
})
export class TeamMember1DetailsComponent {
  exportToExcel() {
    throw new Error('Method not implemented.');
  }

  toppingList: string[] = ['Project Name 1', 'Project Name 2', 'Project Name 3'];

  projectNames: string[] = [];
  teams: string[] = [];
  selectedTeam: any;
  selectedProject: any;


  constructor(public httpClient: HttpClient,
    private router: Router,
    private shared: SharedService,
    private teammember1: TeamMember1Service,
    private Activatedroute: ActivatedRoute,
    public authService: AuthService,) { }


  ctx: any;
  config: any;
  chartDatalabels: any[] = [];
  employeedata: any;
  employeesdata: any;
  startdate: any;
  enddate: any;
  graphdata: any;
  averages: any;
  employeecode: any;
  worklogs: any;
  ngOnInit() {
    let id = this.Activatedroute.snapshot.params['id'];
    console.log(id);
    this.employeesdata = this.shared.getemployeedata();

    this.employeedata = this.employeesdata[id];
    this.startdate = this.shared.getemployeestartdate();
    this.enddate = this.shared.getemployeeenddate();
    let searchParams = new HttpParams();
    searchParams = searchParams.append('employeeName', this.employeedata.employeeName);
    searchParams = searchParams.append('startDate', this.startdate);
    searchParams = searchParams.append('endDate', this.enddate);
    this.teammember1.getTableData(searchParams).subscribe(data => {
      this.graphdata = data;
      this.worklogs = this.graphdata.workLogs;
      this.averages = this.graphdata.averages;
      this.averageCarbonFootprint = this.averages.averageCarbonFootprint;
      this.averageCarbonFootprintPercentage = this.averages.averageCarbonFootprintPercentage;
      this.averageEnergyConsumed = this.averages.averageEnergyConsumed;
      this.employeecode = this.graphdata.workLogs[0].employeeCode;
      console.log(this.worklogs);

      this.createChart();

    });





  }
  workdates: any[] = [];
  workinghours: string[] = [];
  carbonfootprint: string[] = [];
  averageCarbonFootprint: any;
  averageEnergyConsumed: any;
  averageCarbonFootprintPercentage: any;

  createChart() {
    for (var w of this.worklogs) {
      this.workdates.push(w.workDate);
      this.workinghours.push(w.workingHours);
      this.carbonfootprint.push(w.carbonDioxide);
    }
    console.log(this.workdates);
    console.log(this.workinghours);
    console.log(this.carbonfootprint);
    const ctx = document.getElementById('myLineChart') as HTMLCanvasElement;
    const myLineChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.workdates,
        datasets: [
          {
            label: 'CO2',
            data: this.carbonfootprint,
            borderColor: 'red',
            borderWidth: 2,
            fill: false
          },
          {
            label: 'Hours',
            data: this.workinghours,
            borderColor: 'blue',
            borderWidth: 2,
            fill: false
          }
        ]
      },
      options: {
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log('Logout clicked!');
  }

}
