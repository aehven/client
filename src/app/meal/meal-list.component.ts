import { Component, OnInit } from '@angular/core';
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
export class MealListComponent implements OnInit {
  public data;
  public sortBy = "dt";
  public sortOrder = "desc";

  public search = null;
  public searchControl = new FormControl();

  public totalItems = 1;
  public page = 1;
  public rowsOnPage = 15; //must be called this for table component to work

  public userId = null;

  newDate: Date;
  newTime: string;
  newDescription: string;
  newCalories: number;

  constructor(private tokenService: Angular2TokenService,
    private mealService: MealService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    /////
    //https://angular-2-training-book.rangle.io/handout/routing/routeparams.html
    //The reason that the params property on ActivatedRoute is an Observable is that
    //the router may not recreate the component when navigating to the same component.
    // In this case the parameter may change without the component being recreated.
    /////
    this.route.params.subscribe(params => {
      this.userId = params['id']
      this.mealService.index({user_id: this.userId, per_page: this.rowsOnPage, page: this.page})
      .subscribe( data => {
        let json = data.json();
        this.data = json.meals;
        this.totalItems = json.count
      });
    })
  }

  private pageChanged(event) {
    this.rowsOnPage = event.itemsPerPage;
    this.page = event.page;
    this.getIndex();
  }

  private getIndex() {
    this.mealService.index({user_id: this.userId, per_page: this.rowsOnPage, page: this.page, search: this.search})
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

  private updateMeal(event, item) {
    let values = {
      [event.target.name.split('_')[0]]: event.target.value
    }

    this.mealService.update(
      event.target.name.split('_')[1],
      values
    ).subscribe(data => {
      console.log(data);
    })
  }

  private addMeal(event) {
    this.mealService.create({
      user_id: this.userId,
      date: this.newDate,
      time: this.newTime,
      description: this.newDescription,
      calories: this.newCalories
    }).subscribe(data => {
      this.newDate = null;
      this.newTime = null;
      this.newDescription = null;
      this.newCalories = null;
      this.getIndex();
    })
  }
}
