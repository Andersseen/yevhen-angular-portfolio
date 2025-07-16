import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PortfolioService } from '../../core/services/portfolio.service';
import { AnimateOnScrollDirective } from '../../core/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, AnimateOnScrollDirective],
  template: `
    <section id="contact" class="py-20 bg-secondary-50 dark:bg-secondary-800">
      <div class="container-max section-padding">
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-16" appAnimateOnScroll>
            <h2 class="text-4xl font-bold text-secondary-900 dark:text-white mb-4">
              {{ 'contact.title' | translate }}
            </h2>
            <p class="text-xl text-secondary-600 dark:text-secondary-400">
              {{ 'contact.subtitle' | translate }}
            </p>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <!-- Contact Info -->
            <div appAnimateOnScroll>
              <h3 class="text-2xl font-semibold text-secondary-900 dark:text-white mb-6">
                {{ 'contact.getInTouch' | translate }}
              </h3>
              
              <div class="space-y-6">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                    <svg class="w-5 h-5 text-primary-600 dark:text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-secondary-900 dark:text-white">{{ 'contact.email' | translate }}</p>
                    <a [href]="'mailto:' + personalInfo.email" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                      {{ personalInfo.email }}
                    </a>
                  </div>
                </div>
                
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-900 flex items-center justify-center">
                    <svg class="w-5 h-5 text-accent-600 dark:text-accent-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-secondary-900 dark:text-white">{{ 'contact.phone' | translate }}</p>
                    <a [href]="'tel:' + personalInfo.phone" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                      {{ personalInfo.phone }}
                    </a>
                  </div>
                </div>
                
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-lg bg-success-100 dark:bg-success-900 flex items-center justify-center">
                    <svg class="w-5 h-5 text-success-600 dark:text-success-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p class="font-medium text-secondary-900 dark:text-white">{{ 'contact.location' | translate }}</p>
                    <p class="text-secondary-600 dark:text-secondary-400">{{ personalInfo.location }}</p>
                  </div>
                </div>
              </div>
              
              <div class="mt-8">
                <h4 class="font-semibold text-secondary-900 dark:text-white mb-4">
                  {{ 'contact.followMe' | translate }}
                </h4>
                <div class="flex gap-4">
                  <a
                    [href]="personalInfo.linkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-10 h-10 rounded-lg bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors duration-200"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                    </svg>
                  </a>
                  
                  <a
                    [href]="personalInfo.github"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="w-10 h-10 rounded-lg bg-accent-100 dark:bg-accent-900 flex items-center justify-center text-accent-600 dark:text-accent-400 hover:bg-accent-200 dark:hover:bg-accent-800 transition-colors duration-200"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <!-- Contact Form -->
            <div appAnimateOnScroll>
              <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="space-y-6">
                <div>
                  <label for="name" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    {{ 'contact.form.name' | translate }}
                  </label>
                  <input
                    type="text"
                    id="name"
                    formControlName="name"
                    class="input"
                    [class.border-error-500]="isFieldInvalid('name')"
                    [placeholder]="'contact.form.namePlaceholder' | translate"
                  />
                  <div *ngIf="isFieldInvalid('name')" class="mt-1 text-sm text-error-600 dark:text-error-400">
                    {{ 'contact.form.nameRequired' | translate }}
                  </div>
                </div>
                
                <div>
                  <label for="email" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    {{ 'contact.form.email' | translate }}
                  </label>
                  <input
                    type="email"
                    id="email"
                    formControlName="email"
                    class="input"
                    [class.border-error-500]="isFieldInvalid('email')"
                    [placeholder]="'contact.form.emailPlaceholder' | translate"
                  />
                  <div *ngIf="isFieldInvalid('email')" class="mt-1 text-sm text-error-600 dark:text-error-400">
                    {{ 'contact.form.emailInvalid' | translate }}
                  </div>
                </div>
                
                <div>
                  <label for="subject" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    {{ 'contact.form.subject' | translate }}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    formControlName="subject"
                    class="input"
                    [class.border-error-500]="isFieldInvalid('subject')"
                    [placeholder]="'contact.form.subjectPlaceholder' | translate"
                  />
                  <div *ngIf="isFieldInvalid('subject')" class="mt-1 text-sm text-error-600 dark:text-error-400">
                    {{ 'contact.form.subjectRequired' | translate }}
                  </div>
                </div>
                
                <div>
                  <label for="message" class="block text-sm font-medium text-secondary-700 dark:text-secondary-300 mb-2">
                    {{ 'contact.form.message' | translate }}
                  </label>
                  <textarea
                    id="message"
                    formControlName="message"
                    rows="6"
                    class="input"
                    [class.border-error-500]="isFieldInvalid('message')"
                    [placeholder]="'contact.form.messagePlaceholder' | translate"
                  ></textarea>
                  <div *ngIf="isFieldInvalid('message')" class="mt-1 text-sm text-error-600 dark:text-error-400">
                    {{ 'contact.form.messageRequired' | translate }}
                  </div>
                </div>
                
                <button
                  type="submit"
                  [disabled]="contactForm.invalid || isSubmitting"
                  class="btn btn-primary w-full"
                  [class.opacity-50]="contactForm.invalid || isSubmitting"
                >
                  <svg *ngIf="isSubmitting" class="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {{ isSubmitting ? ('contact.form.sending' | translate) : ('contact.form.send' | translate) }}
                </button>
              </form>
              
              <div
                *ngIf="submitMessage"
                class="mt-6 p-4 rounded-lg"
                [class.bg-success-50]="submitSuccess"
                [class.text-success-800]="submitSuccess"
                [class.bg-error-50]="!submitSuccess"
                [class.text-error-800]="!submitSuccess"
                [class.border-success-200]="submitSuccess"
                [class.border-error-200]="!submitSuccess"
                [class.dark:bg-success-900]="submitSuccess"
                [class.dark:text-success-200]="submitSuccess"
                [class.dark:bg-error-900]="!submitSuccess"
                [class.dark:text-error-200]="!submitSuccess"
                [class.dark:border-success-800]="submitSuccess"
                [class.dark:border-error-800]="!submitSuccess"
              >
                {{ submitMessage }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {
  private readonly portfolioService = inject(PortfolioService);
  private readonly formBuilder = inject(FormBuilder);
  
  public readonly personalInfo = this.portfolioService.getPersonalInfo();
  
  public contactForm: FormGroup;
  public isSubmitting = false;
  public submitMessage = '';
  public submitSuccess = false;
  
  constructor() {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }
  
  public isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }
  
  public onSubmit(): void {
    if (this.contactForm.invalid) {
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
      return;
    }
    
    this.isSubmitting = true;
    this.submitMessage = '';
    
    this.portfolioService.submitContactForm(this.contactForm.value).subscribe({
      next: (response) => {
        this.submitSuccess = response.success;
        this.submitMessage = response.message;
        this.isSubmitting = false;
        
        if (response.success) {
          this.contactForm.reset();
        }
      },
      error: () => {
        this.submitSuccess = false;
        this.submitMessage = 'An error occurred. Please try again later.';
        this.isSubmitting = false;
      }
    });
  }
}