import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { RecipesService } from '../recipes/recipes.service';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipes.model';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class DataStorageService {
    constructor(private http: Http,
                private recipeService: RecipesService,
                private authService: AuthService) { }

    saveRecipes() {
        // const headers = new Headers({'Content-Type': 'application/json'});
        const token = this.authService.getToken();
        return this.http.put('https://ng-recipe-book-95899.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    fetchRecipes() {
        const token = this.authService.getToken();
        this.http.get('https://ng-recipe-book-95899.firebaseio.com/recipes.json?auth=' + token)
            .pipe(
                map(
                    (response: Response) => {
                        const recipes = response.json();
                        for (const recipe of recipes) {
                            if (!recipe['ingredients']) {
                                console.log(recipe);
                                recipe['ingredients'] = [];
                            }
                        }
                        return recipes;
                })
            )
            .subscribe(
                (recipes: Recipe[]) => {
                    this.recipeService.setRecipes(recipes);
                }
            );
    }
}
