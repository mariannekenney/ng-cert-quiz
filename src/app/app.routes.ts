import { inject } from '@angular/core';
import { Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './features/login/login.component';
import { BlogPageComponent } from './features/blog/blog-page/blog-page.component';
import { BlogService } from './services/blog.service';

export const routes: Routes = [
    {
        path: '',
        component: AppComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'blog',
                component: BlogPageComponent,
                canActivate: [
                    () => inject(BlogService).getToken()
                ],
                resolve: {
                    allBlogPosts: () => inject(BlogService).getAll()
                }
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'login'
            }
        ]
    },
    {
        path: '**',
        redirectTo: ''
    }
];
