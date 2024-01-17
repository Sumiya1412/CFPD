import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
 
@Component({
  selector: 'app-view-user',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewUserComponent {
  displayedColumns: string[] = ['userName','name', 'mobileNumber'];
  dataSource:any;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  viewUsersApi:string="https://localhost:7078/api/Users";
     users:any;
 
     constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.gettingUsers();
  }
  gettingUsers(){
    this.http.get(this.viewUsersApi).subscribe((res:any)=>{
      this.dataSource = new MatTableDataSource<any>(res.message);
      this.dataSource.paginator = this.paginator;
      // this.users=res.message;
      console.log(this.users);
    })
  }
 
  
   
  pageSize=10;
  currentPage=1;
  
 
}
 