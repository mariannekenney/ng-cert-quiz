# Workshop 2024: Frontend

Build a frontend blog application using Angular and connect it to your local backend!


## Chapter 0
### Prerequisites
- [ ] [Visual Studio Code](https://code.visualstudio.com/download)
- [ ] [Node.js](https://nodejs.org/en/download)
- [ ] npm (included in the latest version of Node.js)

### Setup
Verify you have **node** installed by checking the version:
```bash
node -v
```
Verify you have **npm** installed by checking the version:
```bash
npm -v
```

Install [**Angular Material**](https://angular.io/material):
```
npm install @angular/material
```


## [Chapter 1: Getting Started](https://gitlab.dfci.harvard.edu/workshop2024/blog-frontend/-/commit/b94c987e7e46b721cdbddd10514a29e78640ff2a)

Create a new angular application:
```
ng new blog-frontend
```
- Which stylesheet format would you like to use? [**SCSS**](https://sass-lang.com/documentation/syntax#scss)
- Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? **No**

Run the application:
```
ng serve --open
```
Your application is now live at http://localhost:4200!

### Tip
When in doubt, delete the node_modules folder, and re-install npm:
```
 rm -rf node_modules
 npm install
```


## [Chapter 2: Generate Schematics](https://gitlab.dfci.harvard.edu/workshop2024/blog-frontend/-/commit/426f39aeb39b3846af445cda21b168571c0a5d55)
### Modules
```
ng g module features/blog
```

#### Services
```
ng g service services/blog
```

### Components
```
ng g component features/login
ng g component features/blog/blog-page
ng g component features/blog/blog-post
```

## [Chapter 3: Auth](https://gitlab.dfci.harvard.edu/workshop2024/blog-frontend/-/commit/b987be0bb6ae5bd23bd230ac6027ea0d1db3e26d)
1. index.html
2. styles.scss
3. app.config.ts
4. app.routes.ts
5. login.component.html
6. login.component.scss
7. login.component.ts
8. blog.service.ts


## [Chapter 4: Blog](https://gitlab.dfci.harvard.edu/workshop2024/blog-frontend/-/commit/5eb8b11b088a828bc1902bd81a918581e586f064)
1. BlogPost.ts
2. blog-page.component.html
3. blog-page.component.scss
4. blog-page.component.ts
5. blog-post.component.html
6. blog-post.component.scss
7. blog-post.component.ts
8. blog.module.ts
9. blog.service.ts


## [Chapter 5: Connect to Backend](https://gitlab.dfci.harvard.edu/workshop2024/blog-frontend/-/commit/5cb5aa5a247b5ac94a31f67ca75b257a8a1987c5)
1. app.config.ts
2. blog.service.ts
