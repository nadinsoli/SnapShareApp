import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { FetchPosts, ToggleLike } from '../../state/posts.actions';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  posts$: Observable<any[]> = of([]);

  constructor(private http: HttpClient, private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(new FetchPosts());
    this.posts$ = this.store.select(state => state.posts.posts);
  }

  toggleLike(post: any) {
    this.store.dispatch(new ToggleLike(post.id));
  }
}
