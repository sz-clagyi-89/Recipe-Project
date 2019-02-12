import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { RecipesService } from '../recipes/recipes.service';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Recipe } from '../recipes/recipes.model';

@Injectable()
export class DataStorageService {
    constructor(private http: Http,
                private recipeService: RecipesService) { }

    saveRecipes() {
        const recipes = this.recipeService.getRecipes();
        const headers = new Headers({'Content-Type': 'application/json'});
       return this.http.put('https://ng-recipe-book-95899.firebaseio.com/recipes.json', recipes);
    }

    fetchRecipes() {
        return this.http.get('https://ng-recipe-book-95899.firebaseio.com/recipes.json')
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
            // .pipe(
            //     map((response: Response) => {
            //             const data = response.json();
            //             for (const recipe of data) {
            //                 recipe.name = 'FETCHED_' + recipe.name;
            //             }
            //             return data;
            //         }
            //     )
            // )
            // .pipe(catchError(error => {
            //     return throwError('Something has gone wrong!');
            // }));
    }
}
