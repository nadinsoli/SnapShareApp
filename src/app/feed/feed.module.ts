import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed/feed.component';
import { PostComponent } from './post/post.component';


@NgModule({
  declarations: [
    FeedComponent,
    PostComponent
  ],
  imports: [
    CommonModule,
    FeedRoutingModule
  ],
  exports: [
    FeedComponent
  ]
})
export class FeedModule { }
