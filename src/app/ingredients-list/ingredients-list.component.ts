import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { Ingredients } from '../ingredients';

@Component({
  selector: 'ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.css']
})
export class IngredientsListComponent implements OnInit {
  
  ingredients: Observable<Ingredients[]>;
  showMenu: any;
  
  constructor(private recipeService: RecipeService) { }
  
  ngOnInit() {
    let data = JSON.parse(localStorage.getItem("data"));
    if(data){
      this.showMenu = true;
    }else{
      this.showMenu = false;
    }
    this.reloadData();
  }
  
  reloadData() {
    this.ingredients = this.recipeService.getIngredientsList();
  }
}
