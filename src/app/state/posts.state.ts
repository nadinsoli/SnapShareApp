import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { PostService } from '../post.service';
import { FetchPosts, AddPost, ToggleLike } from './posts.actions';
import { tap } from 'rxjs/operators';

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

  @Selector()
  static getPosts(state: PostsStateModel) {
    return state.posts;
  }

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

    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    });

    ctx.setState({
      ...ctx.getState(),
      posts: updatedPosts
    });
  }
}
