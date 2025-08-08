import { Directive, ElementRef, OnInit, OnDestroy, inject } from '@angular/core';
import { AnimationService } from '../services/animation.service';

@Directive({
  selector: '[appAnimateOnScroll]'
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly animationService = inject(AnimationService);
  
  ngOnInit(): void {
    if (!this.animationService.areAnimationsEnabled()) {
      this.elementRef.nativeElement.classList.add('visible');
      return;
    }
    
    this.elementRef.nativeElement.classList.add('animate-on-scroll');
    
    this.animationService.observeElement(this.elementRef, (isVisible) => {
      if (isVisible) {
        this.elementRef.nativeElement.classList.add('visible');
      }
    });
  }
  
  ngOnDestroy(): void {
    this.animationService.unobserveElement(this.elementRef);
  }
}