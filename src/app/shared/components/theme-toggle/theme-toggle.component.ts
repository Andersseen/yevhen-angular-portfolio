import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [CommonModule, TranslateModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      (click)="toggleTheme()"
      class="relative p-2 rounded-lg bg-secondary-100 hover:bg-secondary-200 dark:bg-secondary-800 dark:hover:bg-secondary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      [attr.aria-label]="isDarkMode() ? ('theme.switchToLight' | translate) : ('theme.switchToDark' | translate)"
    >
      <div class="relative w-6 h-6">
        <!-- Sun Icon -->
        <svg
          class="absolute inset-0 w-6 h-6 text-amber-500 transition-all duration-300 transform"
          [class.scale-100]="!isDarkMode()"
          [class.scale-0]="isDarkMode()"
          [class.rotate-0]="!isDarkMode()"
          [class.rotate-90]="isDarkMode()"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="5"></circle>
          <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"></path>
        </svg>
        
        <!-- Moon Icon -->
        <svg
          class="absolute inset-0 w-6 h-6 text-primary-500 transition-all duration-300 transform"
          [class.scale-100]="isDarkMode()"
          [class.scale-0]="!isDarkMode()"
          [class.rotate-0]="isDarkMode()"
          [class.-rotate-90]="!isDarkMode()"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </div>
    </button>
  `
})
export class ThemeToggleComponent {
  private readonly themeService = inject(ThemeService);
  
  public readonly isDarkMode = this.themeService.isDarkMode;
  
  public toggleTheme(): void {
    this.themeService.toggleTheme();
  }
}