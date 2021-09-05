import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();
    private recipes: Recipe[] = [
        new Recipe('A Test Recipe',
        'Just a test',
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/easy-cheap-dinners-weeknight-1604466210.jpg?crop=0.502xw:1.00xh;0.498xw,0&resize=640:*',
        [
            new Ingredient('abc', 1),
            new Ingredient('abc', 2)
        ]),
        new Recipe('A Test Recipe 2',
        'Just a test 2',
        'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/easy-cheap-dinners-weeknight-1604466210.jpg?crop=0.502xw:1.00xh;0.498xw,0&resize=640:*',
        [
            new Ingredient('abc', 1),
            new Ingredient('abc', 2)
        ])
      ];

      getRecipes() {
          return this.recipes.slice(); // We don't get actual recipes array, but a copy of it
      }
}