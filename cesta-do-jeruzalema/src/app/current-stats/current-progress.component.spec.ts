import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentProgressComponent } from './current-progress.component';

describe('CurrentStatsComponent', () => {
  let component: CurrentProgressComponent;
  let fixture: ComponentFixture<CurrentProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
