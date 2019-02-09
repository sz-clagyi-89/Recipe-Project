import { Ingredient } from './ingredient.model';
import { Injectable } from '@angular/core';
import { ShoppingService } from '../shopping-list/shopping.service';

@Injectable()
export class IngredientsService {

    constructor(private slService: ShoppingService) { }

    getIngredientArray(ingredientArray: Ingredient[]) {
        this.slService.addIngredients(ingredientArray);
    }
}
