import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HackerNewsService {

  constructor(private httpClient: HttpClient) { }

  private apiUrl = 'https://hacker-news.firebaseio.com/v0/';

  //Fetches the list of top Stories
  getTopStories(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.apiUrl}topstories.json?print=pretty`);
  }

  //Fetched the details of the Stiry by Id
  getStoryDetailsById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}item/${id}.json?print=pretty`);
  }
}
