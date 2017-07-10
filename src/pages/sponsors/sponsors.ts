import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';


@IonicPage({
  name:'sponsors',
  segment: 'sponsors'
})
@Component({
  selector: 'page-sponsors',
  templateUrl: 'sponsors.html'
})
export class SponsorsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private ga: GoogleAnalytics) {}

  ionViewDidLoad() {
    this.ga.trackView('Sponsors Screen')
  }

}
