import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HackerNewsService } from '../../services/hacker-news.service';

@Component({
  selector: 'app-story-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './story-list.component.html',
  styleUrls: ['./story-list.component.css']
})
export class StoryListComponent implements OnInit {
  title: string = "Hacker News Stories";

  topStories: any[] = []; // Stores fetched Top Stories
  newStories: any[] = []; // Stores fetched New Stories
  selectedStories: any[] = []; // Currently displayed stories

  currentTab: 'top' | 'new' = 'top'; // Track active tab
  allTopStoriesIds: number[] = []; // Store all Top Story IDs
  allNewStoriesIds: number[] = []; // Store all New Story IDs

  topStoriesIndex: number = 0; // Track loaded top story count
  newStoriesIndex: number = 0; // Track loaded new story count
  batchSize: number = 10; // Number of stories to load per batch
  loading: boolean = false; // Controls loading state

  constructor(private hackerNewsService: HackerNewsService) {}

  ngOnInit() {
    this.hackerNewsService.getTopStories().subscribe((storyIds: number[]) => {
      this.allTopStoriesIds = storyIds;
      this.loadMore(); // Load initial batch for top stories
    });

    this.hackerNewsService.getNewStories().subscribe((storyIds: number[]) => {
      this.allNewStoriesIds = storyIds;
    });
  }

  // Switch tabs and update the displayed stories.
  selectTab(tab: 'top' | 'new') {
    if (this.currentTab !== tab) {
      this.currentTab = tab;

      // Set selected stories based on the tab
      this.selectedStories = this.currentTab === 'top' ? this.topStories : this.newStories;

      // Load more stories if none have been fetched yet for the selected tab
      if (this.selectedStories.length === 0) {
        this.loadMore();
      }
    }
  }

  // Loads a batch of stories 
  loadMore() {
    if (this.loading) return;
    this.loading = true;

    let storyIds = this.currentTab === 'top' ? this.allTopStoriesIds : this.allNewStoriesIds;
    let currentIndex = this.currentTab === 'top' ? this.topStoriesIndex : this.newStoriesIndex;
    let nextBatch = storyIds.slice(currentIndex, currentIndex + this.batchSize);

    if (nextBatch.length === 0) {
      this.loading = false;
      return;
    }

    let fetchedStories: any[] = [];
    let storiesFetched = 0;

    nextBatch.forEach((id: number) => {
      this.hackerNewsService.getStoryDetailsById(id).subscribe(story => {
        fetchedStories.push(story);
        storiesFetched++;

        if (storiesFetched === nextBatch.length) {
          if (this.currentTab === 'top') {
            this.topStories = [...this.topStories, ...fetchedStories];
            this.topStoriesIndex += this.batchSize;
            this.selectedStories = this.topStories;
          } else {
            this.newStories = [...this.newStories, ...fetchedStories];
            this.newStoriesIndex += this.batchSize;
            this.selectedStories = this.newStories;
          }
          this.loading = false;
        }
      });
    });
  }
}
