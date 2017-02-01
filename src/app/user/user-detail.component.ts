import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';
import { NotificationsService } from 'angular2-notifications';

import { User } from './user';
import { UserService } from './user.service';

import { MyValidators } from '../shared/my-validators';

@Component({
  selector: 'user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['../app.component.css', './user.css']
})
export class UserDetailComponent implements OnInit {
  private component = this;
  private id: number;
  private user: User;
  private form : FormGroup;
  private isReadOnly:boolean=true;

  private title: string = 'Really delete this user?';
  private confirmClicked: boolean = false;
  private cancelClicked: boolean = false;

  constructor(private tokenService: Angular2TokenService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private notificationsService: NotificationsService,
              fb: FormBuilder) {
                this.form = fb.group({
                  'first_name' : [null, Validators.required],
                  'last_name' : [null, Validators.required],
                  'phone' : null,
                  'address' : null,
                  'email' :  [null, [Validators.required, MyValidators.mailFormat]],
                  'role' : null,
                  'password' : '',
                  'confirmPassword': ''
                },
                {validator: MyValidators.matchingPasswords('password', 'confirmPassword')})
              }

  ngOnInit() {
    this.getUser();
  }

  getUser():void {
    /////
    //https://angular-2-training-book.rangle.io/handout/routing/routeparams.html
    //The reason that the params property on ActivatedRoute is an Observable is that
    //the router may not recreate the component when navigating to the same component.
    // In this case the parameter may change without the component being recreated.
    /////
    this.route.params.subscribe(params => {
      if(params['id'] == 'new') {
        this.isReadOnly = false;
      }
      else {
        this.userService.show(+params['id'])
        .subscribe( data => {
          this.user = data.json() as User;
          this.form.patchValue(this.user);
          console.log(JSON.stringify(this.user));
        });
      }
    })
  }

  submitForm(values): void {
    if(this.userService.shownUser == null) {
      this.userService.create(values).subscribe(
        res =>      {
          console.log("creation successful");
          this.notificationsService.success("Yay!", "User created successfully");
          this.isReadOnly = true;
        },
        error => {
          console.log(error);
          this.notificationsService.error("Oops!", "User creation failed");
        }
      );
    }
    else {
      this.userService.update(this.user.id, values).subscribe(
        res =>      {
          console.log("update successful");
          this.notificationsService.success("Yay!", "User updated successfully");
          this.isReadOnly = true;
        },
        error => {
          console.log(error);
          this.notificationsService.error("Oops!", "User update failed");
        }
      );
    }
  }

  delete(): void {
    this.userService.delete(this.user.id)
    .subscribe(
      res => {
        console.log("delete successful");
        this.router.navigate(['/users']);
      });
  }

  openMap(): boolean {
    // http://stackoverflow.com/a/24778057/5874744
    window.open('http://maps.google.com?q='+this.user.address);
    // this isn't necessary if open maps in new tab with address query
    // window.open('http://maps.google.com/maps?z=10&t=m&q=loc:'+this.user.latitude+'+'+this.user.longitude);
    return false;
  }
}
