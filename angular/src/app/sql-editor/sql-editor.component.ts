import { Component, ViewChild } from '@angular/core';
import { AppService } from '../../service/app.service';

import { QueryTimeBarChartComponent} from '../components/query-time-bar-chart/query-time-bar-chart.component';


@Component({
  selector: 'app-sql-editor',
  templateUrl: './sql-editor.component.html',
  styleUrls: ['./sql-editor.component.css']
})
export class SqlEditorComponent {

  getRandomName() {
    var array = ['LAJA', 'LENO', 'CUPE', 'BARC', 'UNDE', 'GRSM', 'FLNT', 'GUAN', 'SUGG', 'REDB', 'MLBS', 'SCBI', 'KONA', 'TALL', 'CRAM', 'BIGC', 'DCFS', 'SJER', 'WLOU', 'MCDI', 'WALK', 'CPER', 'BONA', 'STEI', 'CLBJ', 'LIRO', 'HEAL', 'DELA', 'PRPO', 'POSE', 'HARV', 'RMNP', 'JERC', 'BART', 'OAES', 'TECR', 'BLDE', 'SERC', 'ORNL', 'SOAP', 'WREF', 'COMO', 'TREE', 'TEAK', 'KING', 'JORN', 'NIWO', 'BLAN', 'BLUE', 'STER', 'ABBY', 'OSBS', 'NOGP', 'WOOD', 'KONZ', 'TOOL', 'LECO', 'GUIL', 'SYCA', 'DSNY', 'MCRA', 'LEWI', 'DEJU', 'ARIK', 'MOAB', 'TOOK', 'PRLA', 'SRER', 'PRIN', 'UKFS', 'ONAQ', 'MAYF', 'HOPB', 'CARI', 'YELL', 'BARR', 'MART'];
    return array[Math.floor(Math.random() * array.length)];
  }

  getRandomFloat(min:number, max:number, decimals:number) {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
  }

  getRandomColumn() {
    var array = ["windSpeedMean", "windSpeedMinimum", "windSpeedMaximum", "windSpeedVariance", "windSpeedNumPts", "windSpeedExpUncert", "windSpeedStdErMean", "windSpeedFinalQF", "windDirMean", "windDirVariance", "windDirNumPts", "windDirExpUncert", "windDirStdErMean", "windDirFinalQF"]
    return array[Math.floor(Math.random() * array.length)];
  }
  
  getQuery0() {
    return `SELECT name, sensor, startDateTime, endDateTime,
    windSpeedMean, windSpeedMinimum, windSpeedMaximum,
    windSpeedVariance, windSpeedNumPts, windSpeedExpUncert,
    windSpeedStdErMean, windSpeedFinalQF, windDirMean,
    windDirVariance, windDirNumPts, windDirExpUncert,
    windDirStdErMean, windDirFinalQF
  FROM WindDirection
  WHERE name = '${this.getRandomName()}' AND
  startDateTime >= '2019-01-01' AND
  startDateTime < '2020-01-01';`;
  }

  getQuery1() {
    return `SELECT avg(${this.getRandomColumn()}) as avg
    FROM WindDirection
    WHERE ${this.getRandomColumn()} > ${this.getRandomFloat(0.1, 0.7, 3)}`;
  }

  getQuery2() {
    return `SELECT name, max(${this.getRandomColumn()}) as max
    FROM WindDirection
    GROUP BY name`;
  }

  getQuery3() {
    return `SELECT sensor, min(${this.getRandomColumn()}) as min
    FROM WindDirection
    GROUP BY sensor`;
  }
  
  getQuery4() {
    return `SELECT avg(wd1.windSpeedMean - wd2.windSpeedMean) as diff,
    avg(wd1.windSpeedMaximum - wd2.windSpeedMaximum) as diffMax
  FROM WindDirection wd1, WindDirection wd2
  WHERE wd1.name = '${this.getRandomName()}' AND
    wd2.name = '${this.getRandomName()}' AND
    wd1.startDateTime = wd2.startDateTime`;
  }
  
