import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  employeedata: any;
  startdate: any;
  enddate: any;
  employeeprojectname: any;

  constructor() { }
  setemployeedata(data: any, startDate: any, endDate: any,ProjectName:any) {
    this.employeedata = data;
    this.startdate = startDate;
    this.enddate = endDate;
    this.employeeprojectname = ProjectName;
 
   

  }
  getemployeedata() {
    return this.employeedata;
  }
  getemployeestartdate() {
    return this.startdate;
  }
  getemployeeenddate() {
    return this.enddate;
  }
  getemployeeprojectname() {
    return this.employeeprojectname;
  }
}
