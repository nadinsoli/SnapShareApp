import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../post.service';
import { tap } from 'rxjs/operators';

export class FetchPosts {
  static readonly type = '[Posts] Fetch Posts';
}

export class AddPost {
  static readonly type = '[Posts] Add Post';
  constructor(public payload: Post) {}
}

export class ToggleLike {
  static readonly type = '[Posts] Toggle Like';
  constructor(public payload: string) {}
}

export interface PostsStateModel {
  posts: Post[];
}

@State<PostsStateModel>({
  name: 'posts',
  defaults: {
    posts: []
  }
})
@Injectable()
export class PostsState {

  constructor(private postService: PostService) {}

  @Action(FetchPosts)
  fetchPosts(ctx: StateContext<PostsStateModel>) {
    return this.postService.getPosts().pipe(
      tap(posts => {
        ctx.patchState({ posts });
      })
    );
  }

  @Action(AddPost)
  addPost(ctx: StateContext<PostsStateModel>, action: AddPost) {
    return this.postService.addPost(action.payload).pipe(
      tap(newPost => {
        const state = ctx.getState();
        ctx.setState({
          ...state,
          posts: [...state.posts, newPost]
        });
      })
    );
  }

  @Action(ToggleLike)
  toggleLike(ctx: StateContext<PostsStateModel>, action: ToggleLike) {
    const { posts } = ctx.getState();
    const postId = action.payload;

    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, isLiked: !post.isLiked } : post
    );

    ctx.setState({
      ...ctx.getState(),
      posts: updatedPosts
    });
  }

  static getPosts(state: PostsStateModel) {
    return state.posts;
  }
}
