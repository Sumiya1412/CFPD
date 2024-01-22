import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Adminservice {

  private apiUrl = 'https://localhost:7078/api/Attendance/ProjectNames';

  constructor(private http: HttpClient) { }

  getTableData(searchParams: HttpParams): Observable<any[]> {

    return this.http.get<any[]>('https://localhost:7078/api/Attendance/ProjectDetails2', { params: searchParams });
  }

  getProjectNames(): Observable<string[]> {
    return this.http.get<string[]>('https://localhost:7078/api/Attendance/ProjectNames');
  }

  getCarbonFootprintData(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7078/api/Attendance/ProjectDetails2');
  }


  getBarGraphData(searchParams: HttpParams): Observable<any[]> {

    return this.http.get<any[]>('https://localhost:7078/api/Attendance/SelectedProjectDetails', { params: searchParams });
  }


}