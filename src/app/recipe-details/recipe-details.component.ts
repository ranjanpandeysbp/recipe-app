import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe';
import { Router } from '@angular/router';
 
import { RecipeListComponent } from '../recipe-list/recipe-list.component';
 
@Component({
  selector: 'recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
 
  @Input() recipe: Recipe;
 
  constructor(private router: Router, private recipeService: RecipeService, private listComponent: RecipeListComponent) { }
 
  ngOnInit() {
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe.id)
      .subscribe(
        data => {
          console.log(data);
          this.listComponent.reloadData();
        },
        error => console.log(error));
  }
  updateRecipe(id) {
    this.router.navigate(['add', {'recipeId':id}]);
  }
}
