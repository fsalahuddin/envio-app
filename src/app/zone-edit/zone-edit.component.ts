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
  public createOn = false;
  public newId;
  public newDate;
  public selectedZone;
  public newTemp;

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

  public toggleCreateSchedule() {
        if (this.createOn) {
          this.createOn = false;
        } else {this.createOn = true; }
  }

  public onSubmit(value) {
          if (this.scheduleService.setTempUnit === 'F') {
              value['temperature'] = ((value['temperature'] - 32) * 0.56).toFixed(2);
          }
          this.scheduleService.schedules.push(value);
          this.schedules = this.scheduleService.schedules.sort((a, b) => b.date.getTime() - a.date.getTime());
          this.createOn = false;
  }

  public deleteSchedule (id) {
          this.scheduleService.schedules = this.scheduleService.schedules.filter(schedule => schedule.id !== id);
          this.sortedSchedules = this.scheduleService.schedules.sort((a, b) => b.date.getTime() - a.date.getTime());
  }


}
