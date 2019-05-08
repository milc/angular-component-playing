import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FilteredSelectComponent } from './filtered-select/filtered-select.component';
import { DisplayTreeComponent } from './display-tree/display-tree.component';

import { Domain } from './domain';
import { DOMAINS } from './mock-domains';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        AppComponent,
        FilteredSelectComponent,
        DisplayTreeComponent
      ],
    }).compileComponents();
  }));

  // it('should create the app', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // });

  it(`should have as title 'angular-component-playing'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('angular-component-playing');
  });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to angular-component-playing!');
  // });
});
