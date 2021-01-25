import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngredientsListComponent } from './ingredients-list/ingredients-list.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { CreateRecipeComponent } from './create-recipe/create-recipe.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

 
const routes: Routes = [
    { path: 'recipe', redirectTo: 'recipe', pathMatch: 'full' },
    { path: 'ingredients', component: IngredientsListComponent },
    { path: 'recipe', component: RecipeListComponent },
    { path: 'add', component: CreateRecipeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
