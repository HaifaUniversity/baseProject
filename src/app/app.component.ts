import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UohHeaderUser } from '@uoh/ngx-theme';
import { UohPay } from '@haifauniversity/ngx-pay';
import { UohLogger, UohPlatform } from '@haifauniversity/ngx-tools';
import { Direction } from '@angular/cdk/bidi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  direction: Direction = 'rtl';
  private subscription = new Subscription();

  constructor (
  ) {
  }


  ngOnInit () {

  }
}
