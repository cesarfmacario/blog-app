import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { SinglepostComponent } from './singlepost/singlepost.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'posts',
    pathMatch: 'full',
  },
  {
    path: 'posts',
    component: PostsComponent,
  },
  {
    path: 'singlepost/:id',
    component: SinglepostComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
