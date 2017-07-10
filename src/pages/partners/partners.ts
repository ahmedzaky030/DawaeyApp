import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { GoogleAnalytics } from '@ionic-native/google-analytics';

@IonicPage({
  name:'partners',
  segment: 'partners'
})
@Component({
  selector: 'page-partners',
  templateUrl: 'partners.html'
})
export class PartnersPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private ga: GoogleAnalytics) {}

  ionViewDidLoad() {
    this.ga.trackView('Parteners Screen')
  }

}
