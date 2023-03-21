import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuLineChartComponent } from './cpu-line-chart.component';

describe('CpuLineChartComponent', () => {
  let component: CpuLineChartComponent;
  let fixture: ComponentFixture<CpuLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpuLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpuLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
