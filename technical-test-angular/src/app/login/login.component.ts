import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
   }

  ngOnInit(): void {
  }

  login() {
    let userLogged = false;
    console.log(this.loginForm.value.name)

    if(this.loginForm.valid) {
      if (this.loginForm.value.name === 'Cactus' && this.loginForm.value.password === 'wearecactus') {
        userLogged = true;
        this.authService.saveNameUser(this.loginForm.value.name)
        this.router.navigate(['/products/']);
      } else {
        userLogged = false;
      }
    }

    return userLogged;
  }

}
