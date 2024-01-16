import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
 
@Component({
  selector: 'app-view-user',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewUserComponent {
 
  viewUsersApi:string="https://localhost:7078/api/Users";
     users:any;
 
     constructor(private http:HttpClient){}
  ngOnInit(): void {
    this.gettingUsers();
  }
  gettingUsers(){
    this.http.get(this.viewUsersApi).subscribe((res:any)=>{
      this.users=res.message;
      console.log(this.users);
    })
  }
 
  
   
  pageSize=10;
  currentPage=1;
  
 
}
 