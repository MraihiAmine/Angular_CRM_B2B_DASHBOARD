import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FirebaseService } from '../firebase.service';
import { MqttService } from 'ngx-mqtt';

@Component({
  selector: 'app-control-data',
  templateUrl: './control-data.component.html',
  styleUrls: ['./control-data.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ControlDataComponent {
  constructor(
    private firebaseService: FirebaseService,
    private mqttService: MqttService
  ) {}
  isLedOn = false;
  communicationMethod: 'firebase' | 'mqtt' = 'firebase'; // Default to Firebase communication
  topic = 'test/hello'; // Replace with the topic the Python subscriber is listening to

  valueSlider: number = 0; // Initial value of the slider
  disabled: boolean = false;
  max: number = 100;
  min: number = 0;
  step: number = 25;
  thumbLabel: boolean = true;
  showTicks: boolean = true;

  onSliderInput(): void {
    console.log('newValue', this.valueSlider);

    this.communicationMethod === 'firebase'
      ? this.firebaseService.sendSliderValue(this.valueSlider)
      : this.publishMqttLedMessage('home/living_room/slider/value', this.valueSlider);
  }

  toggleLed(): void {
    this.isLedOn = !this.isLedOn;
    this.communicationMethod === 'firebase'
      ? this.firebaseService.sendDataToFirebase(this.isLedOn)
      : this.publishMqttLedMessage('home/living_room/led/control', this.isLedOn);
    this.firebaseService.sendDataToFirebase(this.isLedOn);
  }

  publishMqttLedMessage(topic: any, data: any): void {
    this.mqttService.publish(topic, String(data)).subscribe({
      next: () => {
        console.log('Message published successfully!');
      },
      error: (error) => {
        console.error('Failed to publish message:', error);
      },
    });
  }

  getImageSource(): string {
    // Determine the image source based on the slider value
    if (this.valueSlider < 25) {
      return 'assets\\images\\slider_lamp_images\\deg_0.jpg';
    } else if (this.valueSlider >= 25 && this.valueSlider < 50) {
      return 'assets\\images\\slider_lamp_images\\deg_1.jpg';
    } else if (this.valueSlider >= 50 && this.valueSlider <= 75) {
      return 'assets\\images\\slider_lamp_images\\deg_2.jpg';
    } else {
      return 'assets\\images\\slider_lamp_images\\deg_3.jpg';
    }
  }
}
