

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = 'https://localhost:7078/api/AttendanceController1/TeamMemberDashboard';
  constructor(private http: HttpClient) { }

  getTableData(searchParams: HttpParams): Observable<any> {

    return this.http.get<any[]>('https://localhost:7078/api/AttendanceController1/TeamMemberDashboard', { params: searchParams });
  }

  /*getCarbonFootprintData(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7270/api/Attendance');
  }*/
  getBarGraphData(searchParams: HttpParams): Observable<any> {

    return this.http.get<any[]>('https://localhost:7078/api/AttendanceController1/TeamMemberDashboard', { params: searchParams });
  }
}
