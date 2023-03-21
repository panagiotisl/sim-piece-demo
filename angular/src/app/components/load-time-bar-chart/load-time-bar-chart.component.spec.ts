import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadTimeBarChartComponent } from './load-time-bar-chart.component';

describe('LoadTimeBarChartComponent', () => {
  let component: LoadTimeBarChartComponent;
  let fixture: ComponentFixture<LoadTimeBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadTimeBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadTimeBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
