import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOfWalkersComponent } from './table-of-walkers.component';

describe('TableOfWalkersComponent', () => {
  let component: TableOfWalkersComponent;
  let fixture: ComponentFixture<TableOfWalkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableOfWalkersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOfWalkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
