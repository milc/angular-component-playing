import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FilteredSelectComponent } from './filtered-select/filtered-select.component';
import { DisplayTreeComponent } from './display-tree/display-tree.component';

@NgModule({
  declarations: [
    AppComponent,
    FilteredSelectComponent,
    DisplayTreeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
