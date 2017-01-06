import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';
import { AlertModule, PaginationModule } from 'ng2-bootstrap';
import { DataTableModule } from "angular2-datatable";

import { AppComponent } from './app.component';

import { UserService } from './user.service';
import { AuthGuardService } from './auth-guard.service';

import { UserComponent } from './user/user.component';
import { UserFilterPipe } from './user/user-filter.pipe';
import { CustomerComponent } from './customer/customer.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'users', component: UserComponent, canActivate: [AuthGuardService] },
  { path: 'customers', component: CustomerComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CustomerComponent,
    LoginComponent,
    UserFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot(),
    PaginationModule.forRoot(),
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
