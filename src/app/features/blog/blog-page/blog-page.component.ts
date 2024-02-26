import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { BlogService } from '../../../services/blog.service';
import { BlogPostComponent } from '../blog-post/blog-post.component';
import { BlogPost } from '../../../models/BlogPost';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.scss'
})
export class BlogPageComponent implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private blogService = inject(BlogService);
  
  allBlogPosts: BlogPost[] = [];

  ngOnInit(): void {
    this.allBlogPosts = this.route.snapshot.data['allBlogPosts'];
  }

  logout(): void {
    this.blogService.removeToken();
    this.router.navigateByUrl('login');
  }

  openPostDialog(data?: BlogPost): void {
    const dialogRef = this.dialog.open(BlogPostComponent, {
      data,
      width: '50%'
    });

    dialogRef.afterClosed().subscribe((data: BlogPost) => {
      if (data) {
        if (this.allBlogPosts.find((blog: BlogPost) => blog.id == data.id)) {
          this.allBlogPosts = this.allBlogPosts.map((blog: BlogPost) => 
            (blog.id == data.id) ? data : blog
          );
        } else {
          this.allBlogPosts.push(data);
        }
      }
    })
  }

  deletePost(id: number): void {
    this.blogService.delete(id)
      .subscribe({
        next: () => {
          this.allBlogPosts = this.allBlogPosts.filter((post: BlogPost) => post.id !== id);
        }
      });
  }
}
