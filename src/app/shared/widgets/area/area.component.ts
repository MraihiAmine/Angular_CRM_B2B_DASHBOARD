import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { ToggleService } from 'src/app/toggle.service';

@Component({
  selector: 'app-widget-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.scss'],
})
export class AreaComponent implements OnInit {
  chartOptions!: any;
  @Input() data: any = [];

  Highcharts = Highcharts;
  isDarkMode: boolean = false;
  categories: any;

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
        categories: this.categories,
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
        categories: this.categories,
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      console.log('change[data] = ');
      console.log(changes['data']);
      console.log('so this new data is: ');
      console.log(this.data);
      console.log(this.data[0]?.data);
      const transformedTimeData = this.data[0]?.time.map((time_tmp: any) => {
        const time = new Date(time_tmp.seconds * 1000); // Convert the seconds to milliseconds
        const formattedTime = time.toLocaleString(); // Format the time in a comprehensive format, adjust the locale as per your needs
        return formattedTime;
      });
      this.data = [
        {
          name: 'Temperatures',
          data: this.data[0]?.data,
        },
      ];
      console.log("transformedTimeData", transformedTimeData);
      
      this.categories = transformedTimeData;

      this.updateChartOptions();

      console.log('chartoptions');
      console.log(this.chartOptions);
    }
  }

  updateChartOptions() {
    if (this.isDarkMode) {
      this.setDarkModeOptions();
    } else {
      this.setLightModeOptions();
    }
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
