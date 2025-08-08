import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { ExperienceCardComponent } from '../../shared/components/experience-card/experience-card.component';
import { AnimateOnScrollDirective } from '../../core/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-experience',
  imports: [CommonModule, TranslateModule, ExperienceCardComponent, AnimateOnScrollDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experience" class="py-20 bg-white dark:bg-secondary-900">
      <div class="container-max section-padding">
        <div class="text-center mb-16" appAnimateOnScroll>
          <h2 class="text-4xl font-bold text-secondary-900 dark:text-white mb-4">
            {{ 'experience.title' | translate }}
          </h2>
          <p class="text-xl text-secondary-600 dark:text-secondary-400 max-w-2xl mx-auto">
            {{ 'experience.subtitle' | translate }}
          </p>
        </div>
        
        <div class="relative max-w-4xl mx-auto">
          <!-- Timeline line -->
          <div class="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-secondary-200 dark:bg-secondary-700"></div>
          
          <div class="space-y-12">
            @for (experience of experiences; track experience.company; let i = $index) {
              <div
                class="relative flex items-center"
                [class.md:flex-row-reverse]="i % 2 === 0"
                appAnimateOnScroll
              >
                <!-- Timeline dot -->
                <div class="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-3 h-3 bg-primary-500 rounded-full border-4 border-white dark:border-secondary-900 z-10"></div>

                <!-- Content -->
                <div class="ml-12 md:ml-0 md:w-5/12" [class.md:text-right]="i % 2 === 0">
                  <app-experience-card [experience]="experience"></app-experience-card>
                </div>
              </div>
            }
          </div>
        </div>
        
        <div class="text-center mt-16" appAnimateOnScroll>
          <p class="text-secondary-600 dark:text-secondary-400 mb-6">
            {{ 'experience.interested' | translate }}
          </p>
          <button
            (click)="scrollToContact()"
            class="btn btn-primary"
          >
            {{ 'experience.getInTouch' | translate }}
          </button>
        </div>
      </div>
    </section>
  `
})
export class ExperienceComponent {
  private readonly portfolioService = inject(PortfolioService);
  
  public readonly experiences = this.portfolioService.getExperiences();
  
  public scrollToContact(): void {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}