import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-load-time-bar-chart',
  template: '<p>app-load-time-bar-chart</p>',
  templateUrl: './load-time-bar-chart.component.html',
  styleUrls: ['./load-time-bar-chart.component.css']
})

export class LoadTimeBarChartComponent implements OnInit {
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
        text: 'DB Load Time (sec)'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    //DataLabelsPlugin
  ];

  public chartLoadTimeChartData: ChartData<'bar'> = {
    labels: [ 'Uncompressed', 'Chimp', 'Patas' ],
    datasets: [
      { data: [ 0, 0, 0 ], label: '', backgroundColor: ['#FA747DAA', "#09A837AA", "#0455D8AA"] }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

  public update(data : any): void {
    this.chartLoadTimeChartData.datasets[0].data = data;
    this.chart?.update();
  }

}