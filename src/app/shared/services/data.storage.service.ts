import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Recipe } from "src/app/shared/models/recipe.model";
import { RecipeService } from "src/app/shared/services/recipe.service";
import { map, tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class DataStorageService {

    constructor(private http: HttpClient,
        private recipeService: RecipeService) {  }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ng-course-recipe-book-a904a-default-rtdb.firebaseio.com/recipes.json',
        recipes).subscribe(resposne => {
            console.log(resposne);
        });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://ng-course-recipe-book-a904a-default-rtdb.firebaseio.com/recipes.json')
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            })
        }),
        tap(recipes => {
            this.recipeService.setRecipes(recipes);
        })
        );
    }
}