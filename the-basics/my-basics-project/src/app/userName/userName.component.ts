import {OnInit , Component} from '@angular/core'

@Component({
  selector: 'app-userName',
  templateUrl: 'userName.component.html',
  styles: []
})
export class UserNameComponent implements OnInit {
  userName: string = 'Please input your username';
  inputHasChanged: boolean = false;
  successMessage: string = '';

  onFocusInput() {
    this.userName = '';
  }
  onChangeInput() {
    console.log('input has changed');
    this.inputHasChanged = true;
  }
  sendMessage() {
    this.successMessage = 'Your userName has been sent!';
  }
  reset() {
    this.userName = '';
    this.successMessage = '';
  }
  ngOnInit(): void {
  }
}
