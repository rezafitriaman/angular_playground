import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ElementData} from "../types";

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<ElementData>();
  @Output('bpCreated') bluePrintCreated = new EventEmitter<ElementData>();
  newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer() {
    if(this.newServerName !== '' && this.newServerContent !== '') {
      this.serverCreated.emit({
        name: this.newServerName,
        content: this.newServerContent
      })
    }else {
      console.log('please add server name and server content');
    }
  }
  onAddBlueprint() {
    if(this.newServerName !== '' && this.newServerContent !== '') {
      this.bluePrintCreated.emit({
        name: this.newServerName,
        content: this.newServerContent
      })
    }else {
      console.log('please add blueprint name and server content');
    }
  }

}
