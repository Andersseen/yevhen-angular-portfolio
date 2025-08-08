import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { AnimateOnScrollDirective } from '../../core/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-about',
  imports: [CommonModule, TranslateModule, AnimateOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about" class="py-20 bg-white dark:bg-secondary-900">
      <div class="container-max section-padding">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16" appAnimateOnScroll>
            <h2 class="text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              {{ 'about.title' | translate }}
            </h2>
            <p class="text-xl text-secondary-600 dark:text-secondary-400">
              {{ 'about.subtitle' | translate }}
            </p>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Content -->
            <div appAnimateOnScroll>
              <div class="prose prose-lg dark:prose-invert max-w-none">
                <p class="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-6">
                  {{ 'about.paragraph1' | translate }}
                </p>
                
                <p class="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-6">
                  {{ 'about.paragraph2' | translate }}
                </p>
                
                <p class="text-secondary-700 dark:text-secondary-300 leading-relaxed mb-8">
                  {{ 'about.paragraph3' | translate }}
                </p>
                
                <div class="flex flex-wrap gap-3">
                  @for (highlight of highlights; track highlight) {
                    <span
                      class="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200"
                    >
                      {{ highlight }}
                    </span>
                  }
                </div>
              </div>
            </div>
            
            <!-- Stats -->
            <div class="grid grid-cols-2 gap-6" appAnimateOnScroll>
              <div class="text-center p-6 card">
                <div class="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {{ personalInfo.yearsOfExperience }}+
                </div>
                <div class="text-secondary-600 dark:text-secondary-400">
                  {{ 'about.yearsExperience' | translate }}
                </div>
              </div>
              
              <div class="text-center p-6 card">
                <div class="text-3xl font-bold text-accent-600 dark:text-accent-400 mb-2">
                  50+
                </div>
                <div class="text-secondary-600 dark:text-secondary-400">
                  {{ 'about.projectsCompleted' | translate }}
                </div>
              </div>
              
              <div class="text-center p-6 card">
                <div class="text-3xl font-bold text-success-600 dark:text-success-400 mb-2">
                  100K+
                </div>
                <div class="text-secondary-600 dark:text-secondary-400">
                  {{ 'about.usersServed' | translate }}
                </div>
              </div>
              
              <div class="text-center p-6 card">
                <div class="text-3xl font-bold text-warning-600 dark:text-warning-400 mb-2">
                  24/7
                </div>
                <div class="text-secondary-600 dark:text-secondary-400">
                  {{ 'about.systemUptime' | translate }}
                </div>
              </div>
            </div>
          </div>
          
          <div class="mt-16 text-center" appAnimateOnScroll>
            <h3 class="text-2xl font-semibold text-secondary-900 dark:text-white mb-8">
              {{ 'about.whatIDo' | translate }}
            </h3>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="card p-6 text-center">
                <div class="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                  <svg class="w-6 h-6 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                  </svg>
                </div>
                <h4 class="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                  {{ 'about.apiDevelopment' | translate }}
                </h4>
                <p class="text-secondary-600 dark:text-secondary-400">
                  {{ 'about.apiDevelopmentDesc' | translate }}
                </p>
              </div>
              
              <div class="card p-6 text-center">
                <div class="w-12 h-12 mx-auto mb-4 rounded-lg bg-accent-100 dark:bg-accent-900 flex items-center justify-center">
                  <svg class="w-6 h-6 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
                  </svg>
                </div>
                <h4 class="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                  {{ 'about.databaseDesign' | translate }}
                </h4>
                <p class="text-secondary-600 dark:text-secondary-400">
                  {{ 'about.databaseDesignDesc' | translate }}
                </p>
              </div>
              
              <div class="card p-6 text-center">
                <div class="w-12 h-12 mx-auto mb-4 rounded-lg bg-success-100 dark:bg-success-900 flex items-center justify-center">
                  <svg class="w-6 h-6 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                  </svg>
                </div>
                <h4 class="text-xl font-semibold text-secondary-900 dark:text-white mb-3">
                  {{ 'about.cloudSolutions' | translate }}
                </h4>
                <p class="text-secondary-600 dark:text-secondary-400">
                  {{ 'about.cloudSolutionsDesc' | translate }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AboutComponent {
  private readonly portfolioService = inject(PortfolioService);
  
  public readonly personalInfo = this.portfolioService.getPersonalInfo();
  
  public readonly highlights = [
    'ASP.NET Core',
    'Entity Framework',
    'Azure Cloud',
    'Microservices',
    'Clean Architecture',
    'Performance Optimization'
  ];
}