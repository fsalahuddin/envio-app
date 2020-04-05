import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-zone-edit',
  templateUrl: './zone-edit.component.html',
  styleUrls: ['./zone-edit.component.css']
})
export class ZoneEditComponent implements OnInit {

  public schedules;
  public sortedSchedules;

  constructor(public scheduleService: ScheduleService) { }

  ngOnInit() {
        if (!this.scheduleService.setTempUnit) {
            this.scheduleService.setTempUnit = 'C';
        }
        this.schedules = this.scheduleService.schedules.sort((a, b) => b.date.getTime() - a.date.getTime());
        this.sortedSchedules = this.schedules;
  }


}
