import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AppComponent', () => {

  // Before each test, configure the testing module and compile the component
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [        
        provideHttpClient(),    // Provide the HttpClient for making HTTP requests
        provideHttpClientTesting(),   // Provide the HttpClientTesting module to mock HTTP requests in tests
      ]
    }).compileComponents();
  });

  // Test to check if the component is created successfully
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // Test to verify if the component's title is set to 'Hacker News Stories'
  it(`should have the 'Hacker News Stories' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Hacker News Stories');
  });

  // Test to check if the component renders the correct title
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hacker News Stories');
  });
});