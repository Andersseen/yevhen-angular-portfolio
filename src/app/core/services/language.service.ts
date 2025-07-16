import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

export type SupportedLanguage = 'en' | 'es' | 'ua';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly storageKey = 'language-preference';
  
  public readonly currentLanguage = signal<SupportedLanguage>('en');
  public readonly supportedLanguages: SupportedLanguage[] = environment.supportedLanguages as SupportedLanguage[];
  
  constructor(private translate: TranslateService) {
    this.setupTranslateService();
    if (isPlatformBrowser(this.platformId)) {
      this.initializeLanguage();
    }
  }
  
  private setupTranslateService(): void {
    this.translate.setDefaultLang(environment.defaultLanguage);
    this.translate.addLangs(environment.supportedLanguages);
  }
  
  private initializeLanguage(): void {
    const savedLanguage = localStorage.getItem(this.storageKey) as SupportedLanguage;
    const browserLanguage = this.getBrowserLanguage();
    
    const initialLanguage = savedLanguage || browserLanguage || environment.defaultLanguage as SupportedLanguage;
    this.setLanguage(initialLanguage);
  }
  
  private getBrowserLanguage(): SupportedLanguage | null {
    if (!isPlatformBrowser(this.platformId)) return null;
    
    const browserLang = navigator.language.split('-')[0];
    return this.supportedLanguages.includes(browserLang as SupportedLanguage) 
      ? browserLang as SupportedLanguage 
      : null;
  }
  
  public setLanguage(language: SupportedLanguage): void {
    if (!this.supportedLanguages.includes(language)) {
      console.warn(`Language ${language} is not supported`);
      return;
    }
    
    this.currentLanguage.set(language);
    this.translate.use(language);
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.storageKey, language);
      document.documentElement.lang = language;
    }
  }
  
  public getLanguageLabel(language: SupportedLanguage): string {
    const labels = {
      'en': 'English',
      'es': 'Español',
      'ua': 'Українська'
    };
    return labels[language];
  }
  
  public getCurrentLanguage(): SupportedLanguage {
    return this.currentLanguage();
  }
}