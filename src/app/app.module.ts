import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';
import { AlertModule, PaginationModule } from 'ng2-bootstrap';
import { DataTableModule } from "angular2-datatable";

import { AppComponent } from './app.component';

import { UserService } from './user/user.service';
import { MealService } from './meal/meal.service';
import { AuthGuardService } from './auth-guard.service';

import { UserDetailComponent } from './user/user-detail.component';
import { UserListComponent } from './user/user-list.component';
import { MealListComponent } from './meal/meal-list.component';
import { UserFilterPipe } from './user/user-filter.pipe';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'users', component: UserListComponent, canActivate: [AuthGuardService] },
  { path: 'meals', component: MealListComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    UserDetailComponent,
    UserListComponent,
    MealListComponent,
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
      UserService,
      MealService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
