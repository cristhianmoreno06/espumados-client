import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {LoginService} from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loginForm: FormGroup;
  public error: string;
  date: Date = new Date();


  constructor(public _loginService: LoginService, private router: Router) {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['list-user']);
    }
  }

  ngOnInit() {
    this.createLoginForm();
  }

  public createLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  loginAttempt() {

    console.log(this.loginForm.value);

    this._loginService.loginAttempt(this.loginForm.value).subscribe(
      (res) => {
        console.log(res);
        window.location.href = window.location.href = 'list-user';
      },
      (error) => {
        this.errorfireToast('Verifica Credenciales', error.error.error);
        console.log('error en login', error);
      }
    );
  }

  errorfireToast(title?: any, msg?: any) {
    Swal.fire({
      title: title,
      text: msg.error ? msg.error.message : msg,
      icon: 'error',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });
  }

  warningfireToast(title?: any, msg?: any) {
    Swal.fire({
      title: title,
      text: msg.error ? msg.error.message : msg,
      icon: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });
  }

  SuccessMessage(title: any, msg: any) {
    Swal.fire({
      title: title,
      text: msg.error ? msg.error.message : msg,
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
    });
  }

  ngOnDestroy() {
  }

}
