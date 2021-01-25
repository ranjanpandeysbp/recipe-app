import { Component, OnInit, Input } from '@angular/core';

import { Recipe } from '../recipe';
import { Ingredients } from "../ingredients";
import { RecipeService } from '../recipe.service';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'create-recipe',
  templateUrl: './create-recipe.component.html',
  styleUrls: ['./create-recipe.component.css']
})
export class CreateRecipeComponent implements OnInit {
  
  recipe: Recipe = new Recipe();
  ingredientEntityList: Observable<Ingredients[]>;
  
  submitted = false;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  form: FormGroup;

  constructor(private recipeService: RecipeService, private formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.recipeService.getIngredientsList()
    .subscribe(ingredientEntityList => {
      console.log(ingredientEntityList);
      this.dropdownList = ingredientEntityList as Ingredients[];
    })

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      enableCheckAll: false,
      selectAllText: 'Select all',
      unSelectAllText: 'Deselect all',
      itemsShowLimit: 20,
      allowSearchFilter: true,
      searchPlaceholderText: 'Search for...',
    };

    this.form = this.formBuilder.group({
      recipeName: [null,  [Validators.required, Validators.minLength(1)]],
      noOfPeople: [null, [Validators.required, Validators.minLength(1)]],
      dishType: [null, [Validators.required, Validators.minLength(1)]],
      ingredientEntityList: [null, [Validators.required]],
      cookingInstruction: [null,  [Validators.required, Validators.minLength(1)]],
    });
    
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  newRecipe(): void {
    this.submitted = false;
    this.recipe = new Recipe();
  }
  save() {
    this.recipeService.createRecipe(this.recipe)
    .subscribe(data => console.log(data), error => console.log(error));
    this.recipe = new Recipe();
  }
  onSubmit() {
    this.submitted = true;
    console.log(this.selectedItems)
    this.save();
  }
}
