import { Component } from '@angular/core';
import {ElementData, Elements} from "./types";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  serverElements: Array<Elements> = [{type: 'server', name: 'Test server', content: 'Just a test'}];

  onServerAdded(serverData: ElementData) {
    if(serverData.name !== '' && serverData.content !== '') {
            this.serverElements.push({
              type: 'server',
              name: serverData.name,
              content: serverData.content
            });
    }else {
      console.log('please add server name and server content');
    }
  }
  onBlueprintAdded(serverData: ElementData) {
    if(serverData.name !== '' && serverData.content !== '') {
            this.serverElements.push({
              type: 'blueprint',
              name: serverData.name,
              content: serverData.content
            });
    }else {
      console.log('please add blueprint name and server content');
    }
  }
}


