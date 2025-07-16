import { Injectable, ElementRef, signal } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { throttleTime, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {
  private readonly animationsEnabled = signal(true);
  private readonly observedElements = new WeakMap<Element, IntersectionObserver>();
  
  constructor() {
    this.checkReducedMotionPreference();
  }
  
  private checkReducedMotionPreference(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.animationsEnabled.set(!mediaQuery.matches);
      
      mediaQuery.addEventListener('change', (e) => {
        this.animationsEnabled.set(!e.matches);
      });
    }
  }
  
  public areAnimationsEnabled(): boolean {
    return this.animationsEnabled();
  }
  
  public observeElement(element: ElementRef<HTMLElement>, callback: (isVisible: boolean) => void): void {
    if (!this.animationsEnabled() || !element.nativeElement) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          callback(entry.isIntersecting);
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
      }
    );
    
    observer.observe(element.nativeElement);
    this.observedElements.set(element.nativeElement, observer);
  }
  
  public unobserveElement(element: ElementRef<HTMLElement>): void {
    if (!element.nativeElement) return;
    
    const observer = this.observedElements.get(element.nativeElement);
    if (observer) {
      observer.disconnect();
      this.observedElements.delete(element.nativeElement);
    }
  }
  
  public createScrollObservable(): Observable<number> {
    return fromEvent(window, 'scroll').pipe(
      throttleTime(16), // ~60fps
      map(() => window.scrollY)
    );
  }
  
  public smoothScrollTo(element: Element | string, offset: number = 0): void {
    const targetElement = typeof element === 'string' 
      ? document.querySelector(element) 
      : element;
    
    if (!targetElement) return;
    
    const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}