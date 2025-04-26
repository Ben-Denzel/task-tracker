import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../post';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core'; // <-- Import PLATFORM_ID

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  posts: Post[] = [];

  constructor(
    public postService: PostService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object // <-- Inject platformId
  ) {}

  ngOnInit(): void {
    console.log(this.router.url);

    // Check if it's the browser before using `window`
    if (isPlatformBrowser(this.platformId)) {
      console.log(window.location.href);
    }

    this.postService.getAll().subscribe((data: Post[]) => {
      this.posts = data;
      console.log(this.posts);
    });
  }

  deletePost(id: number) {
    this.postService.delete(id).subscribe(res => {
      this.posts = this.posts.filter(item => item._id !== id);
      console.log('Post deleted successfully!');
    });
  }
}
