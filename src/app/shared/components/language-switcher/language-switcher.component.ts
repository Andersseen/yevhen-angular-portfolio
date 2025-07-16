import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService, SupportedLanguage } from '../../../core/services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  template: `
    <div class="relative">
      <button
        (click)="toggleDropdown()"
        class="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary-100 hover:bg-secondary-200 dark:bg-secondary-800 dark:hover:bg-secondary-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        [attr.aria-label]="'navigation.changeLanguage' | translate"
        [attr.aria-expanded]="isDropdownOpen"
      >
        <span class="text-sm font-medium">{{ getLanguageLabel(currentLanguage()) }}</span>
        <svg
          class="w-4 h-4 transition-transform duration-200"
          [class.rotate-180]="isDropdownOpen"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      <div
        *ngIf="isDropdownOpen"
        class="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-secondary-800 shadow-lg border border-secondary-200 dark:border-secondary-700 z-50"
        role="menu"
        aria-orientation="vertical"
      >
        <div class="py-1">
          <button
            *ngFor="let language of supportedLanguages"
            (click)="selectLanguage(language)"
            class="w-full text-left px-4 py-2 text-sm hover:bg-secondary-50 dark:hover:bg-secondary-700 transition-colors duration-150"
            [class.bg-primary-50]="language === currentLanguage()"
            [class.text-primary-600]="language === currentLanguage()"
            [class.dark:bg-primary-900]="language === currentLanguage()"
            [class.dark:text-primary-400]="language === currentLanguage()"
            role="menuitem"
          >
            {{ getLanguageLabel(language) }}
          </button>
        </div>
      </div>
    </div>
    
    <!-- Backdrop -->
    <div
      *ngIf="isDropdownOpen"
      class="fixed inset-0 z-40"
      (click)="closeDropdown()"
      aria-hidden="true"
    ></div>
  `
})
export class LanguageSwitcherComponent {
  private readonly languageService = inject(LanguageService);
  
  public readonly currentLanguage = this.languageService.currentLanguage;
  public readonly supportedLanguages = this.languageService.supportedLanguages;
  public isDropdownOpen = false;
  
  public toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  
  public closeDropdown(): void {
    this.isDropdownOpen = false;
  }
  
  public selectLanguage(language: SupportedLanguage): void {
    this.languageService.setLanguage(language);
    this.closeDropdown();
  }
  
  public getLanguageLabel(language: SupportedLanguage): string {
    return this.languageService.getLanguageLabel(language);
  }
}