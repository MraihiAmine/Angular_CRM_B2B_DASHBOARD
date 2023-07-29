import {
  Component,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { EventEmitter, Output } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { FirebaseService } from '../firebase.service';

export interface TemperatureElement {
  category: string;
  temperature: number;
}
export interface TemperatureElement {
  temperature: number;
  category: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent implements OnInit {
  @Output() darkModeChanged: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  bigChart: any = [];
  cards: any = [];
  pieChart: any = [];
  tableData: any = [
    { temperature: 50, category: 'High' },
    { temperature: 20, category: 'low' },
  ];

  ELEMENT_DATA: TemperatureElement[] = [];

  displayedColumns: string[] = ['temperature', 'category'];
  dataSource = new MatTableDataSource<TemperatureElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true })
  paginator!: MatPaginator;
  isDarkMode: boolean | undefined;

  constructor(
    public dashboardService: DashboardService,
    private overlay: OverlayContainer,
    private firebaseService: FirebaseService
  ) {}
  sendDarkModeValueToWidget() {
    // Assuming you have an output property called 'darkModeChanged' in the 'app-widget-area' component
    this.darkModeChanged.emit(this.isDarkMode);
  }
  onDarkModeChanged(isDarkMode: boolean) {
    // Handle the received dark mode value here
    // You can perform any necessary actions based on the value
    console.log('Dark mode changed:', isDarkMode);
    // ...
  }

  ngOnInit() {
    // this.firebaseService.addFakeTemperatureData();
    console.log('this.tableData');
    console.log(this.tableData);

    this.dashboardService.getBigChart().subscribe((bigChartData) => {
      this.bigChart = bigChartData;
      console.log('this.bigChart is', this.bigChart);
    });
    this.dashboardService.getPieDataChart().subscribe((bigChartData) => {
      this.pieChart = bigChartData;
      console.log('this.pieChart is', this.pieChart);
    });
    this.dashboardService.getDataSource().subscribe((dataSourceParam) => {
      console.log('this.dataSource param', dataSourceParam);
      this.dataSource = new MatTableDataSource<TemperatureElement>(
        dataSourceParam
      );
    });

    console.log('this.bigChart is', this.bigChart);

    this.cards = this.dashboardService.cards();

    this.dataSource.paginator = this.paginator;
    document.body.setAttribute('data-theme', 'dark');
  }
}
