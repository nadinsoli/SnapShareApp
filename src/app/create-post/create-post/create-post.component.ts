import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngxs/store';
import { AddPost } from '../../state/posts.actions';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent {

  constructor(private store: Store) {}

  addPost(postForm: NgForm) {
    if (postForm.valid) {
      const { image, description } = postForm.value;
      const newPost = {
        id: '',
        image,
        description,
        likes: 0,
        isLiked: false,
        profile: {
          username: 'username', 
          profilePicture: 'profilePicture'
        }
      };
      this.store.dispatch(new AddPost(newPost));
      postForm.resetForm();
    }
  }
}
