import { Injectable } from '@angular/core';


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
