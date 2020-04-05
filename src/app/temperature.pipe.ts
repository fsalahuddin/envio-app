import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'temperature'})
export class TemperaturePipe implements PipeTransform {
  transform(value: number, unit?: string): string {
      if (unit === 'F') {
          return (((value * 1.8) + 32).toFixed(2)).toString() + ' °F';
      } else {return value.toString() + ' °C'; }
  }
}
