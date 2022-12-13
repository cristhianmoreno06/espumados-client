// @ts-ignore

import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {RoleModel} from '../../models/RoleModel';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  public _rolForm: FormGroup;
  public rolForm: FormGroup;
  public error: string;
  public title: string;
  public rolModel: RoleModel;

  constructor(public _apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.rolModel = new RoleModel();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log('id', id);
      this.title = 'Edición de Rol';
      this.createForms();
      this.getRolesForId(id);
    } else {
      this.title = 'Creación de Rol';
      this.createForms();
    }
  }

  public fillForms() {
    this.rolForm.get('id').setValue(this.rolModel.id);
    this.rolForm.get('name').setValue(this.rolModel.name);
    this.rolForm.get('screen_name').setValue(this.rolModel.screen_name);
  }

  getRolesForId(id) {
    this._apiService.get('rol/list/' + id).subscribe(
      async (res: any) => {
        this.rolModel = res.source;
        console.log('model', this.rolModel);
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
    this.generateRolForm();
    this.generateSubmitRolForm();
  }

  public generateRolForm(): void {
    console.log('generate rol form', this.rolModel);
    this.rolForm = new FormGroup({
      id: new FormControl(this.rolModel.id),
      name: new FormControl(this.rolModel.name, Validators.compose([Validators.required])),
      screen_name: new FormControl(this.rolModel.screen_name, Validators.compose([Validators.required])),
    });
    console.log(this.rolForm);
  }

  public generateSubmitRolForm(): void {
    this._rolForm = new FormGroup({
      role: this.rolForm,
    });
  }

  public storeOrUpdateRol() {

    if (this._rolForm.valid) {
      const formData = new FormData();
      const formObj = this._rolForm.getRawValue();
      const serializedForm = JSON.stringify(formObj);
      formData.append('form', serializedForm);

      this._apiService.post('rol/storeOrUpdateRol', formData).subscribe(
        async (res: any) => {
          console.log(res);
          this.SuccessMessage(res.title, res.message);
          await this.router.navigate(['list-rol']);
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
