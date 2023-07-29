import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
  chartOptions: any;
  @Input() data: any;
  isDarkMode: boolean = false;

  lightChartOptions: any;
  darkChartOptions: any;

  constructor(private toggleService: ToggleService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.chartOptions = {
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
    if (changes['data']) {
      console.log('change[data] in the pie component = ');
      console.log(changes['data']);
      console.log('so this new data is in the pie component: ');
      console.log(this.data);

      // Find the index of the highest record
      const highestIndex = this.data.reduce(
        (
          maxIndex: string | number,
          current: { y: number },
          index: any,
          array: { [x: string]: { y: number } }
        ) => (current.y > array[maxIndex].y ? index : maxIndex),
        0
      );

      // Add the sliced and selected properties to the highest record
      if (this.data[highestIndex]) {
        this.data[highestIndex].sliced = true;
        this.data[highestIndex].selected = true;

        this.lightChartOptions.series[0].data = this.data;
        this.darkChartOptions.series[0].data = this.data;
        this.chartOptions.series[0].data = this.data;
      }

      /* this.toggleService.toggleState$.subscribe((state) => {
        this.isDarkMode = !this.isDarkMode;
        console.log('Toggle state in the pie component:', state);
        this.chartOptions = state
          ? this.darkChartOptions
          : this.lightChartOptions;

        this.chartOptions.series[0].data = this.data;
      }); */
      // this.updateChartOptions();
      console.log('this chartoptions in the pie component:');
      console.log(this.chartOptions);

      /*       console.log(this.data[0]?.data);
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
      console.log(this.chartOptions); */
    }
  }

  updateChartOptions() {
    this.chartOptions = this.isDarkMode
      ? this.darkChartOptions
      : this.lightChartOptions;
  }

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
      this.isDarkMode = !this.isDarkMode;
      console.log('Toggle state in the pie component:', state);
      this.chartOptions = state
        ? this.darkChartOptions
        : this.lightChartOptions;
    });

    HC_exporting(Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
