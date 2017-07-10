import { BrowserModule } from '@angular/platform-browser';

import { HttpModule } from '@angular/http';

import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { DrugsService } from '../providers/drugs-service'

import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { OneSignal } from '@ionic-native/onesignal';

import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '8600d6dc'
  }
};



@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    CloudModule.forRoot(cloudSettings)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    DrugsService,
    StatusBar,
    SplashScreen,
    GoogleAnalytics,
    OneSignal,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
