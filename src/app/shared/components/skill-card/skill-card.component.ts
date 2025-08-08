import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Skill } from '../../../core/services/portfolio.service';
import { SkillLevelPipe } from '../../../core/pipes/skill-level.pipe';

@Component({
  selector: 'app-skill-card',
  imports: [CommonModule, TranslateModule, SkillLevelPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="card p-4 hover:shadow-md transition-shadow duration-200">
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0">
          <div class="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
            <span class="text-primary-600 dark:text-primary-400 text-sm font-bold">
              {{ skill().name.substring(0, 2) }}
            </span>
          </div>
        </div>

        <div class="flex-1 min-w-0">
          <h3 class="font-medium text-secondary-900 dark:text-white mb-1">
            {{ skill().name }}
          </h3>

          <div class="flex items-center gap-2 mb-2">
            <div class="flex gap-1">
              @for (star of getStars(skill().level); track star) {
                <div
                  class="w-3 h-3 rounded-full"
                  [class.bg-primary-500]="star <= skill().level"
                  [class.bg-secondary-200]="star > skill().level"
                  [class.dark:bg-secondary-700]="star > skill().level"
                ></div>
              }
            </div>
            <span class="text-xs text-secondary-600 dark:text-secondary-400">
              {{ skill().level | skillLevel }}
            </span>
          </div>

          @if (skill().description) {
            <p class="text-sm text-secondary-600 dark:text-secondary-400">
              {{ skill().description }}
            </p>
          }
        </div>
      </div>
    </div>
  `
})
export class SkillCardComponent {
  readonly skill = input.required<Skill>();
  
  public getStars(level: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }
}