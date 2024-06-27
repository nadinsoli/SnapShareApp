import { State, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../post.service';
import { tap } from 'rxjs/operators';
import { FetchPosts, AddPost, ToggleLike } from '../state/posts.actions';

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
    const state = ctx.getState();
    const postId = action.payload;
    const updatedPosts = state.posts.map(post =>
      post.id === postId ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 } : post
    );

    ctx.patchState({ posts: updatedPosts });

    const toggledPost = updatedPosts.find(post => post.id === postId);
    if (toggledPost) {
      this.postService.updatePost(toggledPost).subscribe();
    }
  }
}
