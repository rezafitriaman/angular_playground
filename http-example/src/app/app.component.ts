import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";
import {delay, map, timeout} from "rxjs/operators";
import {Post} from "./post.model";
import {PostsService} from "./posts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadedPosts: Post[] = []
  isFetching = false;
  error = null;
  @ViewChild('postForm') form: NgForm | undefined;

  constructor(private http: HttpClient, private postService: PostsService) {

  }

  ngOnInit() {
    this.fetchPosts();
/*    "rules": {
      ".read": "now < 1646002800000",  // 2022-2-28
        ".write": "now < 1646002800000",  // 2022-2-28
    }*/
  }

  onCreatePost() {
    const postDataValue: Post = this.form?.value;
    this.postService.createAndStorePost(postDataValue)
      .subscribe(response=> {
        console.log('response', response)
        this.fetchPosts();
      });
    this.form?.reset();
  }

  onFetchPosts() {
    this.isFetching = true;
    this.fetchPosts();
  }

  onClearPosts() {
    this.postService.deletePosts().subscribe(()=> {
      this.loadedPosts = [];
    })
  }

  onHandleError() {
    this.isFetching = false;
    this.error = null;
  }

  private fetchPosts() {
    this.isFetching = true;
    this.postService.fetchPosts()
      .subscribe(posts=> {
        this.loadedPosts = posts
        this.isFetching = false;
      }, error => {
        this.error = error.error.error;
      })
  }
}
