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
  public allZones = [];

  constructor(public scheduleService: ScheduleService) { }

  ngOnInit() {
        this.getAllZones();
        console.log(this.scheduleService.setTempUnit);
        if (!this.scheduleService.setTempUnit) {
            this.scheduleService.setTempUnit = 'C';
        }
        this.schedules = this.scheduleService.schedules.sort((a, b) => b.date.getTime() - a.date.getTime());
        this.sortedSchedules = this.schedules;
        console.log(this.sortedSchedules);
  }

  public getAllZones() {
        this.scheduleService.getAllZones()
        .subscribe(res => this.allZones = res );
  }

  public getZoneName(id) {
        const retrievedZone = this.allZones.filter(zone => zone.id === id)[0];
        if (retrievedZone) {
          return retrievedZone.name;
        } else { return ' -- '; }
  }

  public createSchedule() {
        console.log('trigger new schedule');
  }


}
