import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ContactModel} from '../../models/ContactModel';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public _contactForm: FormGroup;
  public contactForm: FormGroup;
  public error: string;
  public title: string;
  public contactModel: ContactModel;

  constructor(public _apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.contactModel = new ContactModel();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      console.log(id);
      this.title = 'Edición de Contacto';
      this.createForms();
      this.getContactsForId(id);
    } else {
      this.title = 'Creación de Contacto';
      this.createForms();
    }
  }

  public fillForms() {
    this.contactForm.get('id').setValue(this.contactModel.id);
    this.contactForm.get('name').setValue(this.contactModel.name);
    this.contactForm.get('phone').setValue(this.contactModel.phone);
    this.contactForm.get('Birthdate').setValue(this.contactModel.Birthdate);
    this.contactForm.get('address').setValue(this.contactModel.address);
    this.contactForm.get('email').setValue(this.contactModel.email);
  }

  getContactsForId(id) {
    this._apiService.post('contact/list/' + id).subscribe(
      async (res: any) => {
        this.contactModel = res.source;
        console.log('model', this.contactModel);
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
    this.generateContactForm();
    this.generateSubmitContactForm();
  }

  public generateContactForm(): void {
    this.contactForm = new FormGroup({
      id: new FormControl(this.contactModel.id),
      name: new FormControl(this.contactModel.name, Validators.compose([Validators.required])),
      phone: new FormControl(this.contactModel.phone, Validators.compose([Validators.required])),
      Birthdate: new FormControl(this.contactModel.Birthdate, Validators.compose([Validators.required])),
      address: new FormControl(this.contactModel.address, Validators.compose([Validators.required])),
      email: new FormControl(this.contactModel.email, Validators.compose([Validators.required])),
    });
  }

  public generateSubmitContactForm(): void {
    this._contactForm = new FormGroup({
      contact: this.contactForm,
    });
  }

  public storeOrUpdateContact() {

    if (this._contactForm.valid) {
      const formData = new FormData();
      const formObj = this._contactForm.getRawValue();
      const serializedForm = JSON.stringify(formObj);
      formData.append('form', serializedForm);

      this._apiService.post('contact/storeOrUpdateContact', formData).subscribe(
        async (res: any) => {
          console.log(res);
          this.SuccessMessage(res.title, res.message);
          await this.router.navigate(['tables']);
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
