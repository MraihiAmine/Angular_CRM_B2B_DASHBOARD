import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { ToggleService } from 'src/app/toggle.service';

@Component({
  selector: 'app-widget-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss'],
})
export class PieComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions = {};
  @Input() data = [];

  lightChartOptions: any;
  darkChartOptions: any;

  constructor(private toggleService: ToggleService) {}

  ngOnInit() {
    this.lightChartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie',
        backgroundColor: null,
      },
      title: {
        text: 'RANDOM DATA',
        style: {
          color: '#333333',
          fontSize: '18px',
          fontWeight: 'bold',
        },
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        style: {
          color: '#333333',
          fontSize: '14px',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              color: '#333333',
              fontSize: '14px',
            },
          },
        },
      },
      exporting: {
        enabled: true,
      },
      credits: {
        enabled: false,
      },
      series: [
        {
          name: 'Brands',
          colorByPoint: true,
          data: this.data,
        },
      ],
    };

    this.darkChartOptions = {
      ...this.lightChartOptions,
      chart: {
        ...this.lightChartOptions.chart,
        backgroundColor: '#333333',
      },
      tooltip: {
        ...this.lightChartOptions.tooltip,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        style: {
          color: '#ffffff',
        },
      },
      plotOptions: {
        pie: {
          ...this.lightChartOptions.plotOptions.pie,
          dataLabels: {
            ...this.lightChartOptions.plotOptions.pie.dataLabels,
            style: {
              ...this.lightChartOptions.plotOptions.pie.dataLabels.style,
              color: '#ffffff',
            },
          },
        },
      },
    };

    this.toggleService.toggleState$.subscribe((state) => {
      console.log('Toggle state in the pie component:', state);
      this.chartOptions = state ? this.darkChartOptions : this.lightChartOptions;
    });

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
