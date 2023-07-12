import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() label!: string;
  @Input() total!: string;
  @Input() percentage!: string;
  @Input() data = [];

  Highcharts = Highcharts;
  chartOptions = {};

  constructor() {}

  ngOnInit() {
    // Light mode chart options
    const lightChartOptions = {
      chart: {
        type: 'area',
        backgroundColor: null,
        borderWidth: 0,
        margin: [2, 2, 2, 2],
        height: 60,
      },
      title: {
        text: null,
      },
      subtitle: {
        text: null,
      },
      tooltip: {
        split: true,
        outside: true,
      },
      legend: {
        enabled: false,
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: false,
      },
      xAxis: {
        labels: {
          enabled: false,
        },
        title: {
          text: null,
        },
        startOnTick: false,
        endOnTick: false,
        tickOptions: [],
      },
      yAxis: {
        labels: {
          enabled: false,
        },
        title: {
          text: null,
        },
        startOnTick: false,
        endOnTick: false,
        tickOptions: [],
      },
      series: [
        {
          data: this.data,
        },
      ],
    };

    // Dark mode chart options
// Dark mode chart options
const darkChartOptions = {
  ...lightChartOptions, // Inherit properties from light mode options
  chart: {
    ...lightChartOptions.chart,
    backgroundColor: '#333333', // Dark background color
  },
  tooltip: {
    ...lightChartOptions.tooltip,
    backgroundColor: 'rgba(0, 0, 0, 0.75)', // Dark tooltip background color
    style: {
      color: '#ffffff', // Tooltip text color
    },
  },
  plotOptions: {
    area: {
      states: {
        hover: {
          lineWidth: 2, // Increase the line width on hover
        },
      },
    },
  },
};


    // Choose the appropriate chart options based on the selected mode (e.g., 'light' or 'dark')
    let selectedMode = 'light'; // Replace with your logic to determine the selected mode
    let chartOptions =
      selectedMode === 'light' ? lightChartOptions : darkChartOptions;

    this.chartOptions = darkChartOptions;

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
