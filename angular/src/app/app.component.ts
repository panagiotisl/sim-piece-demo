import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../service/app.service';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

import { File } from '../model/File';
import { LoadTimeBarChartComponent} from './components/load-time-bar-chart/load-time-bar-chart.component';
import { LoadSizeBarChartComponent} from './components/load-size-bar-chart/load-size-bar-chart.component';
import { CpuLineChartComponent} from './components/cpu-line-chart/cpu-line-chart.component';
import { CpuLineChartComponent2} from './components/cpu-line-chart/cpu-line-chart.component';
import { MemLineChartComponent} from './components/mem-line-chart/mem-line-chart.component';
import { MemLineChartComponent2} from './components/mem-line-chart/mem-line-chart.component';

import { ViewModalComponent } from './view-modal/view-modal.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import {concat, Subscription, timer} from 'rxjs';  
import { map } from 'rxjs/operators';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MdbModalService]
})
export class AppComponent {
  @ViewChild(LoadTimeBarChartComponent) loadTimeBarChart:LoadTimeBarChartComponent;
  @ViewChild(LoadSizeBarChartComponent) loadSizeBarChart:LoadSizeBarChartComponent;
  @ViewChild(CpuLineChartComponent) cpuLineChart1:CpuLineChartComponent;
  @ViewChild(CpuLineChartComponent2) cpuLineChart2:CpuLineChartComponent2;
  @ViewChild(MemLineChartComponent) memLineChart1:MemLineChartComponent;
  @ViewChild(MemLineChartComponent2) memLineChart2:MemLineChartComponent2;

  viewModalRef: MdbModalRef<ViewModalComponent> | null = null;
  timerSubscription: Subscription; 

  title = 'Chimp demo';
  btnstate: boolean=false;
  files:File[] = [];
  form: FormGroup; 
  records: { [id: string] : number; } = {"bio_2019_01.csv.gz": 8347681, "bio_2019_01_01.csv.gz": 269281, "pressure_air_2019-01.csv.gz": 3435841, "pressure_air_2019-02.csv.gz": 3104718,
"pressure_air_2019-03.csv.gz": 3456078, "wind_direction_2019_01.csv.gz": 4865761, "wind_direction_2019_02.csv.gz": 4395099,
"wind_direction_2019_03.csv.gz": 4875339, "wind_direction_2019_04.csv.gz": 4730620, "wind_direction_2019_05.csv.gz": 4999900,
"wind_direction_2019_06.csv.gz": 4838625, "wind_direction_2019_07.csv.gz": 4999905, "wind_direction_2019_08.csv.gz": 4999905,
"wind_direction_2019_09.csv.gz": 4837905, "wind_direction_2019_10.csv.gz": 4984065, "wind_direction_2019_11.csv.gz": 4817024,
"wind_direction_2019_12.csv.gz": 4977584}

  range: { [id: string] : number; } = {"bio_2019_01.csv.gz": 8347681, "bio_2019_01_01.csv.gz": 269281, "pressure_air_2019-01.csv.gz": 52.8, "pressure_air_2019-02.csv.gz": 52.1,
"pressure_air_2019-03.csv.gz": 53.2, "wind_direction_2019_01.csv.gz": 4865761, "wind_direction_2019_02.csv.gz": 4395099,
"wind_direction_2019_03.csv.gz": 4875339, "wind_direction_2019_04.csv.gz": 4730620, "wind_direction_2019_05.csv.gz": 4999900,
"wind_direction_2019_06.csv.gz": 4838625, "wind_direction_2019_07.csv.gz": 4999905, "wind_direction_2019_08.csv.gz": 4999905,
"wind_direction_2019_09.csv.gz": 4837905, "wind_direction_2019_10.csv.gz": 4984065, "wind_direction_2019_11.csv.gz": 4817024,
"wind_direction_2019_12.csv.gz": 4977584}

  selectMae: 0;
  selectRmse: 0;
  forecastMae: 0;
  forecastRmse: 0;
  knnRecall: 0;

  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService, fb: FormBuilder, library: FaIconLibrary,
    private viewModalService: MdbModalService) {
      this.form = fb.group({
       selectedFiles:  new FormArray([]),
       error: 2.0
      });
      library.addIcons(faEye);
    }

    ngOnInit() { 
      this.appService.executeRootService().subscribe((result) => {    
        console.log(result);
        for (var file of result.files)  {
          this.files.push(file);
        }
      });
    }
    
  onCheckboxChange(event: any) {
    const selectedFiles = (this.form.controls['selectedFiles'] as FormArray);
    if (event.target.checked) {
      selectedFiles.push(new FormControl(event.target.value));
    } else {
      const index = selectedFiles.controls
      .findIndex(x => x.value === event.target.value);
      selectedFiles.removeAt(index);
    }
  }

  async loadFileSubmit(event: any ) {
    this.btnstate = true
    document.body.style.cursor = 'wait'
    this.loadSizeBarChart.update([ 0, 0, 0 ])
    console.log(this.form.value);
    console.log(this.form.controls['error'])
    var output = await this.appService.executeLoadService(this.form.value, event.target.error.value)
    this.loadSizeBarChart.update([ output.uncompressed, output.simpiece ])
    document.body.style.cursor = 'default'
    this.btnstate = false
  }

  async accuracyFileSubmit(event: any ) {
    this.btnstate = true
    document.body.style.cursor = 'wait'
    this.cpuLineChart1.update([ 0, 0, 0 ])
    console.log(this.form.value);
    console.log(this.form.controls['error'])
    var output = await this.appService.executeSelectService(this.form.value, event.target.error.value)
    console.log(output)
    this.cpuLineChart1.update(output)
    this.selectMae = output.mae;
    this.selectRmse = output.rmse;
    document.body.style.cursor = 'default'
    this.btnstate = false
  }


  async forecastFileSubmit(event: any ) {
    this.btnstate = true
    document.body.style.cursor = 'wait'
    this.cpuLineChart2.update([ 0, 0, 0 ])
    var output = await this.appService.executeForecastService(this.form.value, event.target.error.value)
    console.log(output)
    this.cpuLineChart2.update(output)
    this.forecastMae = output.mae;
    this.forecastRmse = output.rmse;
    console.log(this.forecastMae);
    console.log(this.forecastRmse);
    document.body.style.cursor = 'default'
    this.btnstate = false
  }


  async knnFileSubmit(event: any ) {
    this.btnstate = true
    document.body.style.cursor = 'wait'
    this.memLineChart1.update([ 0, 0, 0 ])
    var output = await this.appService.executeKnnService(this.form.value, event.target.error.value)
    console.log(output)
    this.memLineChart1.update(output)
    this.knnRecall = output.recall;
    document.body.style.cursor = 'default'
    this.btnstate = false
  }


  async head(file : string) {
    var head = await this.appService.head(file)
    console.log(head)
    this.openModal(file, head.lines)
  }

  openModal(file: string, head: string) {
    this.viewModalRef = this.viewModalService.open(ViewModalComponent, {
      data: { body: head, title: file },
    });
  }

}
