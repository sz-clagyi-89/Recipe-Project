import { Component } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';

import { RecipesService } from '../../recipes/recipes.service';
import { AuthService } from '../../auth/auth.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';




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
                (response) => {
                    console.log(response);
                },
                (error) => { console.log(error); }
            );
    }

    onFetch() {
        this.dataStorage.fetchRecipes();
    }

    onLogout() {
        this.authService.logut();
    }

    isAuthenticated() {
        return this.authService.isAuthenticated();
    }
}
