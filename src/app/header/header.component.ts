import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { Response } from '@angular/http';
import { RecipesService } from '../recipes/recipes.service';
import { Recipe } from '../recipes/recipes.model';
import { AuthService } from '../auth/auth.service';




@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {

    constructor(private dataStorage: DataStorageService,
                private recipeService: RecipesService,
                private authService: AuthService) {}

    onSave() {
        this.dataStorage.saveRecipes()
            .subscribe(
                (response: Response) => { console.log(response); },
                (error) => { console.log(error); }
            );
    }

    onFetch() {
        this.dataStorage.fetchRecipes();
    }

    onLogout() {
        this.authService.logut();
    }
}
