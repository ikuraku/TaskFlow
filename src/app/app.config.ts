import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

export const appConfig: ApplicationConfig = {
  providers: [
    // ... tes providers existants (router, etc.)
    { provide: LOCALE_ID, useValue: 'fr' },
  ],
};
