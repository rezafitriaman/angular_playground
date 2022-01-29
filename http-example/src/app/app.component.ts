import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedPosts = []

  constructor(private http: HttpClient) {
  }

  onCreatePost(postData: {title: string, content: string}) {
    console.log(postData);
    this.http.post(
      'https://ng-complete-guide-258b9-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      postData
    ).subscribe(response=> {
      console.log(response);
    });
  }

  onFetchPosts() {

  }

  onClearPosts() {

  }
}
