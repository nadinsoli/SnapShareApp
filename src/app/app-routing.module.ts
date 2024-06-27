// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'feed', loadChildren: () => import('./feed/feed.module').then(m => m.FeedModule) },
  { path: 'create-post', loadChildren: () => import('./create-post/create-post.module').then(m => m.CreatePostModule) },
  { path: '', redirectTo: '/feed', pathMatch: 'full' },
  { path: '**', redirectTo: '/feed' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
