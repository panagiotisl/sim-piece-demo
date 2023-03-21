import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryTimeBarChartComponent } from './query-time-bar-chart.component';

describe('QueryTimeBarChartComponent', () => {
  let component: QueryTimeBarChartComponent;
  let fixture: ComponentFixture<QueryTimeBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryTimeBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueryTimeBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
