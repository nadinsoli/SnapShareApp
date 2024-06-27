import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  posts$: Observable<any[]> = of([]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.posts$ = this.http.get<any[]>('https://666ffbc40900b5f87248e993.mockapi.io/posts')
      .pipe(
        tap(data => console.log('Fetched posts', data)),
        catchError(error => {
          console.error('Error fetching posts', error);
          return [];
        })
      );
  }

  toggleLike(postId: string) {
    console.log('Toggle like for post:', postId);
  }
}
