import {MatSliderModule} from '@angular/material/slider';
import { IMqttServiceOptions, MqttModule } from 'ngx-mqtt';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultComponent } from './default.component';
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ControlDataComponent } from 'src/app/modules/control-data/control-data.component';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'test.mosquitto.org',
  port: 8081,
  protocol: 'ws', // Use 'ws' for WebSocket or 'wss' for Secure WebSocket
  path: '/mqtt'
};

@NgModule({
  declarations: [
    DefaultComponent,
    DashboardComponent,
    ControlDataComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    SharedModule,
    MatSidenavModule,
    MatButtonToggleModule,
    MatDividerModule,
    FlexLayoutModule,
    MatCardModule,
    MatPaginatorModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatExpansionModule,
    FormsModule,
    HttpClientModule,
    
    MatSliderModule
  ],
  providers: [
    DashboardService
  ]
})
export class DefaultModule { }
