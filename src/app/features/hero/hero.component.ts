import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { PortfolioService } from '../../core/services/portfolio.service';
import { AnimationService } from '../../core/services/animation.service';
import { AnimateOnScrollDirective } from '../../core/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterModule, AnimateOnScrollDirective],
  template: `
    <section class="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-50 dark:from-secondary-900 dark:to-secondary-800">
      <div class="container-max section-padding">
        <div class="text-center" appAnimateOnScroll>
          <div class="mb-8">
            <div class="relative inline-block">
              <div class="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 p-1">
                <div class="w-full h-full rounded-full bg-white dark:bg-secondary-800 flex items-center justify-center">
                  <span class="text-4xl font-bold text-primary-600 dark:text-primary-400">
                    {{ getInitials(personalInfo.name) }}
                  </span>
                </div>
              </div>
              
              <!-- Animated rings -->
              <div class="absolute inset-0 w-32 h-32 mx-auto rounded-full border-2 border-primary-200 dark:border-primary-800 animate-ping"></div>
              <div class="absolute inset-0 w-32 h-32 mx-auto rounded-full border border-accent-200 dark:border-accent-800 animate-pulse"></div>
            </div>
            
            <h1 class="text-5xl sm:text-6xl font-bold text-secondary-900 dark:text-white mb-4">
              {{ personalInfo.name }}
            </h1>
            
            <p class="text-2xl sm:text-3xl text-gradient font-semibold mb-2">
              {{ personalInfo.title }}
            </p>
            
            <p class="text-lg text-secondary-600 dark:text-secondary-400 mb-8 max-w-2xl mx-auto">
              {{ personalInfo.summary }}
            </p>
            
            <div class="flex items-center justify-center gap-4 mb-8">
              <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200">
                {{ personalInfo.yearsOfExperience }}+ {{ 'hero.yearsExperience' | translate }}
              </span>
              
              <span class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                {{ personalInfo.location }}
              </span>
            </div>
          </div>
          
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              (click)="scrollToSection('contact')"
              class="btn btn-primary w-full sm:w-auto"
            >
              {{ 'hero.getInTouch' | translate }}
            </button>
            
            <button
              (click)="scrollToSection('experience')"
              class="btn btn-outline w-full sm:w-auto"
            >
              {{ 'hero.viewExperience' | translate }}
            </button>
            
            <button
              (click)="downloadResume()"
              class="btn btn-secondary w-full sm:w-auto"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-4-4m4 4l4-4m-4 4l4-4M12 10V4m0 6l4-4m-4 4l-4-4"></path>
              </svg>
              {{ 'hero.downloadResume' | translate }}
            </button>
          </div>
          
          <div class="flex items-center justify-center gap-6">
            <a
              [href]="personalInfo.github"
              target="_blank"
              rel="noopener noreferrer"
              class="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors duration-200"
              [attr.aria-label]="'hero.githubProfile' | translate"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
              </svg>
            </a>
            
            <a
              [href]="personalInfo.linkedIn"
              target="_blank"
              rel="noopener noreferrer"
              class="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors duration-200"
              [attr.aria-label]="'hero.linkedInProfile' | translate"
            >
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
              </svg>
            </a>
            
            <a
              [href]="'mailto:' + personalInfo.email"
              class="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors duration-200"
              [attr.aria-label]="'hero.emailContact' | translate"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
        <button
          (click)="scrollToSection('about')"
          class="text-secondary-600 hover:text-primary-600 dark:text-secondary-400 dark:hover:text-primary-400 transition-colors duration-200"
          [attr.aria-label]="'hero.scrollDown' | translate"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>
      </div>
    </section>
  `
})
export class HeroComponent implements OnInit {
  private readonly portfolioService = inject(PortfolioService);
  private readonly animationService = inject(AnimationService);
  
  public readonly personalInfo = this.portfolioService.getPersonalInfo();
  
  ngOnInit(): void {
    this.addConsoleEasterEgg();
  }
  
  public getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
  
  public scrollToSection(sectionId: string): void {
    this.animationService.smoothScrollTo(`#${sectionId}`, 80);
  }
  
  public downloadResume(): void {
    this.portfolioService.downloadResume().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.personalInfo.name.replace(' ', '_')}_Resume.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (error) => {
        console.error('Error downloading resume:', error);
      }
    });
  }
  
  private addConsoleEasterEgg(): void {
    if (typeof console !== 'undefined') {
      console.log(`
        🚀 Welcome to ${this.personalInfo.name}'s Portfolio!
        
        Built with Angular 17+ and TypeScript
        Styled with Tailwind CSS
        
        📧 Contact: ${this.personalInfo.email}
        🔗 LinkedIn: ${this.personalInfo.linkedIn}
        💻 GitHub: ${this.personalInfo.github}
        
        Thanks for checking out the code! 💙
      `);
    }
  }
}