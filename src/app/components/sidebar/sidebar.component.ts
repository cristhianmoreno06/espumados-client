import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    let rol = localStorage.getItem('role');
    rol =  JSON.parse(rol);

    // @ts-ignore
    if (rol === 1) {
      ROUTES.push(
        {path: '/list-user', title: 'Listado de usuarios', icon: 'ni-bullet-list-67 text-red', class: ''},
        {path: '/list-rol', title: 'Listado de roles', icon: 'ni-bullet-list-67 text-red', class: ''}
      );
    } else {
      ROUTES.push({path: '/list-user', title: 'Listado de usuarios', icon: 'ni-bullet-list-67 text-red', class: ''});
    }
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
