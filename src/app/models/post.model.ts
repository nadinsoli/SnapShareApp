export interface Post {
  id: string;
  image: string;
  description: string;
  likes: number;
  isLiked: boolean;
  profile: {
    username: string;
    profilePicture: string;
  };
}
