import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  employeedata: any;
  startdate: any;
  enddate: any;

  constructor() { }
  setemployeedata(data: any, startDate: any, endDate: any) {
    this.employeedata = data;
    this.startdate = startDate;
    this.enddate = endDate;

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
}
