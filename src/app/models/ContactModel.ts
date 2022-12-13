import { Injectable } from '@angular/core';

export class ContactModel {
  public id: number;
  public name: string;
  public phone: number;
  public Birthdate: Date;
  public address: string;
  public email: string;
  public created_at: Date;
  public updated_at: Date;
  public deleted_at: Date;

  constructor() {
    this.id = null;
    this.name = '';
    this.phone = 0;
    this.Birthdate = null;
    this.address = '';
    this.email = '';
    this.created_at = null;
    this.updated_at = null;
    this.deleted_at = null;
  }
}
