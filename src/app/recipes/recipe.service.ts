import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
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

    constructor(private shoppingListService: ShoppingListService) {

    }

    getRecipes() : Recipe[] {
        return this.recipes.slice(); // We don't get actual recipes array, but a copy of it
    }

    getRecipe(id: number) : Recipe {
        return this.recipes[id];
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe) : void {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) : void {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number) : void {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }


}