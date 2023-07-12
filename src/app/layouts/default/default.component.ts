import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  title = 'Angular material dark mode';
  receivedThemeValue: boolean = false;
  @HostBinding('class') className = '';
  sideBarOpen = false;
  darkMode = false; // Initial value for theme mode

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  toggleControl = new FormControl(false);

  constructor(private overlay: OverlayContainer) { }

  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      console.log('dark mode', darkMode);
      
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
      }
    });
  }

  onValueChanged(value: any) {
    this.receivedThemeValue = value;
    console.log("theme value changed", value);  
    console.log('dark mode', this.receivedThemeValue);
      
    const darkClassName = 'darkMode';
    this.className = this.receivedThemeValue ? darkClassName : '';
    if (this.receivedThemeValue) {
      this.overlay.getContainerElement().classList.add(darkClassName);
    } else {
      this.overlay.getContainerElement().classList.remove(darkClassName);
    }  
  }

}
