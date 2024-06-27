export interface Post {
  id: string;
  imageUrl: string;
  description: string;
  likes: number;
  isLiked: boolean;
  profile: {
    username: string;
    profilePicture: string;
  };
}
