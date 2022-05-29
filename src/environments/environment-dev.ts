import { UohRequestModule } from '@haifauniversity/ngx-tools';
import { environment as defaults, Environment } from './environment.defaults';

export const environment: Environment = {
  ...defaults,
  production: false
};
