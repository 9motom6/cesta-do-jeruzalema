import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KmInDaysBarChartComponent } from './km-in-days-bar-chart.component';

describe('KmInDaysBarChartComponent', () => {
  let component: KmInDaysBarChartComponent;
  let fixture: ComponentFixture<KmInDaysBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KmInDaysBarChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KmInDaysBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
