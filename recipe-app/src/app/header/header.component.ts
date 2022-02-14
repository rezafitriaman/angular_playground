import {Component, EventEmitter, OnDestroy, OnInit, Output} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "../recipes/recipe.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  collapsed = true;
  show = false;
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService,
              private authService: AuthService) {
    this.userSub = new Subscription();
  }

  ngOnInit(): void {
    console.log('hearder', this.isAuthenticated); 
    this.userSub = this.authService.user.subscribe(user => {
      console.log('header user', user);
      this.isAuthenticated = !user ? false : true;
      //this.isAuthenticated = !!user;
    })
  }

  onSaveData() {
      this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes()
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  onLogout() {
    this.authService.logOut()
  }
  /*recipes = true;
  shoppingList = false;*/

/*  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }*/
}
