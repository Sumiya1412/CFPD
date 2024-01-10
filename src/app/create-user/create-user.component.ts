import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
userForm:FormGroup;

  constructor(private httpClient: HttpClient,private _fb:FormBuilder) { 
    this.userForm=this._fb.group({
      UserName:[''],
      Name:[''],
      MobileNumber:[''],
      Password:[''],
      IsAdmin:[false]
    })
  }

  userFormSubmit() {
    this.httpClient.post<any>(`${'https://localhost:7078/api/Users/register'}`, this.userForm.getRawValue()).subscribe(
      (response) => {
        alert('User created successfully');
        this.userForm.reset();
        console.log('User created successfully', response);
        // You can perform additional actions after user creation if needed
      },
      (error) => {
        console.error('Error creating user', error);
        // Handle error scenarios
      }
    );
  }

}
