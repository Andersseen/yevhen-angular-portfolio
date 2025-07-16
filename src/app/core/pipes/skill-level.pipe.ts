import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'skillLevel',
  standalone: true
})
export class SkillLevelPipe implements PipeTransform {
  transform(level: number): string {
    const levels = {
      1: 'Beginner',
      2: 'Basic',
      3: 'Intermediate',
      4: 'Advanced',
      5: 'Expert'
    };
    
    return levels[level as keyof typeof levels] || 'Unknown';
  }
}