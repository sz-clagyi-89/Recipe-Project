import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingService } from '../shopping.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  editMode = false;
  subscription: Subscription;
  editItemIndex: number;
  editItem: Ingredient;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit() {
    this.subscription = this.shoppingService.startedEdit
      .subscribe((index: number) => {
        this.editMode = true;
        this.editItemIndex = index;
        this.editItem = this.shoppingService.getIngredient(index);
        this.slForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
      });
  }

  onSubmit(form: NgForm): void {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingService.updateIngredients(this.editItemIndex, newIngredient);
    } else {
      this.shoppingService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onClear(): void {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete(): void {
    if (this.editMode) {
      this.shoppingService.deleteIngredient(this.editItemIndex);
    }
    this.onClear();
  }

  // onCreateIngredient() {
  //   console.log(this.ingreditentsForm);
  //   console.log(this.nameInput);
  // }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
