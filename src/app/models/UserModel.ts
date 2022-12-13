import { Injectable } from '@angular/core';

export class UserModel {
  public id: number;
  public name: string;
  public email: string;
  public identification: number;
  public password: string;
  public role_id: number;
  public created_at: Date;
  public updated_at: Date;
  public deleted_at: Date;

  constructor() {
    this.id = null;
    this.name = '';
    this.email = '';
    this.identification = null;
    this.password = '';
    this.role_id = null;
    this.created_at = null;
    this.updated_at = null;
    this.deleted_at = null;
  }
}
