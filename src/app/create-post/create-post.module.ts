import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CreatePostComponent } from '../create-post/create-post/create-post.component';
import { CreatePostRoutingModule } from './create-post-routing.module';

@NgModule({
  declarations: [
    CreatePostComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CreatePostRoutingModule
  ]
})
export class CreatePostModule { }
