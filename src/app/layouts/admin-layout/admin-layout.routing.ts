import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {IconsComponent} from '../../pages/icons/icons.component';
import {MapsComponent} from '../../pages/maps/maps.component';
import {UserProfileComponent} from '../../pages/user-profile/user-profile.component';
import {TablesComponent} from '../../pages/tables/tables.component';
import {UserComponent} from '../../pages/user/user/user.component';
import {ListUserComponent} from '../../pages/list-user/list-user.component';
import {ListRoleComponent} from '../../pages/list-role/list-role.component';
import {RoleComponent} from '../../pages/role/role.component';

export const AdminLayoutRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user-profile', component: UserProfileComponent},
  {path: 'tables', component: TablesComponent},
  {path: 'icons', component: IconsComponent},
  {path: 'maps', component: MapsComponent},
  {
    path: 'list-user',
    children: [
      {
        path: '',
        component: ListUserComponent
      },
      {
        path: 'user_register',
        component: UserComponent
      },
      {
        path: 'user_update/:id',
        component: UserComponent
      }
    ]
  },
  {
    path: 'list-rol',
    children: [
      {
        path: '',
        component: ListRoleComponent
      },
      {
        path: 'role_register',
        component: RoleComponent
      },
      {
        path: 'role_update/:id',
        component: RoleComponent
      }
    ]
  },
];
