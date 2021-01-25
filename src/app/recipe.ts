import { Ingredients } from "./ingredients";

export class Recipe {
  id: number;
  recipeName: string;
  dishType: string;
  creationDateTime: Date;
  noOfPeople: number;
  ingredientEntityList: Ingredients[];
  cookingInstruction: string;
}
