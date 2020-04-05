import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  public zoneServerUrl = 'https://my-json-server.typicode.com/ivanturianytsia-envio/json-data/zones';
  public allZones;
  public setTempUnit;
  public schedules = [
        { id: 1, date: new Date('2020-04-04'), temperature: 25, zoneID: 5 },
        { id: 2, date: new Date('2020-04-06'), temperature: 27, zoneID: 8},
        { id: 3, date: new Date('2020-04-05'), temperature: 30, zoneID: 2},
        { id: 4, date: new Date('2020-04-07'), temperature: 32, zoneID: 3},
        { id: 6, date: new Date('2020-04-06'), temperature: 27, zoneID: 7},
        { id: 7, date: new Date('2020-04-05'), temperature: 30, zoneID: 2},
        { id: 8, date: new Date('2020-04-07'), temperature: 32, zoneID: 3},
  ];

  constructor(private _http: Http) {
        console.log('Service Initiated');
  }

  public getAllZones() {
        return this._http.get(this.zoneServerUrl).pipe(map((response: Response) => response.json()));
  }

  public toggleTempUnit() {
        if (this.setTempUnit === 'C') {
            this.setTempUnit = 'F';
        } else {
            this.setTempUnit = 'C';
        }
  }
}
