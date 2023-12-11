// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(true);

  // Set authentication status (e.g., after successful login)
  login() {
    this._isAuthenticated.next(true);
  }

  // Clear authentication status (e.g., after logout)
  logout() {
    this._isAuthenticated.next(false);
  }

  // Get authentication status
  isAuthenticated(): Observable<boolean> {
    return this._isAuthenticated.asObservable();
  }
}
