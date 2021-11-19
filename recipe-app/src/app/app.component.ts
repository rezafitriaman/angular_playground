import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loadedFeature = 'recipes';

  constructor() {

  }
  onNavigate(feature: string) {
    console.log(event);
    this.loadedFeature = feature;
  }
}

