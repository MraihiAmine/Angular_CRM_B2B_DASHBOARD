import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000'; // Replace this with your Express server URL

  bigChart: any[];
  pieChartData: any[];

  constructor(
    private fireBaseService: FirebaseService,
    private http: HttpClient
  ) {
    this.bigChart = [];
    this.pieChartData = [];
  }

  publishMessage(message: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200'
    });

    return this.http.post(`${this.apiUrl}/publish`, { message }, { headers });
  }

  // Method to retrieve the MQTT topic and last published message
  getMessage(): Observable<any> {
    return this.http.get(`${this.apiUrl}/message`);
  }

  getBigChart(): Observable<any[]> {
    return this.fireBaseService.temperatureObservable.pipe(
      map((temperatureData) => {
        const newData = [
          {
            name: 'Asia',
            data: temperatureData.map((data) => data.temperature),
            time: temperatureData.map((data) => data.time),
          },
        ];

        this.updateBigChart(newData);
        // this.updatePieChart(pieData);

        return newData;
      })
    );
  }
  getPieDataChart(): Observable<any[]> {
    return this.fireBaseService.temperatureObservable.pipe(
      map((temperatureData) => {
        const categorizedData = temperatureData.map((data) => {
          let category;
          if (data.temperature >= 30) {
            category = 'High';
          } else if (data.temperature >= 20) {
            category = 'Medium';
          } else {
            category = 'Low';
          }

          return {
            temperature: data.temperature,
            category: category,
          };
        });

        const statistics: { [key: string]: number } = {
          High: 0,
          Medium: 0,
          Low: 0,
        };

        categorizedData.forEach((data) => {
          statistics[data.category]++;
        });

        const pieData = [
          {
            name: 'High',
            y: statistics['High'] || 0,
          },
          {
            name: 'Medium',
            y: statistics['Medium'] || 0,
          },
          {
            name: 'Low',
            y: statistics['Low'] || 0,
          },
        ];

        console.log('pieData');
        console.log(pieData);

        return pieData;
      })
    );
  }
  getDataSource(): Observable<any[]> {
    return this.fireBaseService.temperatureObservable.pipe(
      map((temperatureData) => {
        const categorizedData = temperatureData.map((data) => {
          let category;
          if (data.temperature >= 30) {
            category = 'High';
          } else if (data.temperature >= 20) {
            category = 'Medium';
          } else {
            category = 'Low';
          }

          return {
            temperature: data.temperature,
            category: category,
          };
        });

        console.log('categorizedData');
        console.log(categorizedData);
        return categorizedData;
      })
    );
  }

  updateBigChart(newData: any[]) {
    this.bigChart = newData;
    console.log('this.updateBigChart', this.bigChart);
  }
  updatePieBigChart(newData: any[]) {
    this.pieChartData = newData;
    console.log('this.updateBigChart', this.pieChartData);
  }

  /*   bigChart() {
    return [{
      name: 'Asia',
      data: [502, 635, 809, 947, 1402, 3634, 5268]
    }, {
      name: 'Africa',
      data: [106, 107, 111, 133, 221, 767, 1766]
    }, {
      name: 'Europe',
      data: [163, 203, 276, 408, 547, 729, 628]
    }, {
      name: 'America',
      data: [18, 31, 54, 156, 339, 818, 1201]
    }, {
      name: 'Oceania',
      data: [2, 2, 2, 6, 13, 30, 46]
    }];
  } */

  cards() {
    return [71, 78, 39, 66];
  }

  pieChart() {
    return [
      {
        name: 'Chrome',
        y: 61.41,
        sliced: true,
        selected: true,
      },
      {
        name: 'Internet Explorer',
        y: 11.84,
      },
      {
        name: 'Firefox',
        y: 10.85,
      },
      {
        name: 'Edge',
        y: 4.67,
      },
      {
        name: 'Safari',
        y: 4.18,
      },
      {
        name: 'Sogou Explorer',
        y: 1.64,
      },
      {
        name: 'Opera',
        y: 1.6,
      },
      {
        name: 'QQ',
        y: 1.2,
      },
      {
        name: 'Other',
        y: 2.61,
      },
    ];
  }
}
