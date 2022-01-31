import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Post} from "../post.model";
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {PostsService} from "../posts.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit, OnDestroy {

  loadedPosts: Post[] = []
  isFetching = false;
  error = null;
  @ViewChild('postForm') form: NgForm | undefined;
  subscription1 = new Subscription();
  subscription2 = new Subscription();
  subscription3 = new Subscription();

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
    this.subscription1 = this.postService.createAndStorePost(postDataValue)
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
    this.subscription2 = this.postService.deletePosts().subscribe(()=> {
      this.loadedPosts = [];
    })
  }

  onHandleError() {
    this.isFetching = false;
    this.error = null;
  }

  private fetchPosts() {
    this.isFetching = true;
    this.subscription3 = this.postService.fetchPosts()
      .subscribe(posts=> {
        this.loadedPosts = posts
        this.isFetching = false;
      }, error => {
        this.error = error.error.error;
      })
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
  }
}
