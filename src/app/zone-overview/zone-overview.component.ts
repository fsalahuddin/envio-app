import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../schedule.service';

@Component({
  selector: 'app-zone-overview',
  templateUrl: './zone-overview.component.html',
  styleUrls: ['./zone-overview.component.css']
})
export class ZoneOverviewComponent implements OnInit {

  public allZones;
  public selectedZones = [];
  public schedules;
  public sortedFilteredSchedules;

  constructor(public scheduleService: ScheduleService) { }

  ngOnInit() {
        this.getAllZones();
        this.schedules = this.scheduleService.schedules.sort((a, b) => b.date.getTime() - a.date.getTime());
        this.sortedFilteredSchedules = this.schedules;
  }

  public getAllZones() {
        this.scheduleService.getAllZones()
        .subscribe(res => {
                            this.allZones = res;
                            this.allZones.map(zone => this.selectedZones.push(zone.id));
        });
  }

  public selectUnselectZones(id) {
        if (this.selectedZones.includes(id)) {
            this.selectedZones = this.selectedZones.filter(element => element !== id);
        } else { this.selectedZones.push(id); }
        this.filterSchedule();
  }

  public filterSchedule() {
        this.sortedFilteredSchedules = this.schedules.filter(schedule => this.selectedZones.includes(schedule.zoneID));
  }

  public getZoneName(id) {
        const retrievedZone = this.allZones.filter(zone => zone.id === id)[0];
        if (retrievedZone) {
          return retrievedZone.name;
        } else { return ' -- '; }
  }

}
