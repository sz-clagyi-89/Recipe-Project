import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyBJQkpV1kD1eN4T9AMObE6Ma4terIcWMbQ",
      authDomain: "ng-recipe-book-95899.firebaseapp.com",
    });
  }
}
