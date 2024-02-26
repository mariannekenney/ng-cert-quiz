import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


import { BlogPost } from '../../../models/BlogPost';
import { BlogService } from '../../../services/blog.service';


@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent implements OnInit {

  public dialogRef = inject(MatDialogRef<BlogPostComponent>);
  public data: BlogPost = inject(MAT_DIALOG_DATA);
  public blogService = inject(BlogService);

  blogPostFormGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.blogPostFormGroup = new FormGroup({
      'title': new FormControl({ value: this.data?.title, disabled: !!this.data }, [Validators.required]),
      'content': new FormControl(this.data?.content, [Validators.required])
    });
  }

  submitPost(): void {
    if (this.data) {
      this.savePost();
    } else {
      this.createPost();
    }
  }

  createPost(): void {
    this.blogService.create(this.blogPostFormGroup.value)
      .subscribe({
        next: (resp) => {
          this.dialogRef.close(resp);
        }
      });
  }

  savePost(): void {
    this.blogService.save(this.data?.id, this.blogPostFormGroup.value.content)
      .subscribe({
        next: (resp) => {
          this.dialogRef.close(resp);
        }
      });
  }
}
