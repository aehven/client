import { Component, AfterViewChecked } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Angular2TokenService } from 'angular2-token';

import { Meal } from './meal';
import { MealService } from './meal.service';

@Component({
  selector: 'meal-list',
  templateUrl: './meal-list.component.html',
  styleUrls: ['../app.component.css', './meal.css']
})
export class MealListComponent implements AfterViewChecked {
  public data;
  public sortBy = "email";
  public sortOrder = "asc";

  public search = null;
  public searchControl = new FormControl();

  public totalItems = 1;
  public page = 1;
  public rowsOnPage = 15; //must be called this for table component to work

  constructor(private tokenService: Angular2TokenService,
    private mealService: MealService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngAfterViewChecked() {
    /////
    //https://angular-2-training-book.rangle.io/handout/routing/routeparams.html
    //The reason that the params property on ActivatedRoute is an Observable is that
    //the router may not recreate the component when navigating to the same component.
    // In this case the parameter may change without the component being recreated.
    /////
    this.route.params.subscribe(params => {
      this.mealService.index({user_id: params['id'], per_page: this.rowsOnPage, page: this.page})
      .subscribe( data => {
        let json = data.json();
        this.data = json.meals;
        this.totalItems = json.count
      });
    })

    this.searchControl.valueChanges
      .debounceTime(500)
      .subscribe(newValue => {
        console.log(this.search);
        this.search = newValue;
        this.page = 1;
        this.getIndex();
    });
  }

  private pageChanged(event) {
    this.rowsOnPage = event.itemsPerPage;
    this.page = event.page;
    this.getIndex();
  }

  private getIndex() {
    this.mealService.index({per_page: this.rowsOnPage, page: this.page, search: this.search})
    .subscribe( data => {
      let json = data.json();
      this.data = json.meals;
      this.totalItems = json.count
    });
  }

  private show(id) {
    this.router.navigate(['/meal/', id]);
    return false;
  }

  // this.mealService.show(1);
  // this.mealService.create({email: "x18@null.com", first_name: "x0", password: "password", role: "admin"});
  // this.mealService.update(1, {first_name: 'blah14'});
}
