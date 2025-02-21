import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideServerRendering } from '@angular/platform-server';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbInputModule, NbCardModule, NbListModule } from '@nebular/theme';
import { importProvidersFrom } from '@angular/core';

export default function bootstrap() {
  return bootstrapApplication(AppComponent, {
    providers: [
      provideServerRendering(),
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
    ],
  });
}
