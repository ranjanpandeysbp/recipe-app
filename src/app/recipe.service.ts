import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private baseUrlApi = "https://recipeapi2021.herokuapp.com";

  constructor(private http: HttpClient) {}

  registerUser(user: Object): Observable < Object > {
    return this.http.post(`${this.baseUrlApi}` + `/api/v1/auth/register`, user);
  }

  login(user: Object): Observable < Object > {
    return this.http.post(`${this.baseUrlApi}` + `/api/v1/auth/login`, user);
  }

  getRecipe(id: number): Observable < Object > {
    let data = JSON.parse(localStorage.getItem("data"));
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${data.token}`)
    }
    return this.http.get(`${this.baseUrlApi}`+`/api/v1/users/${data.userId}/recipes/${id}`);
  }

  createRecipe(recipe: Object): Observable < Object > {
    let data = JSON.parse(localStorage.getItem("data"));
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${data.token}`)
    }
    return this.http.post(`${this.baseUrlApi}` + `/api/v1/users/${data.userId}/recipes`, recipe, header);
  }

  updateRecipe(value: any): Observable < Object > {
    let data = JSON.parse(localStorage.getItem("data"));
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${data.token}`)
    }
    return this.http.put(`${this.baseUrlApi}`+ `/api/v1/users/${data.userId}/recipes`, value);
  }

  deleteRecipe(id: number): Observable < any > {
    let data = JSON.parse(localStorage.getItem("data"));
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${data.token}`)
        .set('responseType', 'text')
    }
    return this.http.delete(`${this.baseUrlApi}`+ `/api/v1/users/${data.userId}/recipes/${id}`, header);
  }

  getRecipesList(): Observable < any > {
    let data = JSON.parse(localStorage.getItem("data"));
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${data.token}`)
    }
    return this.http.get(`${this.baseUrlApi}`+ `/api/v1/users/${data.userId}/recipes`, header);
  }

  getIngredientsList(): Observable < any > {
    let data = JSON.parse(localStorage.getItem("data"));
    let header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${data.token}`)
    }
    return this.http.get(`${this.baseUrlApi}`+ `/api/v1/ingredients`, header);
  }

  getRecipesByName(name: string): Observable < any > {
    return this.http.get(`${this.baseUrlApi}/name/${name}`);
  }

  deleteAll(): Observable < any > {
    return this.http.delete(`${this.baseUrlApi}` + `/delete`, {
      responseType: 'text'
    });
  }
}
