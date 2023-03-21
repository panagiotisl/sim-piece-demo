import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { OverlayModule } from '@angular/cdk/overlay';
import { AceEditorModule } from "ng2-ace-editor";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadTimeBarChartComponent} from './components/load-time-bar-chart/load-time-bar-chart.component';
import { LoadSizeBarChartComponent} from './components/load-size-bar-chart/load-size-bar-chart.component';
import { CpuLineChartComponent} from './components/cpu-line-chart/cpu-line-chart.component';
import { CpuLineChartComponent2} from './components/cpu-line-chart/cpu-line-chart.component';
import { MemLineChartComponent} from './components/mem-line-chart/mem-line-chart.component';
import { MemLineChartComponent2} from './components/mem-line-chart/mem-line-chart.component';
import { QueryTimeBarChartComponent} from './components/query-time-bar-chart/query-time-bar-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadTimeBarChartComponent,
    LoadSizeBarChartComponent,
    CpuLineChartComponent,
    CpuLineChartComponent2,
    MemLineChartComponent,
    MemLineChartComponent2,
    QueryTimeBarChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    OverlayModule,
    NgChartsModule,
    AceEditorModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
