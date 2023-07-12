import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { ToggleService } from 'src/app/toggle.service';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
})
export class AreaComponent implements OnInit {
  chartOptions!: {};
  @Input() data: any = [];

  Highcharts = Highcharts;
  isDarkMode: boolean = false;

  constructor(private toggleService: ToggleService) {}

  toggleMode() {
    this.isDarkMode = !this.isDarkMode;

    // Update the chart options based on the current mode
    if (this.isDarkMode) {
      this.setDarkModeOptions();
    } else {
      this.setLightModeOptions();
    }
  }

  setLightModeOptions() {
    this.chartOptions = {
      chart: {
        type: 'area',
        backgroundColor: '#ffffff', // Light background color
        style: {
          fontFamily: "'Arial', sans-serif",
          color: '#333333', // Text color
        },
      },
      title: {
        text: 'Random DATA',
        style: {
          color: '#333333', // Title text color
        },
      },
      subtitle: {
        text: 'Demo',
        style: {
          color: '#666666', // Subtitle text color
        },
      },
      tooltip: {
        split: true,
        valueSuffix: ' millions',
        backgroundColor: 'rgba(255, 255, 255, 0.75)', // Light tooltip background color
        style: {
          color: '#333333', // Tooltip text color
        },
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      series: this.data,

      // Additional styling for the chart elements
      xAxis: {
        labels: {
          style: {
            color: '#333333', // X-axis labels color
          },
        },
        lineColor: '#666666', // X-axis line color
        tickColor: '#666666', // X-axis tick color
      },
      yAxis: {
        labels: {
          style: {
            color: '#333333', // Y-axis labels color
          },
        },
        lineColor: '#666666', // Y-axis line color
        tickColor: '#666666', // Y-axis tick color
      },

      // Recoloring series names
      legend: {
        itemStyle: {
          color: '#333333', // Series name color
        },
      },
    };
  }
  setDarkModeOptions() {
    this.chartOptions = {
      chart: {
        type: 'area',
        backgroundColor: '#333333', // Dark background color
        style: {
          fontFamily: "'Arial', sans-serif",
          color: '#ffffff', // Text color
        },
      },
      title: {
        text: 'Random DATA',
        style: {
          color: '#ffffff', // Title text color
        },
      },
      subtitle: {
        text: 'Demo',
        style: {
          color: '#cccccc', // Subtitle text color
        },
      },
      tooltip: {
        split: true,
        valueSuffix: ' millions',
        backgroundColor: 'rgba(0, 0, 0, 0.75)', // Dark tooltip background color
        style: {
          color: '#ffffff', // Tooltip text color
        },
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      series: this.data,

      // Additional styling for the chart elements
      xAxis: {
        labels: {
          style: {
            color: '#ffffff', // X-axis labels color
          },
        },
        lineColor: '#cccccc', // X-axis line color
        tickColor: '#cccccc', // X-axis tick color
      },
      yAxis: {
        labels: {
          style: {
            color: '#ffffff', // Y-axis labels color
          },
        },
        lineColor: '#cccccc', // Y-axis line color
        tickColor: '#cccccc', // Y-axis tick color
      },

      // Recoloring series names
      legend: {
        itemStyle: {
          color: '#ffffff', // Series name color
        },
      },
    };
  }

  ngOnInit() {
    this.toggleService.toggleState$.subscribe((state) => {
      // Use the toggle state in your component
      console.log('Toggle state in the area component:', state);
      if (state) {
        this.setDarkModeOptions();
      } else {
        this.setLightModeOptions();
      }
    });
    this.chartOptions = {
      chart: {
        type: 'area',
      },
      title: {
        text: 'Random DATA',
      },
      subtitle: {
        text: 'Demo',
      },
      tooltip: {
        split: true,
        valueSuffix: ' millions',
      },
      credits: {
        enabled: false,
      },
      exporting: {
        enabled: true,
      },
      series: this.data,
    };

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
