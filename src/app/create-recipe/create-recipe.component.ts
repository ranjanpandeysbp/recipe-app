import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  recipeId: any;

  form: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private formBuilder: FormBuilder) { }
  
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.recipeId = params['recipeId'];
    });
      console.log(this.recipeId);

    if(this.recipeId){
      this.recipeService.getRecipe(this.recipeId)
      .subscribe(recipeData => {
        this.recipe.id = this.recipeId;
        this.recipe.recipeName = recipeData['recipeName'];
        this.recipe.cookingInstruction = recipeData['cookingInstruction'];
        this.recipe.creationDateTime = recipeData['creationDateTime'];
        this.recipe.dishType = recipeData['dishType'];
        this.recipe.ingredientEntityList = recipeData['ingredientEntityList'];
        this.recipe.noOfPeople = recipeData['noOfPeople'];
      });
    }
    else{
      this.recipe = new Recipe();
      this.recipeService.getIngredientsList()
      .subscribe(ingredientEntityList => {
        console.log(ingredientEntityList);
        this.dropdownList = ingredientEntityList as Ingredients[];
      });
    }

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
    if(this.recipeId){
      this.recipeService.updateRecipe(this.recipe)
      .subscribe(data => console.log(data), error => console.log(error));
    }else{
      this.recipeService.createRecipe(this.recipe)
      .subscribe(data => console.log(data), error => console.log(error));
      this.recipe = new Recipe();
    }
  }
  onSubmit() {
    this.submitted = true;
    this.save();
  }
}
