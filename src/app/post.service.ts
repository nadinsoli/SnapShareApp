import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './models/post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'https://666ffbc40900b5f87248e993.mockapi.io/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiUrl);
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.apiUrl, post);
  }
}
