import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Experience } from '../../../core/services/portfolio.service';
import { DateRangePipe } from '../../../core/pipes/date-range.pipe';
import { DurationPipe } from '../../../core/pipes/duration.pipe';

@Component({
  selector: 'app-experience-card',
  standalone: true,
  imports: [CommonModule, TranslateModule, DateRangePipe, DurationPipe],
  template: `
    <div class="card p-6 hover:shadow-md transition-shadow duration-200">
      <div class="flex items-start gap-4">
        <div class="flex-shrink-0">
          <div class="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
            <span class="text-primary-600 dark:text-primary-400 text-lg font-bold">
              {{ experience.company.substring(0, 2) }}
            </span>
          </div>
        </div>
        
        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between gap-4 mb-2">
            <div>
              <h3 class="text-xl font-semibold text-secondary-900 dark:text-white">
                {{ experience.position }}
              </h3>
              <p class="text-primary-600 dark:text-primary-400 font-medium">
                {{ experience.company }}
              </p>
            </div>
            
            <div class="text-right flex-shrink-0">
              <p class="text-sm text-secondary-600 dark:text-secondary-400">
                {{ experience.startDate | dateRange:experience.endDate }}
              </p>
              <p class="text-xs text-secondary-500 dark:text-secondary-500">
                {{ experience.startDate | duration:experience.endDate }}
              </p>
            </div>
          </div>
          
          <div class="mb-3">
            <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200">
              {{ experience.type | titlecase }}
            </span>
            <span class="ml-2 text-sm text-secondary-600 dark:text-secondary-400">
              {{ experience.location }}
            </span>
          </div>
          
          <p class="text-secondary-700 dark:text-secondary-300 mb-4">
            {{ experience.description }}
          </p>
          
          <div class="mb-4">
            <h4 class="font-medium text-secondary-900 dark:text-white mb-2">
              {{ 'experience.keyAchievements' | translate }}
            </h4>
            <ul class="space-y-1">
              <li 
                *ngFor="let achievement of experience.achievements"
                class="flex items-start gap-2 text-sm text-secondary-700 dark:text-secondary-300"
              >
                <svg class="w-4 h-4 mt-0.5 text-accent-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                </svg>
                {{ achievement }}
              </li>
            </ul>
          </div>
          
          <div>
            <h4 class="font-medium text-secondary-900 dark:text-white mb-2">
              {{ 'experience.technologies' | translate }}
            </h4>
            <div class="flex flex-wrap gap-2">
              <span 
                *ngFor="let tech of experience.technologies"
                class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary-100 text-secondary-800 dark:bg-secondary-700 dark:text-secondary-200"
              >
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ExperienceCardComponent {
  @Input({ required: true }) experience!: Experience;
}