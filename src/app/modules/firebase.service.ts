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
            console.log("temp data: " + temperatureData);
            
            return {
              id,
              ...temperatureData,
            };
          })
        )
      );
  }

}
