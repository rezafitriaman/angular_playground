import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {ElementData} from "../types";

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss']
})
export class CockpitComponent implements OnInit {
  @Output() serverCreated = new EventEmitter<ElementData>();
  @Output('bpCreated') bluePrintCreated = new EventEmitter<ElementData>();
  //newServerName = '';
  //newServerContent = '';
  @ViewChild('serverContentInput', {static: true}) serverContentInput: ElementRef | undefined;
  constructor() {
    console.log('constructor')
  }
  ngOnInit() {
  }

  onAddServer(serverNameInput: HTMLInputElement) {
    if(serverNameInput.value !== '' && this.serverContentInput &&
      this.serverContentInput.nativeElement.value !== '') {

      this.serverCreated.emit({
        name: serverNameInput.value,
        content: this.serverContentInput && this.serverContentInput.nativeElement.value
      })
    }else {
      console.log('please add server name and server content');
    }
  }
  onAddBlueprint(serverNameInput: HTMLInputElement) {
    if(serverNameInput.value !== '' && this.serverContentInput &&
      this.serverContentInput.nativeElement.value !== '') {
      this.bluePrintCreated.emit({
        name: serverNameInput.value,
        content: this.serverContentInput.nativeElement.value
      })
    }else {
      console.log('please add blueprint name and server content');
    }
  }
}
