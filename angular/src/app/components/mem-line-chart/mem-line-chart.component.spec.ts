import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemLineChartComponent } from './mem-line-chart.component';

describe('MemLineChartComponent', () => {
  let component: MemLineChartComponent;
  let fixture: ComponentFixture<MemLineChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemLineChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
