import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = this.formBuilder.group({
    name: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private _snackBar: MatSnackBar) {
    
   }

  ngOnInit(): void {
  }

  login() {
    let userLogged = false;

    if(this.loginForm.valid) {
      if (this.loginForm.value.name === 'Cactus' && this.loginForm.value.password === 'wearecactus') {
        userLogged = true;
        this.authService.saveNameUser(this.loginForm.value.name);
        this._snackBar.open('Welcome :)', '', {
          duration: 3000
        });
        this.router.navigate(['/products/']);
      } else {
        userLogged = false;
        this._snackBar.open('Enter a valid name and password', '', {
          duration: 2000
        });
      }
    }

    return userLogged;
  }


}
