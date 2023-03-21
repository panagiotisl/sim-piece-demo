import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-load-size-bar-chart',
  template: '<p>app-load-size-bar-chart</p>',
  templateUrl: './load-size-bar-chart.component.html',
  styleUrls: ['./load-size-bar-chart.component.css']
})

export class LoadSizeBarChartComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'DB Size (MBs)'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    //DataLabelsPlugin
  ];

  public chartLoadSizeChartData: ChartData<'bar'> = {
    labels: [ 'Uncompressed', 'Sim-Piece'],
    datasets: [
      { data: [ 0, 0], label: '', backgroundColor: ['#FA747DAA', "#09A837AA" ] }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

  public update(data : any): void {
    this.chartLoadSizeChartData.datasets[0].data = data;
    this.chart?.update();
  }

}