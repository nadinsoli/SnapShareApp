import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { FetchPosts, ToggleLike } from '../../state/posts.actions';
import { Observable } from 'rxjs';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  posts$!: Observable<Post[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new FetchPosts());
    this.posts$ = this.store.select(state => state.posts.posts);
  }

  toggleLike(postId: string) {
    this.store.dispatch(new ToggleLike(postId));
  }
}
