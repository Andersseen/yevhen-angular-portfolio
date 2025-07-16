import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRange',
  standalone: true
})
export class DateRangePipe implements PipeTransform {
  transform(startDate: string, endDate: string | null): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const startFormatted = start.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
    
    const endFormatted = endDate 
      ? end.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
      : 'Present';
    
    return `${startFormatted} - ${endFormatted}`;
  }
}