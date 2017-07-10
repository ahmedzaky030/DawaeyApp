import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';

import { DrugsService } from '../../providers/drugs-service';

import { GoogleAnalytics } from '@ionic-native/google-analytics';

@IonicPage({
  name: 'drugs-details',
  segment: 'drugs/:id',
  defaultHistory: ['drugs']
})
@Component({
  selector: 'page-drug-details',
  templateUrl: 'drug-details.html'
})
export class DrugDetails {
  id;
  drug: any;
  similars = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private drugsService: DrugsService, private ga: GoogleAnalytics) {
    let currentId = navParams.get("id");
    console.log(navParams.get("id"),typeof navParams.get("drug"));
    
    if (navParams.get("drug") == undefined) {
      this.drugsService.getDrugs()
        .subscribe(drugs => {
          for (let i = 0; i < drugs.length; i++) {
            if (drugs[i].id == currentId) {
              this.drug = drugs[i];
            }
          }
        });


    } else {
      this.drug = navParams.get("drug");
    }


    let currentDrugAI;
    this.drugsService.getDrugs()
      .subscribe(drugs => {

        for (let i = 0; i < drugs.length; i++) {
          if (drugs[i].id == currentId) {
            this.ga.trackView(drugs[i].tradename)
            currentDrugAI = drugs[i].activeingredient;
          }
        }
        for (let i = 0; i < drugs.length; i++) {
          if (drugs[i].activeingredient === currentDrugAI) {
            console.log(drugs[i]);

            let obj = drugs[i]
            this.similars.push(obj)
          }
        }
        

      });
  }

  openDrug(drug) {
    this.navCtrl.push('drugs-details', {
      id: drug.id,
      drug: drug
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DrugDetails');
  }

}
