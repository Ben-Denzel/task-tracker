import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  id!: number;
  post!: Post;

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required)
  });

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];

    this.postService.find(this.id).subscribe((data: Post) => {
      console.log('Fetched post data:', data);  // Check if data is fetched
      this.post = data;
      this.form.patchValue({
        title: data.title,
        content: data.content
      });
    });
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.invalid) return;

    const updatedPost: Post = {
      _id: this.post._id,  // Ensure _id is passed to the backend
      ...this.form.value as { title: string; content: string }
    };

    this.postService.update(this.id, updatedPost).subscribe(() => {
      alert('Post updated successfully!');
      this.router.navigateByUrl('/post/index');  // Navigate after update
    });
  }
}
