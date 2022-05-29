import packageInfo from '~package';
import { ModuleWithProviders } from '@angular/core';
import { UohPayModule, UohPayMockModule } from '@haifauniversity/ngx-pay';
import { UohLoggerModule, UohLogLevel, UohRequestModule } from '@haifauniversity/ngx-tools';

export interface Environment {
  production: boolean;
  version: string;
  packageName: string;
  locale: string;
  foreignLocale: string;
  languages: string[],
  authMethod: 'SSO' | 'CAPTCHA';
  reCaptchaSiteKey?: string;
  ovevrridePayTerminal?: string;
  loggerModule: ModuleWithProviders<UohLoggerModule>;
  requestModule: ModuleWithProviders<UohRequestModule>;
  payModule: ModuleWithProviders<UohPayModule | UohPayMockModule>;
}

export const environment: Environment = {
  production: false,
  version: packageInfo.version,
  packageName: packageInfo.name,
  locale: 'he',
  foreignLocale: 'en',
  languages: [ 'he', 'en' ],
  authMethod: 'SSO',
  reCaptchaSiteKey: '6Le059sbAAAAAM2Gmg5350jGOstJcSFdYEGfhMHi',
  requestModule: UohRequestModule.forRoot(),
  loggerModule: UohLoggerModule.forRoot('/api/logs', UohLogLevel.DEBUG),
  payModule: UohPayMockModule.forRoot({ api: '/paymentService/api' }),
};
