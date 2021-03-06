import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { ErrorsComponent } from './errors/errors.component';
import { ListTodosComponent } from './list-todos/list-todos.component';
import { LogoutComponent } from './logout/logout.component';
import { RouteGuardService } from './service/route-guard.service';
import { TodoComponent } from './todo/todo.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, //canActivate using a service called RouteGuardService
  {
    path: 'welcome/:name',
    component: WelcomeComponent,
    canActivate: [RouteGuardService],
    //the canActivate method checks if the user is logged in befoer redirecting, if not, it redirects you to the login page
  },

  { path: 'login', component: LoginComponent },
  //canActivate method not needed here clearly
  {
    path: 'todos',
    component: ListTodosComponent,
    canActivate: [RouteGuardService],
    //canActivate method needed here as well
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [RouteGuardService],
  },
  {
    path: 'todos/:id',
    component: TodoComponent,
    canActivate: [RouteGuardService],
  },
  { path: '**', component: ErrorsComponent },
  //The order of the routes is important (** must be at the end)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
