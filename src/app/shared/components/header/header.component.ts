import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostBinding,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToggleService } from 'src/app/toggle.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  darkMode: boolean = false;
  @HostBinding('class') className = '';

  toggleControl = new FormControl(false);
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  @Output() valueChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private toggleService: ToggleService) {}

  ngOnInit() {
    this.toggleService.setToggleState(this.darkMode);
  }
  toggleValue() {
    this.darkMode = !this.darkMode;
    console.log('Toggle value in the header component:', this.darkMode);
    this.valueChanged.emit(this.darkMode);
    // You can perform any further actions with the value as needed
    this.toggleService.setToggleState(this.darkMode);
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
