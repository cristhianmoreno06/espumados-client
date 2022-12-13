import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  public error: string;
  public users: any;
  pageActual = 1;

  constructor(public _apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getusers();
  }

  getusers() {
    this._apiService.get('user/list').subscribe(
      async (res: any) => {
        this.users = res.source;
      },
      (error: any) => {
        console.log(error.error);
        this.errorfireToast(error.error.title, error.error.message);
      }
    );
  }

  delete(id) {
    this._apiService.delete('user/delete/' + id).subscribe(
      async (res: any) => {
        console.log(res);
        Swal.fire({
          title: 'Desea Eliminar usuario?',
          icon: 'error',
          confirmButtonText: 'Ok',
          showDenyButton: true,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.users = [];
            this.getusers();
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
