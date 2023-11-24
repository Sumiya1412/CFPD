// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isAuthenticated: boolean = false;

  // Set authentication status (e.g., after successful login)
  login() {
    this._isAuthenticated = true;
  }

  // Clear authentication status (e.g., after logout)
  logout() {
    this._isAuthenticated = false;
  }

  // Get authentication status
  isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
}
