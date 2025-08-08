import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { ThemeToggleComponent } from '../../shared/components/theme-toggle/theme-toggle.component';
import { LanguageSwitcherComponent } from '../../shared/components/language-switcher/language-switcher.component';
import { AnimationService } from '../../core/services/animation.service';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, TranslateModule, ThemeToggleComponent, LanguageSwitcherComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [class.bg-white]="isScrolled() && !isDarkMode()"
      [class.dark:bg-secondary-900]="isScrolled() && isDarkMode()"
      [class.backdrop-blur-sm]="isScrolled()"
      [class.border-b]="isScrolled()"
      [class.border-secondary-200]="isScrolled() && !isDarkMode()"
      [class.dark:border-secondary-700]="isScrolled() && isDarkMode()"
    >
      <nav class="container-max section-padding">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a
            (click)="scrollToTop()"
            class="text-2xl font-bold text-gradient cursor-pointer"
            [attr.aria-label]="'navigation.home' | translate"
          >
            AP
          </a>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            @for (item of navigationItems; track item.href) {
              <a
                (click)="scrollToSection(item.href)"
                class="text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors duration-200 cursor-pointer"
                [class.text-primary-600]="activeSection() === item.href"
                [class.dark:text-primary-400]="activeSection() === item.href"
              >
                {{ item.label | translate }}
              </a>
            }
          </div>

          <!-- Theme Toggle and Language Switcher -->
          <div class="flex items-center gap-4">
            <app-theme-toggle></app-theme-toggle>
            <app-language-switcher></app-language-switcher>

            <!-- Mobile Menu Button -->
            <button
              (click)="toggleMobileMenu()"
              class="md:hidden p-2 rounded-lg text-secondary-700 hover:text-primary-600 dark:text-secondary-300 dark:hover:text-primary-400 transition-colors duration-200"
              [attr.aria-label]="'navigation.menu' | translate"
              [attr.aria-expanded]="isMobileMenuOpen()"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                @if (isMobileMenuOpen()) {
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                } @else {
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                }
              </svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        @if (isMobileMenuOpen()) {
          <div
            class="md:hidden mt-4 pb-4 border-t border-secondary-200 dark:border-secondary-700"
          >
            <div class="flex flex-col space-y-4 pt-4">
              @for (item of navigationItems; track item.href) {
                <a
                  (click)="scrollToSection(item.href); closeMobileMenu()"
                  class="block px-4 py-2 rounded-lg text-secondary-700 hover:text-primary-600 hover:bg-secondary-50 dark:text-secondary-300 dark:hover:text-primary-400 dark:hover:bg-secondary-800 transition-colors duration-200 cursor-pointer"
                  [class.text-primary-600]="activeSection() === item.href"
                  [class.bg-primary-50]="activeSection() === item.href"
                  [class.dark:text-primary-400]="activeSection() === item.href"
                  [class.dark:bg-primary-900]="activeSection() === item.href"
                >
                  {{ item.label | translate }}
                </a>
              }
            </div>
          </div>
        }
      </nav>
    </header>
  `,
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly animationService = inject(AnimationService);
  private readonly destroy$ = new Subject<void>();

  public readonly isScrolled = signal(false);
  public readonly isDarkMode = signal(false);
  public readonly isMobileMenuOpen = signal(false);
  public readonly activeSection = signal('');

  public readonly navigationItems = [
    { href: 'about', label: 'navigation.about' },
    { href: 'experience', label: 'navigation.experience' },
    { href: 'skills', label: 'navigation.skills' },
    { href: 'contact', label: 'navigation.contact' },
  ];

  ngOnInit(): void {
    this.setupScrollListener();
    this.setupActiveSection();
    this.checkDarkMode();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupScrollListener(): void {
    this.animationService
      .createScrollObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(scrollY => {
        this.isScrolled.set(scrollY > 50);
      });
  }

  private setupActiveSection(): void {
    // Simple implementation for demo - in production, use Intersection Observer
    this.animationService
      .createScrollObservable()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateActiveSection();
      });
  }

  private updateActiveSection(): void {
    const sections = this.navigationItems.map(item => item.href);
    const scrollPosition = window.scrollY + 200;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const top = element.offsetTop;
        const bottom = top + element.offsetHeight;

        if (scrollPosition >= top && scrollPosition <= bottom) {
          this.activeSection.set(section);
          break;
        }
      }
    }
  }

  private checkDarkMode(): void {
    this.isDarkMode.set(document.documentElement.classList.contains('dark'));

    // Listen for theme changes
    const observer = new MutationObserver(() => {
      this.isDarkMode.set(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });
  }

  public scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public scrollToSection(sectionId: string): void {
    this.animationService.smoothScrollTo(`#${sectionId}`, 80);
  }

  public toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(open => !open);
  }

  public closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
