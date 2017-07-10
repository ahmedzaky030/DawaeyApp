import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrugDetails } from './drug-details';

@NgModule({
  declarations: [
    DrugDetails,
  ],
  imports: [
    IonicPageModule.forChild(DrugDetails),
  ],
  exports: [
    DrugDetails
  ]
})
export class DrugDetailsModule {}
