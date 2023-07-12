import { Component, OnInit } from '@angular/core';
import { ToggleService } from 'src/app/toggle.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isDarkMode: boolean = false;

  constructor(private toggleService: ToggleService) { }

  ngOnInit() {
    this.toggleService.toggleState$.subscribe((state) => {
      // Use the toggle state in your component
      console.log('Toggle state in the area component:', state);
      if (state) {
        this.isDarkMode = true;
      } else {
        this.isDarkMode = false;
      }
    });
  }

}
