import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import { BlogPost } from '../models/BlogPost';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private localUrl: string = 'http://localhost:8080/api';
  private authUrl: string = `${this.localUrl}/auth`;
  private blogUrl: string = `${this.localUrl}/blogs`;

  constructor(private httpClient: HttpClient) { }

  login(data: { email: string, password: string }): Observable<string> {
    // email: "test1@nowhere.com", password: "12345678"
    
    return this.httpClient.post(`${this.authUrl}/login`, data)
      .pipe(
        map((resp: any) => resp.token),
        tap((token: string) => {
          localStorage.setItem('auth_token', token);
        })
      );
  }

  getToken(): string {
    return localStorage.getItem('auth_token') || '';
  }

  removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  getHttpHeaders(): { headers: HttpHeaders } {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.getToken()}` });
    return { headers };
  }
  
  getAll(): Observable<BlogPost[]> {
    return this.httpClient.get<BlogPost[]>(this.blogUrl, this.getHttpHeaders());
  }

  getOne(id: number): Observable<BlogPost> {
    return this.httpClient.get<BlogPost>(`${this.blogUrl}/${id}`, this.getHttpHeaders());
  }

  create(data: { title: string, content: string }): Observable<BlogPost> {
    return this.httpClient.post<BlogPost>(this.blogUrl, data, this.getHttpHeaders());
  }

  save(id: number, content: string): Observable<BlogPost> {
    return this.httpClient.patch<BlogPost>(`${this.blogUrl}/${id}`, { content }, this.getHttpHeaders());
  }

  delete(id: number): Observable<BlogPost> {
    return this.httpClient.delete<BlogPost>(`${this.blogUrl}/${id}`, this.getHttpHeaders());
  }
}
