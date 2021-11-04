import { Component, OnInit, Input } from '@angular/core';
import {Elements} from "../types";

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.scss']
})
export class ServerElementComponent implements OnInit {
  @Input('srvElement') element: Elements;
  constructor() {
    this.element = {type: '', name: '', content: ''}
  }

  ngOnInit(): void {
  }

}
