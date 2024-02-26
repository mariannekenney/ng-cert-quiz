import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { BlogService } from '../../services/blog.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule
  ],
  providers: [
    BlogService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private blogService = inject(BlogService);

  loginError: boolean = false;

  loginFormGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    if (this.blogService.getToken()) {
      this.navigateToBlogs();
    } else {
      this.loginFormGroup = new FormGroup({
        'email': new FormControl('', [Validators.required]),
        'password': new FormControl('', [Validators.required])
      });
    }
  }

  login(): void {
    this.blogService.login(this.loginFormGroup?.value)
      .subscribe({
        next: () => {
          this.navigateToBlogs();
        },
        error: () => {
          this.loginError = true;
        }
      });
  }

  navigateToBlogs(): void {
    this.router.navigate(['../blog'], { relativeTo: this.route });
  }
}
