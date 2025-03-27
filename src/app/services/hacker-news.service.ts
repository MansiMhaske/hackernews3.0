import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {
  private baseUrl: string = 'https://hacker-news.firebaseio.com/v0';

  constructor(private http: HttpClient) {}

  // Get top stories
  getTopStories(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/topstories.json?print=pretty`);
  }

  // Get new stories
  getNewStories(): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/newstories.json?print=pretty`);
  }

  // Get story details by ID
  getStoryDetailsById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/item/${id}.json?print=pretty`);
  }
}
