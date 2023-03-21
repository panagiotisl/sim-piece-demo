import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadSizeBarChartComponent } from './load-size-bar-chart.component';

describe('LoadSizeBarChartComponent', () => {
  let component: LoadSizeBarChartComponent;
  let fixture: ComponentFixture<LoadSizeBarChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadSizeBarChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoadSizeBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
