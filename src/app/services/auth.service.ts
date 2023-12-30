// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAdmin=false;
  private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public routeLinks:any[] = [
    
  ];
  // Set authentication status (e.g., after successful login)
  login() {
    this.loadSideMenu();
    this._isAuthenticated.next(true);
  }

  // Clear authentication status (e.g., after logout)
  logout() {
    this._isAuthenticated.next(false);
    this.isAdmin=false;
  }

  // Get authentication status
  isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }
  loadSideMenu(){
    if(this.isAdmin){
      this.routeLinks=[...[{ link: "dashboard", name: "Dashboard", icon: "dashboard" },
      { link: "view-team", name: "View Team", icon: "supervised_user_circle" },
      { link: "user", name: "Create User", icon: "create" },
      { link: "user", name: "View User", icon: "account_circle" },
      { link: "attendance", name: "Attendance", icon: "av_timer" },
      // { link: "reset-password", name: "Reset Password", icon: "lock_open" },]
    ]]
    }
    else{
      this.routeLinks=[...[{ link: "dashboard", name: "Dashboard", icon: "dashboard" },
      // { link: "view-team", name: "View Team", icon: "supervised_user_circle" },
      // { link: "user", name: "Create User", icon: "create" },
      // { link: "user", name: "View User", icon: "account_circle" },
      // { link: "attendance", name: "Attendance", icon: "av_timer" },
      // { link: "reset-password", name: "Reset Password", icon: "lock_open" },]
    ]]
  }
}
}
