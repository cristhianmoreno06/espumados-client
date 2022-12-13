import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserModel} from '../../../models/UserModel';
import {ApiService} from '../../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public _userForm: FormGroup;
  public userForm: FormGroup;
  public error: string;
  public title: string;
  public userModel: UserModel;

  constructor(public _apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.userModel = new UserModel();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log('id', id);
      this.title = 'Edición de Usuario';
      this.createForms();
      this.getUsersForId(id);
    } else {
      this.title = 'Creación de Usuario';
      this.createForms();
    }
  }

  public fillForms() {
    this.userForm.get('id').setValue(this.userModel.id);
    this.userForm.get('name').setValue(this.userModel.name);
    this.userForm.get('email').setValue(this.userModel.email);
    this.userForm.get('identification').setValue(this.userModel.identification);
    this.userForm.get('password').setValue(this.userModel.password);
    this.userForm.get('role_id').setValue(this.userModel.role_id);
  }

  getUsersForId(id) {
    this._apiService.get('user/list/' + id).subscribe(
      async (res: any) => {
        this.userModel = res.source;
        console.log('model', this.userModel);
        this.fillForms();
        /*this.SuccessMessage(res.title, res.message);*/
      },
      (error: any) => {
        console.log(error.error);
        this.errorfireToast(error.error.title, error.error.message);
      }
    );
  }

  public createForms() {
    this.generateUserForm();
    this.generateSubmitUserForm();
  }

  public generateUserForm(): void {
    console.log('generate user form', this.userModel);
    this.userForm = new FormGroup({
      id: new FormControl(this.userModel.id),
      name: new FormControl(this.userModel.name, Validators.compose([Validators.required])),
      email: new FormControl(this.userModel.email, Validators.compose([Validators.required])),
      identification: new FormControl(this.userModel.identification, Validators.compose([Validators.required])),
      password: new FormControl(this.userModel.password, Validators.compose([Validators.required])),
      role_id: new FormControl(this.userModel.role_id, Validators.compose([Validators.required])),
    });
    console.log(this.userForm);
  }

  public generateSubmitUserForm(): void {
    this._userForm = new FormGroup({
      user: this.userForm,
    });
  }

  public storeOrUpdateUser() {

    if (this._userForm.valid) {
      const formData = new FormData();
      const formObj = this._userForm.getRawValue();
      const serializedForm = JSON.stringify(formObj);
      formData.append('form', serializedForm);

      this._apiService.post('user/storeOrUpdateUser', formData).subscribe(
        async (res: any) => {
          console.log(res);
          this.SuccessMessage(res.title, res.message);
          await this.router.navigate(['list-user']);
        },
        (error: any) => {
          console.log(error.error);
          this.errorfireToast(error.error.title, error.error.message);
        }
      );
    }
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
