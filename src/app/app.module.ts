import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { Angular2TokenService, A2tUiModule } from 'angular2-token';
import { AlertModule } from 'ng2-bootstrap';

import { AppComponent } from './app.component';

import { UserComponent } from './user/user.component';
import { CustomerComponent } from './customer/customer.component';
import { UserService } from './user.service';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'restricted', component: UserComponent },
  { path: 'user', component: UserComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CustomerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule,
    A2tUiModule,
    RouterModule.forRoot(appRoutes),
    AlertModule.forRoot()
  ],
  providers: [
      Angular2TokenService,
      UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
