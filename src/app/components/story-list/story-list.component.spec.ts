import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoryListComponent } from './story-list.component';
import { HackerNewsService } from '../../services/hacker-news.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StoryListComponent', () => {
  let component: StoryListComponent;
  let fixture: ComponentFixture<StoryListComponent>;
  let service: HackerNewsService;

  // Before each test, set up the testing module and compile components
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoryListComponent],
      providers: [HackerNewsService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StoryListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(HackerNewsService);
  });

   // Test case 1: Ensure the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });

   // Test case 1: Verify that the component displays the top stories
  it('should display top stories', () => {

    // Mock data for top stories
    const mockTopStories = [
      { id: '1', title: 'Story 1', url: 'https://www.story1.com',  by:'author1', points:50},
      { id: '2', title: 'Story 2', url: 'https://www.story2.com',  by:'author1', points:150}
    ]

    spyOn(service, 'getTopStories').and.returnValue(of([1, 2]));
    spyOn(service, 'getStoryDetailsById').and.returnValues(of(mockTopStories[0]), of(mockTopStories[1]));

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.topStories.length).toBe(2);

    expect(fixture.nativeElement.querySelectorAll('article').length).toBe(2);
  })
});
