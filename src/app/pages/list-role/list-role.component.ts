import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-role',
  templateUrl: './list-role.component.html',
  styleUrls: ['./list-role.component.css']
})
export class ListRoleComponent implements OnInit {

  public error: string;
  public roles: any;
  pageActual = 1;

  constructor(public _apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getroles();
  }

  getroles() {
    this._apiService.get('rol/list').subscribe(
      async (res: any) => {
        this.roles = res.source;
      },
      (error: any) => {
        console.log(error.error);
        this.errorfireToast(error.error.title, error.error.message);
      }
    );
  }

  delete(id) {
    this._apiService.delete('rol/delete/' + id).subscribe(
      async (res: any) => {
        console.log(res);
        Swal.fire({
          title: 'Desea Eliminar rol?',
          icon: 'error',
          confirmButtonText: 'Ok',
          showDenyButton: true,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.roles = [];
            this.getroles();
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info');
          }
        });
      },
      (error: any) => {
        console.log(error.error);
        this.errorfireToast(error.error.title, error.error.message);
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
