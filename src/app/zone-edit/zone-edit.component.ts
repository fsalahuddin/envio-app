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
  public createEditOn = false;
  public editOn = false;
  public createOn = false;
  public newId;
  public newDate;
  public selectedZone;
  public newTemp;

  constructor(public scheduleService: ScheduleService) { }

  ngOnInit() {
        this.getAllZones();
        if (!this.scheduleService.setTempUnit) {
            this.scheduleService.setTempUnit = 'C';
        }
        // sort schedules chronologically by date (latest first)
        this.schedules = this.scheduleService.schedules.sort((a, b) => b.date.getTime() - a.date.getTime());
        this.sortedSchedules = this.schedules;
  }

  // retrieve all zones from the url given
  public getAllZones() {
        this.scheduleService.getAllZones()
                            .subscribe(res => this.allZones = res );
  }

  // get zone name given the ID
  public getZoneName(id) {
        const retrievedZone = this.allZones.filter(zone => zone.id === id)[0];
        if (retrievedZone) {
          return retrievedZone.name;
        } else { return ' -- '; }
  }

  // toggle the create and edit forms
  public toggleScheduleForm() {
        this.clearFormValues();
        if (this.createEditOn) {
            this.createEditOn = false;
            this.createOn = false;
        } else {this.createEditOn = true;
            this.createOn = true;
        }
  }

  // submit a new schedule or edits to schedules
  public onSubmit(value) {
          if (this.scheduleService.setTempUnit === 'F') {
              value['temperature'] = ((value['temperature'] - 32) * 0.56).toFixed(2);
          }
          if (this.createOn) {
              this.scheduleService.schedules.push(value);
              this.schedules = this.scheduleService.schedules.sort((a, b) => b.date.getTime() - a.date.getTime());
              this.createOn = false;
          } else if (this.editOn) {
              value['id'] = this.newId;
              this.scheduleService.schedules
                  .map (schedule => {
                                      if (schedule.id === value.id) {
                                          schedule.zoneID = value.zoneID;
                                          schedule.temperature = value.temperature;
                                          schedule.date = value.date;
                                      }
                  });
              this.sortedSchedules = this.scheduleService.schedules.sort((a, b) => b.date.getTime() - a.date.getTime());
              this.editOn = false;
          }
          this.createEditOn = false;

  }

  // delete a schedule given the id
  public deleteSchedule (id) {
          this.scheduleService.schedules = this.scheduleService.schedules.filter(schedule => schedule.id !== id);
          this.sortedSchedules = this.scheduleService.schedules.sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  // edit a schedule given the id
  public editSchedule(id) {
          this.createEditOn = false;
          this.createOn = false;
          const selectedSchedule = this.scheduleService.schedules.filter(schedule => schedule.id === id);
          this.newId = selectedSchedule[0].id;
          this.newTemp = selectedSchedule[0].temperature;
          this.newDate = selectedSchedule[0].date;
          this.selectedZone = selectedSchedule[0].zoneID;
          this.createEditOn = true;
          this.editOn = true;
  }

  // clear all form values
  public clearFormValues() {
          this.editOn = false;
          this.createOn = false;
          this.newId = null;
          this.newDate = null;
          this.newTemp = null;
          this.selectedZone = null;
  }


}
