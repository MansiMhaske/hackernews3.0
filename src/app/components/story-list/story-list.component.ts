import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HackerNewsService } from '../../services/hacker-news.service';

@Component({
  selector: 'app-story-list',
  imports: [CommonModule],
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent {

  topStories: any[] = []; // Stores top stories fetched from the Hackerrank API
  title: string = "Top Hacker New Stories"; // Main title for the page

  constructor(private hackerNewsService: HackerNewsService){ }

  ngOnInit(){
    // Fetch the top stories from the Hacker new API through HackerNewsService
    this.hackerNewsService.getTopStories().subscribe((storyIds: any[]) => {

      //Fetch the details of each story by ID
      storyIds.slice(0,15).forEach((id: number) => {
        this.hackerNewsService.getStoryDetailsById(id).subscribe(story => {
          this.topStories.push(story);
          console.log(this.topStories)
        })
      });
    })
  }
}
