import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { Angular2TokenService } from 'angular2-token';
import { SimpleNotificationsModule } from 'angular2-notifications';

import { AppComponent } from './app.component';

import { DataService } from './data.service';
import { UserService } from './user/user.service';
import { AuthGuardService } from './auth-guard.service';

import { UserDetailComponent } from './user/user-detail.component';
import { UserListComponent } from './user/user-list.component';
import { UserFilterPipe } from './user/user-filter.pipe';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const appRoutes: Routes = [
  { path: 'user/:id', component: UserDetailComponent, canActivate: [AuthGuardService] },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  { path: '', component: LoginComponent },
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
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger',
      placement: 'top'
    }),
    SimpleNotificationsModule
  ],
  providers: [
      Angular2TokenService,
      AuthGuardService,
      DataService,
      UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
