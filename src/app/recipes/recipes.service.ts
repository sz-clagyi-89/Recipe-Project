import { Recipe } from './recipes.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.service';
import { Subject } from 'rxjs';
// import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RecipesService {
    recipeServiceChanged =  new Subject<Recipe[]>();
    selectedRecipe = new EventEmitter<Recipe>();

    constructor(private slService: ShoppingService,
                private http: HttpClient) {}

    private recipes: Recipe[] = [
        new Recipe(
            'Pho Soup',
            'Vietnamese Meat Soup',
            'https://www.gimmesomeoven.com/wp-content/uploads/2013/09/Pho-1.jpg',
            [new Ingredient('Brisket', 5),
             new Ingredient('Soy-bean', 20),
             new Ingredient('Glass noodles', 20)]),
        new Recipe(
            'Ramen Soup',
            'Chinese Meat Soup',
            'https://img.taste.com.au/W4oF1fh1/w643-h428-cfill-q90/taste/2017/08/ramen-129052-2.jpg',
            [new Ingredient('Eggs', 3),
             new Ingredient('beef', 5),
             new Ingredient('noodles', 30)])
    ];

    setRecipes(fetchedRecipes: Recipe[]) {
        this.recipes = fetchedRecipes;
        this.recipeServiceChanged.next(this.recipes.slice());
    }

    getRecipes() {
        return this.recipes.slice();
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    passIngredients(ingredientsToSl: Ingredient[]) {
        this.slService.addIngredients(ingredientsToSl);
    }

    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipeServiceChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipeServiceChanged.next(this.recipes.slice());
    }

    deleteRecipe(id: number) {
        this.recipes.splice(id, 1);
        this.recipeServiceChanged.next(this.recipes.slice());
    }
}
