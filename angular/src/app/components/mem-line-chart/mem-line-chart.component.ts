import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-mem-line-chart-1',
  templateUrl: './mem-line-chart.component.html',
  styleUrls: ['./mem-line-chart.component.css']
})

export class MemLineChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    aspectRatio: 3/1,
    animation: false,
    scales: {
      x: {},
      y: {
        min: 0,
        max: 100
      }
    },
    plugins: {
      legend: {
        display: true
      },
      title: {
        display: true,
        text: 'Memory Utilization'
      },
    }
  };
  public chartType: ChartType = 'line';
  public chartPlugins = [
    //DataLabelsPlugin
  ];

  public chartMemChartData: ChartData<'bar'> = {
    labels: [ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15' ],
    datasets: [
    {
      label: 'Uncompressed',
      data: []
    },
    {
      label: 'Chimp',
      data: []
    },
    {
      label: 'Patas',
      data: []
    }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

  public update(data : any): void {
    this.chartMemChartData.datasets = data;
    this.chart?.update();
  }

}

@Component({
  selector: 'app-mem-line-chart-2',
  templateUrl: './mem-line-chart.component.html',
  styleUrls: ['./mem-line-chart.component.css']
})

export class MemLineChartComponent2 extends MemLineChartComponent {}
