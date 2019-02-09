import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipesService } from '../recipes.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  subscription: Subscription;

  constructor(private recipesService: RecipesService,
              private router: Router,
              private route: ActivatedRoute) { }

  onCreateRecipe() {
    // this.recipes.push(new Recipe(
    //   'test Name ',
    //   'This is the 3rd test',
    //   'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
    //   [new Ingredient('anything', 3),
    //    new Ingredient('something', 5)
    //   ]));
      this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnInit() {
    this.subscription = this.recipesService.recipeServiceChanged
      .subscribe((recipesUpdated) => {
        this.recipes = recipesUpdated;
      });
    this.recipes = this.recipesService.getRecipes();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
