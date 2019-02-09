import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subscription: Subscription;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.subscription = this.shoppingService.changeIngredient.subscribe((newIngredient: Ingredient[]) => {
      this.ingredients = newIngredient;
    });
  }

  onEditIngredient(index: number) {
    this.shoppingService.startedEdit.next(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
