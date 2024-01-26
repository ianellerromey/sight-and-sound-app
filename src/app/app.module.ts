import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SightAndSoundPageComponent } from './components/sight-and-sound-page/sight-and-sound-page.component';

@NgModule({
  declarations: [
    AppComponent,
    SightAndSoundPageComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
