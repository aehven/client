import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

import { Angular2TokenService } from 'angular2-token';
import { DataTableModule } from "angular2-datatable";

import { AppComponent } from './app.component';

import { UserService } from './user/user.service';
import { AuthGuardService } from './auth-guard.service';

import { UserDetailComponent } from './user/user-detail.component';
import { UserListComponent } from './user/user-list.component';
import { UserFilterPipe } from './user/user-filter.pipe';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    UserListComponent,
    LoginComponent,
    RegisterComponent,
    UserFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    NgbAlertModule.forRoot(),
    NgbPaginationModule.forRoot(),
    DataTableModule
  ],
  providers: [
      Angular2TokenService,
      AuthGuardService,
      UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
