import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { Component, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-query-time-bar-chart',
  template: '<p>app-query-time-bar-chart</p>',
  templateUrl: './query-time-bar-chart.component.html',
  styleUrls: ['./query-time-bar-chart.component.css']
})

export class QueryTimeBarChartComponent implements OnInit {
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
        text: 'DB Query Time (sec)'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    //DataLabelsPlugin
  ];

  public chartQueryTimeChartData: ChartData<'bar'> = {
    labels: [ 'Uncompressed', 'Chimp', 'Patas' ],
    datasets: [
      { data: [ 0, 0, 0 ], label: '', backgroundColor: ['#FA747DAA', "#09A837AA", "#0455D8AA"] }
    ]
  };

  constructor() { }

  ngOnInit(): void {
  }

  public update(data : any): void {
    this.chartQueryTimeChartData.datasets[0].data = data;
    this.chart?.update();
  }

}