import { Injectable } from '@angular/core';

export class RoleModel {
  public id: number;
  public name: string;
  public screen_name: string;
  public created_at: Date;
  public updated_at: Date;
  public deleted_at: Date;

  constructor() {
    this.id = null;
    this.name = '';
    this.screen_name = '';
    this.created_at = null;
    this.updated_at = null;
    this.deleted_at = null;
  }
}
