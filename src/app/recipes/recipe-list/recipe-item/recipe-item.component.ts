import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipes.model';
import { RecipesService } from '../../recipes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipeItem: Recipe;
  @Input() index: number;
  // recipeID: number;

  // onSelectRecipe() {
  //   this.recipeServices.selectedRecipe.emit(this.recipeItem);
  // }

  constructor(private recipeServices: RecipesService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    // this.recipeID = +this.route.snapshot.params['i'];
    // this.recipeItem = this.recipeServices.getRecipe(this.recipeID);
  }

}
