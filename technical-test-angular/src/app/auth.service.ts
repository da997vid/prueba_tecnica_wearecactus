import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

export interface UserDetails {
  _name: string
  exp: number
  iat: number
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Save user name when loged
  saveNameUser(user: any) {
    localStorage.setItem('name-user', user);
  }

  // Get user name loged
  getuser() {
    return localStorage.getItem('name-user');
  }

  // Logout sesion
  logout(): Promise<void> {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('name-user');
      resolve();
    });
  }

}

@Injectable()
export class CanActivateAuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate() {
    // If the user is not logged in we'll send them back to the home page
    if (!this.authService.getuser()) {
      console.log('No estás logueado');
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}