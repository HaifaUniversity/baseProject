import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UohPlatformModule } from '@haifauniversity/ngx-tools';
import { environment } from '~environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  UohAccessibilityModule,
  UohHeaderModule,
  UohBackToTopModule,
  UohFooterModule,
  UohSpinnerModule,
  UohCardModule,
} from '@uoh/ngx-theme';

@NgModule({
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UohPlatformModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    //Uoh modules
    UohAccessibilityModule,
    UohHeaderModule,
    UohBackToTopModule,
    UohFooterModule,
    UohSpinnerModule,
    UohCardModule,
  ],
  providers: [
   // {
     // provide: HTTP_INTERCEPTORS,
     // useClass: SpinnerInterceptor,
     // multi: true
   // },
   // {
   /*    provide: HTTP_INTERCEPTORS,
      useClass: CaptchaInterceptor,
      multi: true
    } */
  ]
})
export class AppModule { }
