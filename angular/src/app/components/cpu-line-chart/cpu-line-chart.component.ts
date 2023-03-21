import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-cpu-line-chart-1,',
  templateUrl: './cpu-line-chart.component.html',
  styleUrls: ['./cpu-line-chart.component.css']
})
export class CpuLineChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    aspectRatio: 3/1,
    animation: false,
    scales: {
      x: {},
      y: {
        min: 0,
        max: 200
      }
    },
    plugins: {
      legend: {
        display: true
      },
      title: {
        display: true,
        text: 'CPU Utilization'
      },
    }
  };
  public chartType: ChartType = 'line';
  public chartPlugins = [
    //DataLabelsPlugin
  ];

  public chartCpuChartData: ChartData<'bar'> = {
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
    this.chartCpuChartData.datasets = data;
    this.chart?.update();
  }

}

@Component({
  selector: 'app-cpu-line-chart-2,',
  templateUrl: './cpu-line-chart.component.html',
  styleUrls: ['./cpu-line-chart.component.css']
})

export class CpuLineChartComponent2 extends CpuLineChartComponent {}