  getQuery5() {
    return `SELECT avg(max(max(wd1.windSpeedMean, wd2.windSpeedMean), wd3.windSpeedMean)) as maxAvg,
    avg(max(max(wd1.windSpeedMaximum, wd2.windSpeedMaximum), wd3.windSpeedMaximum)) as maxMax
  FROM WindDirection wd1, WindDirection wd2, WindDirection wd3
  WHERE wd1.name = '${this.getRandomName()}' AND
    wd2.name = '${this.getRandomName()}' AND
    wd3.name = '${this.getRandomName()}' AND
    wd1.startDateTime = wd2.startDateTime AND
    wd1.startDateTime = wd3.startDateTime`;
  }
  
  sqlerror:string = "";
  selection:number = 1;
  text:string = this.getQuery1();
  options:any = {maxLines: 1000, printMargin: false};
  sqlCode:string = this.text;
  btnstate: boolean=false;
  readOnly: boolean=true;
  theme:string = 'eclipse'
  rows:number = 0;
  queryClassActive:string = "flex-sm-fill text-sm-center nav-link active";
  queryClassSimple:string = "flex-sm-fill text-sm-center nav-link";
  queryClass:string[] = [this.queryClassSimple, this.queryClassActive, this.queryClassSimple, this.queryClassSimple, this.queryClassSimple]

  @ViewChild(QueryTimeBarChartComponent) queryTimeBarChart:QueryTimeBarChartComponent;

  constructor(private appService: AppService) {
  }

  onChange(code : any) {
      console.log("new code: ", code);
      this.sqlCode = code
  }

  async executeQuery() {
    this.sqlerror = ""
    this.btnstate = true
    this.readOnly = true
    document.body.style.cursor = 'wait'
    console.log(this.sqlCode)
    this.rows = 0
    this.queryTimeBarChart.update([ 0, 0, 0 ])
    var uncompressed = await this.appService.executeQueryUncompressedService(this.sqlCode)
    this.rows = uncompressed.size
    this.sqlerror = uncompressed.error
    console.log(this.sqlerror)
    if (this.sqlerror == "") {
      this.queryTimeBarChart.update([ uncompressed.time, 0, 0 ])
      var chimp = await this.appService.executeQueryChimpService(this.sqlCode)
      this.queryTimeBarChart.update([ uncompressed.time, chimp.time, 0 ])
      var patas = await this.appService.executeQueryPatasService(this.sqlCode)
      this.queryTimeBarChart.update([ uncompressed.time, chimp.time, patas.time ])
    }
    this.readOnly = false
    console.log(uncompressed)
    this.btnstate = false
    document.body.style.cursor = 'default'
    switch (this.selection) {
      case 0:
        //this.text = this.getQuery0();
        break;
      case 1:
        this.text = this.getQuery1();
      break;
      case 2:
        this.text = this.getQuery2();
        break;
      case 3:
        this.text = this.getQuery3();
        break;
      case 4:
        this.text = this.getQuery4();
        break;
    }
  }

  query(selection : number) {
    this.selection = selection
    console.log(this.getRandomFloat(0.2, .07, 2))
    console.log(this.getRandomColumn())
    for(var i = 0;i<this.queryClass.length;i++) {
      if (i == selection) {
        this.queryClass[i] = this.queryClassActive;
      } else {
        this.queryClass[i] = this.queryClassSimple;
      }
    }
    if (selection == 0) {
      this.readOnly = false;
      this.theme = 'monokai'
    } else {
      this.readOnly = true;
      this.theme = 'eclipse'
    }
    switch (selection) {
      case 0:
        this.text = this.getQuery0();
        break;
      case 1:
        this.text = this.getQuery1();
      break;
      case 2:
        this.text = this.getQuery2();
        break;
      case 3:
        this.text = this.getQuery3();
        break;
      case 4:
        this.text = this.getQuery4();
        break;
    }
  }

}
