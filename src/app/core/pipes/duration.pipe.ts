import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {
  transform(startDate: string, endDate: string | null): string {
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : new Date();
    
    const diffInMs = end.getTime() - start.getTime();
    const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30.44));
    
    if (diffInMonths < 12) {
      return `${diffInMonths} month${diffInMonths !== 1 ? 's' : ''}`;
    }
    
    const years = Math.floor(diffInMonths / 12);
    const months = diffInMonths % 12;
    
    let result = `${years} year${years !== 1 ? 's' : ''}`;
    if (months > 0) {
      result += ` ${months} month${months !== 1 ? 's' : ''}`;
    }
    
    return result;
  }
}