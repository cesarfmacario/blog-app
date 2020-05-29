import * as _ from "lodash";
import * as Fuse from "fuse.js";
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  loading = false;
  posts = [];
  postsBase = [];
  searchForm;

  optionFuse: any = {
    keys: ["title", "body"]
  }

  constructor(
    private apiService: ApiService
  ) {
    this.searchForm = new FormGroup({
      "search": new FormControl("", [])
    })
  }

  ngOnInit(): void {
    this.loading = true;
    this.apiService
      .get("/posts")
      .subscribe((data: any) => {
        this.postsBase = _.cloneDeep(data);
        this.posts = _.cloneDeep(data);
        this.loading = false;

      }, error => {
        console.log("error", error)
        alert(JSON.stringify(error.error || error))
        this.loading = false;
      })
  }

  buscar() {
    if (this.searchForm.controls.search.value) {
      let fuse = new Fuse(this.postsBase, this.optionFuse);
      this.posts = fuse.search(this.searchForm.controls.search.value || "");

    } else {
      this.posts = _.cloneDeep(this.postsBase);
    }
  }

}
