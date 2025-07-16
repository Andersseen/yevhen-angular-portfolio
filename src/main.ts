import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { appConfig } from './app/app.config';
import { HeaderComponent } from './app/layouts/header/header.component';
import { FooterComponent } from './app/layouts/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule, HeaderComponent, FooterComponent],
  template: `
    <div class="min-h-screen bg-white text-black">
      <app-header></app-header>
      <router-outlet></router-outlet>
      <app-footer></app-footer>
    </div>
  `,
})
export class App {
  title = 'Yevhen Letin - .NET Backend Developer';
}

bootstrapApplication(App, appConfig);
