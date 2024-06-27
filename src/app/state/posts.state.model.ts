export interface Post {
    id: number;
    profile: {
      username: string;
      profilePicture: string;
    };
    image: string;
    description: string;
    likes: number;
    isLiked: boolean;
  }
  
  export interface PostStateModel {
    posts: Post[];
  }