import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { StoryListComponent } from './story-list.component';
import { HackerNewsService } from '../../services/hacker-news.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let service: HackerNewsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoryListComponent],
      providers: [HackerNewsService]
    }).compileComponents();

    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HackerNewsService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize and fetch top stories', fakeAsync(() => {
    const mockStoryIds = [1, 2]; // Only two stories
    const mockStories = [
      { id: 1, title: 'Story 1', by: 'author1', score: 100, url: 'https://story1.com' },
      { id: 2, title: 'Story 2', by: 'author2', score: 150, url: 'https://story2.com' }
    ];

    spyOn(service, 'getTopStories').and.returnValue(of(mockStoryIds));
    spyOn(service, 'getStoryDetailsById').and.callFake((id: number) => {
      return of(mockStories.find(story => story.id === id) || null);
    });

    component.ngOnInit();  // This should trigger the getTopStories call
    tick(); 

    expect(service.getTopStories).toHaveBeenCalledTimes(1); // Only one call for top stories
    expect(service.getStoryDetailsById).toHaveBeenCalledTimes(2); // Exactly two calls for the two stories
    expect(component.topStories.length).toBe(2);
    expect(component.selectedStories.length).toBe(2);
  }));

  it('should switch to new stories tab and fetch new stories', fakeAsync(() => {
    const mockNewStoryIds = [10, 20];
    const mockNewStories = [
      { id: 10, title: 'New Story 1', by: 'author3', score: 50, url: 'https://newstory1.com' },
      { id: 20, title: 'New Story 2', by: 'author4', score: 200, url: 'https://newstory2.com' }
    ];

    spyOn(service, 'getNewStories').and.returnValue(of(mockNewStoryIds));
    spyOn(service, 'getStoryDetailsById').and.callFake((id: number) => {
      return of(mockNewStories.find(story => story.id === id) || null);
    });

    component.ngOnInit();
    tick();  

    component.selectTab('new');
    tick();

    expect(service.getNewStories).toHaveBeenCalledTimes(1);  // Only one call for new stories
    expect(service.getStoryDetailsById).toHaveBeenCalledTimes(2);  // Only two calls for new stories
    expect(component.newStories.length).toBe(2);
    expect(component.selectedStories.length).toBe(2);
  }));

  it('should load more stories', fakeAsync(() => {
    const mockStoryIds = [1, 2, 3, 4, 5];
    const mockStories = [
      { id: 1, title: 'Story 1', by: 'author1', score: 100, url: 'https://story1.com' },
      { id: 2, title: 'Story 2', by: 'author2', score: 150, url: 'https://story2.com' },
      { id: 3, title: 'Story 3', by: 'author3', score: 200, url: 'https://story3.com' },
      { id: 4, title: 'Story 4', by: 'author4', score: 250, url: 'https://story4.com' }
    ];

    spyOn(service, 'getTopStories').and.returnValue(of(mockStoryIds));
    spyOn(service, 'getStoryDetailsById').and.callFake((id: number) => {
      return of(mockStories.find(story => story.id === id) || null);
    });

    component.ngOnInit();
    tick();

    component.loadMore();  // Trigger loading more
    tick();

    expect(service.getStoryDetailsById).toHaveBeenCalledTimes(5); // Corrected to match expected number of calls
    expect(component.topStories.length).toBe(5);  // Check if 5 stories are now loaded
    expect(component.selectedStories.length).toBe(5);
  }));
});
