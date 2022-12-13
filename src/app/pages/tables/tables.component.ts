import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../services/api.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {

  public error: string;
  public contacts: any;

  constructor(public _apiService: ApiService, private router: Router) { }

  ngOnInit() {
    this.getContacts();
  }

  getContacts() {
    this._apiService.post('contact/list').subscribe(
      async (res: any) => {
        console.log(res.source);
        this.contacts = res.source;
      },
      (error: any) => {
        console.log(error.error);
        this.errorfireToast(error.error.title, error.error.message);
      }
    );
  }

  delete(id) {
    this._apiService.post('contact/delete/' + id).subscribe(
      async (res: any) => {
        console.log(res);
        this.SuccessMessage(res.title, res.message);
        location.reload();
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
