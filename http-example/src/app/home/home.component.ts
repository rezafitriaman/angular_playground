import {Component, OnInit, ViewChild} from '@angular/core';
import {Post} from "../post.model";
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {PostsService} from "../posts.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ngOnInit() {
  }

  onSubmit(mainForm: NgForm) {
    console.log(mainForm)
  }
}
