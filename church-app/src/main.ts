import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbInputModule, NbCardModule, NbListModule } from '@nebular/theme';
import { importProvidersFrom } from '@angular/core';  

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    importProvidersFrom(
      NbThemeModule.forRoot({ name: 'default' }),  
      NbLayoutModule,
      NbButtonModule,
      NbInputModule,
      NbCardModule,
      NbListModule
    ),
  ]
}).catch(err => console.error(err));
