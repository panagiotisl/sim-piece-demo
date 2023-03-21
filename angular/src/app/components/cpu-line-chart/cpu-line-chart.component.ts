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
      }
    },
    plugins: {
      legend: {
        display: true
      },
      title: {
        display: false,
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
      label: 'Sim-Piece',
      data: []
    },
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

  public update(data : any): void {
    console.log("UPDATING")
    console.log(data)
    this.chartCpuChartData = data;
    this.chart?.update();
  }

}

@Component({
  selector: 'app-cpu-line-chart-2,',
  templateUrl: './cpu-line-chart.component.html',
  styleUrls: ['./cpu-line-chart.component.css']
})

export class CpuLineChartComponent2 extends CpuLineChartComponent {}
