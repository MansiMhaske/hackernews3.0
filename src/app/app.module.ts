import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { StoryListComponent } from './components/story-list/story-list.component';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    CommonModule,
    AppComponent,
    StoryListComponent
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
