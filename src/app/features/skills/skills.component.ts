import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { SkillCardComponent } from '../../shared/components/skill-card/skill-card.component';
import { AnimateOnScrollDirective } from '../../core/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-skills',
  imports: [CommonModule, TranslateModule, SkillCardComponent, AnimateOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills" class="py-20 bg-secondary-50 dark:bg-secondary-800">
      <div class="container-max section-padding">
        <div class="text-center mb-16" appAnimateOnScroll>
          <h2 class="text-4xl font-bold text-secondary-900 dark:text-white mb-4">
            {{ 'skills.title' | translate }}
          </h2>
          <p class="text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            {{ 'skills.subtitle' | translate }}
          </p>
        </div>
        
        <div class="space-y-12">
          <!-- Backend Technologies -->
          <div appAnimateOnScroll>
            <h3 class="text-2xl font-semibold text-secondary-900 dark:text-white mb-6 flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                <svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path>
                </svg>
              </div>
              {{ 'skills.backend' | translate }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (skill of getSkillsByCategory('backend'); track skill.name) {
                <app-skill-card [skill]="skill"></app-skill-card>
              }
            </div>
          </div>
          
          <!-- Database Technologies -->
          <div appAnimateOnScroll>
            <h3 class="text-2xl font-semibold text-secondary-900 dark:text-white mb-6 flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-accent-100 dark:bg-accent-900 flex items-center justify-center">
                <svg class="w-5 h-5 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
                </svg>
              </div>
              {{ 'skills.database' | translate }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (skill of getSkillsByCategory('database'); track skill.name) {
                <app-skill-card [skill]="skill"></app-skill-card>
              }
            </div>
          </div>
          
          <!-- Cloud & DevOps -->
          <div appAnimateOnScroll>
            <h3 class="text-2xl font-semibold text-secondary-900 dark:text-white mb-6 flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-success-100 dark:bg-success-900 flex items-center justify-center">
                <svg class="w-5 h-5 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"></path>
                </svg>
              </div>
              {{ 'skills.cloud' | translate }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (skill of getSkillsByCategory('cloud'); track skill.name) {
                <app-skill-card [skill]="skill"></app-skill-card>
              }
            </div>
          </div>
          
          <!-- Tools & Other -->
          <div appAnimateOnScroll>
            <h3 class="text-2xl font-semibold text-secondary-900 dark:text-white mb-6 flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-warning-100 dark:bg-warning-900 flex items-center justify-center">
                <svg class="w-5 h-5 text-warning-600 dark:text-warning-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              {{ 'skills.tools' | translate }}
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (skill of getSkillsByCategory('tools'); track skill.name) {
                <app-skill-card [skill]="skill"></app-skill-card>
              }
              @for (skill of getSkillsByCategory('other'); track skill.name) {
                <app-skill-card [skill]="skill"></app-skill-card>
              }
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SkillsComponent {
  private readonly portfolioService = inject(PortfolioService);
  
  public getSkillsByCategory(category: string) {
    return this.portfolioService.getSkillsByCategory(category as any);
  }
}