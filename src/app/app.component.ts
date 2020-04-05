import { Component } from '@angular/core';
import { ScheduleService } from './schedule.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'envio-app';

  constructor(public scheduleService: ScheduleService) { }
}
