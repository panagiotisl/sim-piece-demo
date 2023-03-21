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
import {Subscription, timer} from 'rxjs';  
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

  constructor(private route: ActivatedRoute,
    private router: Router, private appService: AppService, fb: FormBuilder, library: FaIconLibrary,
    private viewModalService: MdbModalService) {
      this.form = fb.group({
       selectedFiles:  new FormArray([])
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
       this.timerSubscription = timer(0, 2000).pipe( 
        map(async () => { 
          var cpu = await this.appService.executeGetCpuStats();
          this.cpuLineChart1.update(cpu);
          this.cpuLineChart2.update(cpu);
          var mem = await this.appService.executeGetMemStats();
          this.memLineChart1.update(mem);
          this.memLineChart2.update(mem);
        }) 
      ).subscribe(); 
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

  async loadFileSubmit() {
    this.btnstate = true
    document.body.style.cursor = 'wait'
    this.loadSizeBarChart.update([ 0, 0, 0 ])
    this.loadTimeBarChart.update([ 0, 0, 0 ])
    console.log(this.form.value);
    var uncompressed = await this.appService.executeLoadUncompressedService(this.form.value)
    this.loadSizeBarChart.update([ uncompressed.size, 0, 0 ])
    this.loadTimeBarChart.update([ uncompressed.time, 0, 0 ])
    var chimp = await this.appService.executeLoadChimpService(this.form.value)
    this.loadSizeBarChart.update([ uncompressed.size, chimp.size, 0 ])
    this.loadTimeBarChart.update([ uncompressed.time, chimp.time, 0 ])
    var patas = await this.appService.executeLoadPatasService(this.form.value)
    this.loadSizeBarChart.update([ uncompressed.size, chimp.size, patas.size ])
    this.loadTimeBarChart.update([ uncompressed.time, chimp.time, patas.time ])   
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