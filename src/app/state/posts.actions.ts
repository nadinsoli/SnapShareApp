import { Post } from '../models/post.model';

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
