import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InteractionsPage } from "./interactions";

@NgModule({
  declarations: [
    InteractionsPage,
  ],
  imports: [
    IonicPageModule.forChild(InteractionsPage),
  ],
  exports: [
    InteractionsPage
  ]
})
export class InteractionsPageModule {}
