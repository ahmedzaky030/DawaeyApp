import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PartnersPage } from "./partners";

@NgModule({
  declarations: [
    PartnersPage,
  ],
  imports: [
    IonicPageModule.forChild(PartnersPage),
  ],
  exports: [
    PartnersPage
  ]
})
export class PartnersPageModule {}
