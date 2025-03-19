import { TestBed } from '@angular/core/testing';
import { HackerNewsService } from './hacker-news.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('HackerNewsService', () => {
  let service: HackerNewsService;
  let httpMock: HttpTestingController;

  // Set up the testing module before each test
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HackerNewsService]
    });
    service = TestBed.inject(HackerNewsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  // Test case to check if the service is created successfully
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Test case to verify the service fetches the top stories correctly
  it('should fetch top stories', () => {
    const mockTopStories = [1, 2];

    // Subscribe to the getTopStories() observable and check the response data
    service.getTopStories().subscribe(stories => {
      expect(stories).toEqual(mockTopStories);
    });
    
    // Set up the HTTP mock to intercept the request made by getTopStories()
    const req = httpMock.expectOne('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty');
    expect(req.request.method).toBe('GET');
    req.flush(mockTopStories);
    httpMock.verify();  
  });

  // After each test, ensure that no HTTP requests are pending
  afterEach(() => {
    httpMock.verify();
  });
});