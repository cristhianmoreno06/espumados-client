import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public error: string;
  date: Date = new Date();


  constructor(public _apiService: ApiService, private router: Router) {
  }

  ngOnInit() {
    this.createRegisterForm();
  }

  public createRegisterForm() {
    this.registerForm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      username: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
      password_confirmation: new FormControl('', Validators.compose([Validators.required])),
    });
  }

  register() {
    console.log(this.registerForm.value);
    this._apiService.post('register', this.registerForm.value).subscribe(
      async (res: any) => {
        console.log(res);
        this.SuccessMessage(res.title, res.message);
        await this.router.navigate(['login']);
      },
      (error: any) => {
        console.log(error.error);
        this.errorfireToast(error.error.title, error.error.message.email[0]);
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
}
