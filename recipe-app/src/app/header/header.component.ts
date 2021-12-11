import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  collapsed = true;
  show = false;
  /*recipes = true;
  shoppingList = false;*/
  //@Output() featureSelected = new EventEmitter<string>()

/*  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }*/
}
