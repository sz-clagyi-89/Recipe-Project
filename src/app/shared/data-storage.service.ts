import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { RecipesService } from '../recipes/recipes.service';
import { map } from 'rxjs/operators';
import { Recipe } from '../recipes/recipes.model';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';


@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient,
                private recipeService: RecipesService,
                private authService: AuthService) { }

    saveRecipes() {
        // const headers = new Headers({'Content-Type': 'application/json'});
        const token = this.authService.getToken();
        // return this.httpClient.put('https://ng-recipe-book-95899.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {
        //     observe: 'body',
        //     params: new HttpParams().set('auth', token)
        // });
        const req = new HttpRequest('PUT', 'https://ng-recipe-book-95899.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {reportProgress: true, params: new HttpParams().set('auth', token)})
        return this.httpClient.request(req);
    }

    fetchRecipes() {
        const token = this.authService.getToken();
        // this.httpClient.get<Recipe[]>('https://ng-recipe-book-95899.firebaseio.com/recipes.json?auth=' + token)
        this.httpClient.get<Recipe[]>('https://ng-recipe-book-95899.firebaseio.com/recipes.json', {
            observe: 'body',
            responseType: 'json',
            params: new HttpParams().set('auth', token)
        })
            .pipe(
                map(
                    (recipes) => {
                        console.log(recipes);
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
