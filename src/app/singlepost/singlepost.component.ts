import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-singlepost',
  templateUrl: './singlepost.component.html',
  styleUrls: ['./singlepost.component.scss']
})
export class SinglepostComponent implements OnInit {

  id;
  post: any = {};
  comentarios = [];
  loading = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute
      .params
      .subscribe(params => {
        if (params.id) {

          this.loading = true;
          this.id = params.id;

          this.apiService.get("/posts/" + this.id)
            .subscribe((response: any) => {
              this.post = response;
              this.loading = false;

            }, error => {
              console.log(error);
              alert(JSON.stringify(error.error || error))
              this.loading = false;
              // this.goBack();
            })

          this.apiService.get("/posts/" + this.id + "/comments")
            .subscribe((response: any) => {
              this.comentarios = response;

            }, error => {
              console.log(error);
              alert(JSON.stringify(error.error || error))
              // this.goBack();
            })
        } else {
          this.goBack()
        }
      })
  }

  goBack() {
    this.router.navigate(["/posts"])
  }

  ngOnInit(): void {
  }

}
