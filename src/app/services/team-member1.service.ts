import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
 
 
@Injectable({
  providedIn: 'root'
})
export class TeamMember1Service {
 
  constructor(private http:HttpClient) { }
  getTableData(searchParams:HttpParams): Observable<any[]> {
 
    return this.http.get<any[]>('https://localhost:7078/api/Attendance/TeamDetails', {params:searchParams});
  }
}
 
