import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipes.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  element: Recipe;
  ID: number;

  onRetrieveIngredients() {
    this.recipeService.passIngredients(this.element.ingredients);
    // console.log(this.element.ingredients);
  }

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipeService: RecipesService,
              ) { }

  ngOnInit() {
    // this.element = this.recipeService.getRecipe(this.ID);
    this.route.params.subscribe((params: Params) => {
      this.ID = +params['id'];
      this.element = this.recipeService.getRecipe(+params['id']);
    });
  }

  navigateToEdit() {
    this.router.navigate(['/recipes', this.ID, 'edit']);
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.ID);
    this.router.navigate(['/recipes'], {relativeTo: this.route});
  }

}
