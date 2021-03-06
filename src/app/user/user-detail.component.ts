import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';
import { NotificationsService } from 'angular2-notifications';

import { User } from './user';
import { DataService } from '../data.service';

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
              private dataService: DataService,
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
        this.dataService.show("user", +params['id'])
        .subscribe( data => {
          this.user = data.json() as User;
          this.form.patchValue(this.user);
          var roleSelect = document.getElementById("roleSelect");
          roleSelect.setAttribute("disabled", "disabled");
        },
        error => {console.error(error)});
      }
    })
  }

  submitForm(values): void {
    if(this.dataService.current["user"] == null) {
      this.dataService.create("user", values).subscribe(
        res =>      {
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
      this.dataService.update("user", this.user.id, values).subscribe(
        res =>      {
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
    this.dataService.delete("user", this.user.id)
    .subscribe(
      res => {
        this.notificationsService.success("Yay!", "User deleted successfully");
        this.router.navigate(['/users']);
      },
      error => {
        console.log(error);
        this.notificationsService.error("Oops!", "User deletion failed");
      });
  }

  openMap(): boolean {
    // http://stackoverflow.com/a/24778057/5874744
    let q = this.form.controls['address'].value;
    window.open('http://maps.google.com?q='+q);
    // this isn't necessary if open maps in new tab with address query
    // window.open('http://maps.google.com/maps?z=10&t=m&q=loc:'+this.user.latitude+'+'+this.user.longitude);
    return false;
  }

  toggleReadOnly(): void {
    this.isReadOnly = !this.isReadOnly;
    var roleSelect = document.getElementById("roleSelect");
    if(this.isReadOnly) {
      roleSelect.setAttribute("disabled", "disabled");
      this.getUser();
    }
    else {
      roleSelect.removeAttribute("disabled");
    }
  }
}
