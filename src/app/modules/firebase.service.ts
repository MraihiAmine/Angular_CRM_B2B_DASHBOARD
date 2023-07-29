import { Injectable } from '@angular/core';
import { temperatureModel } from './temp_interface';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {


  private temperatureCollection!: AngularFirestoreCollection<temperatureModel>;
  temperatureObservable!: Observable<temperatureModel[]>;

  constructor(private readonly fireStoreService: AngularFirestore) {
    this.temperatureCollection =
      fireStoreService.collection<temperatureModel>('TemperatureData');

    this.temperatureObservable = this.temperatureCollection
      .snapshotChanges()
      .pipe(
        map((actions) =>
          actions.map((a) => {
            let temperatureData = a.payload.doc.data() as temperatureModel;
            let id = a.payload.doc.id;
            console.log("temp data: ");
            console.log(temperatureData);
            
            
            return {
              id,
              ...temperatureData,
            };
          })
        )
      );
  }

  addFakeTemperatureData() {
    const fakeData = [
      { temperature: 25, time: { seconds: 1676011320, nanoseconds: 211000000 } },
      { temperature: 30, time: { seconds: 1676014320, nanoseconds: 311000000 } },
      { temperature: 35, time: { seconds: 1676017320, nanoseconds: 411000000 } },
      // Add more fake data as needed
    ];

    fakeData.forEach((data) => {
      this.fireStoreService.collection<temperatureModel>('TemperatureData').add(data);
    });
  }

}
