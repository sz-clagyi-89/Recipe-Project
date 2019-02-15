import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
// import { ShoppingListComponent } from './shopping-list/shopping-list.component';
// import { ShoppingEditComponent } from './shopping-list/shopping-edit/shopping-edit.component';

import { ShoppingService } from './shopping-list/shopping.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipesService } from './recipes/recipes.service';
import { HttpModule } from '@angular/http';
import { DataStorageService } from './shared/data-storage.service';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth-guard.service';
import { SharedModule } from './shared/shared.module';
import { ShoppingModule } from './shopping-list/Shopping.module';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    SharedModule,
    ShoppingModule,
    AuthModule,
    AppRoutingModule
  ],
  providers: [ShoppingService, RecipesService, DataStorageService, AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
