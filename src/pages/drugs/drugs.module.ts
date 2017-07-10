import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrugsPage } from './drugs';

@NgModule({
  declarations: [
    DrugsPage,
  ],
  imports: [
    IonicPageModule.forChild(DrugsPage),
  ],
  exports: [
    DrugsPage
  ]
})
export class MainModule {}
