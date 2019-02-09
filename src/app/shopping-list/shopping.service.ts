import { Ingredient } from '../shared/ingredient.model';
import { OnInit } from '@angular/core';
import { Subject } from 'rxjs';

export class ShoppingService implements OnInit {
    changeIngredient = new Subject<Ingredient[]>();
    startedEdit = new Subject<number>();

    private ingredients: Ingredient[] = [
    new Ingredient('Apple', 5),
    new Ingredient('Banana', 10)
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
    }

    addIngredient(ingredientToAdd: Ingredient) {
        this.ingredients.push(ingredientToAdd);
        this.changeIngredient.next(this.ingredients.slice());
    }

    addIngredients(ingredientFromRecipe: Ingredient[]) {
        // for (let ingredient of ingredientFromRecipe) {
        //     this.addIngredient(ingredient);
        // }
        this.ingredients.push(...ingredientFromRecipe);
        this.changeIngredient.next(this.ingredients.slice());
    }

    updateIngredients(index: number, newIngredient: Ingredient) {
        this.ingredients[index] = newIngredient;
        this.changeIngredient.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.changeIngredient.next(this.ingredients.slice());
    }

    ngOnInit() { }
}
