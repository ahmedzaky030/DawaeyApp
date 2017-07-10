import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';


@IonicPage({
  name:'interactions',
  segment: 'interactions'
})
@Component({
  selector: 'page-interactions',
  templateUrl: 'interactions.html'
})
export class InteractionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private ga: GoogleAnalytics) {}

  ionViewDidLoad() {
    this.ga.trackView('Interactions Screen')
  }

}
