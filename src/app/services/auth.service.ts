// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAdmin = false;
  private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private _sideMenuLinks: BehaviorSubject<any> = new BehaviorSubject([]);
  private routeLinks: any[] = [

  ];
  constructor(private httpClient:HttpClient){
    // this.loadSideMenu();
  }
  // Set authentication status (e.g., after successful login)
  login() {
    this.loadSideMenu();
    this._isAuthenticated.next(true);
  }
  public exportToExcel()
  {
    return this.httpClient.get("httpurl/action",
    {observe:'response', responseType:'blob'})
  }

  // Clear authentication status (e.g., after logout)
  logout() {
    this._isAuthenticated.next(false);
    this.isAdmin = false;
  }

  // Get authentication status
  isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }

  getRouteLinks(): Observable<any[]> {
    return this._sideMenuLinks.asObservable();
  }

  loadSideMenu() {
    if (this.isAdmin) {
      this.routeLinks = [...[{ link: "dashboard", name: "Dashboard", icon: "dashboard" },
      { link: "view-team", name: "View Team", icon: "supervised_user_circle" },
      { link: "create-user", name: "Create User", icon: "create" },
      { link: "view-user", name: "View User", icon: "account_circle" },
      { link: "attendance", name: "Attendance", icon: "av_timer" },
        // { link: "reset-password", name: "Reset Password", icon: "lock_open" },]
      ]]
    }
    else {
      this.routeLinks = [...[{ link: "dashboard", name: "Dashboard", icon: "dashboard" },
        // { link: "view-team", name: "View Team", icon: "supervised_user_circle" },
        // { link: "user", name: "Create User", icon: "create" },
        // { link: "user", name: "View User", icon: "account_circle" },
        // { link: "attendance", name: "Attendance", icon: "av_timer" },
        // { link: "reset-password", name: "Reset Password", icon: "lock_open" },]
      ]]
    }
    this._sideMenuLinks.next(this.routeLinks);
  }
  

}
