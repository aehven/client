import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { Angular2TokenService, A2tUiModule } from 'angular2-token';
import { UserComponent } from './user/user.component';
import { CustomerComponent } from './customer/customer.component';

const appRoutes: Routes = [
  { path: 'restricted', component: UserComponent },
  { path: 'user', component: UserComponent },
  { path: 'customer', component: CustomerComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule,
    A2tUiModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
      Angular2TokenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
