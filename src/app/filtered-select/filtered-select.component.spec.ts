import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FilteredSelectComponent } from './filtered-select.component';
import { DisplayTreeComponent } from '../display-tree/display-tree.component';

describe('FilteredSelectComponent', () => {
  let component: FilteredSelectComponent;
  let fixture: ComponentFixture<FilteredSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        FilteredSelectComponent,
        DisplayTreeComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
