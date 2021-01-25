import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
 
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
 
@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  recipes: Observable < Recipe[] > ;
  showMenu: any;
  
  constructor(private recipeService: RecipeService) {}

  ngOnInit() {
    let data = JSON.parse(localStorage.getItem("data"));
    if(data){
      this.showMenu = true;
    }else{
      this.showMenu = false;
    }
    this.reloadData();
  }

  deleteRecipes() {
    this.recipeService.deleteAll()
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log('ERROR: ' + error));
  }

  reloadData() {
     this.recipeService.getRecipesList()
    .subscribe(
      data => {
        this.recipes = data;
      },
      error => console.log('ERROR: ' + error));
  }
}
