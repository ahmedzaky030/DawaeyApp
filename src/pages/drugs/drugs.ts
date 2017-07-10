import { Component, ViewChild } from '@angular/core';

import { DrugsService } from '../../providers/drugs-service';

import 'rxjs/add/operator/map';

import { NavController, AlertController, Content, IonicPage, LoadingController, Loading, Keyboard } from 'ionic-angular';

import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { SplashScreen } from "@ionic-native/splash-screen";

import * as Fuse from 'fuse.js';

@IonicPage({
  name: 'drugs',
  segment: 'drugs'
})
@Component({
  selector: 'page-drugs',
  templateUrl: 'drugs.html'
})
export class DrugsPage {
  drugToSearch;
  isLoading;
  drugsInitial = []; //initialize your drugsInitial array empty
  drugs = []; //initialize your drugs array empty
  searchBy = "tradename";
  @ViewChild(Content) content: Content;



  constructor(public keyboard:Keyboard, public alertCtrl: AlertController, public navCtrl: NavController, private drugsService: DrugsService, private ga: GoogleAnalytics, private splashScreen: SplashScreen, private loadingCtrl: LoadingController) {
    //setInterval(() => this.content.scrollToTop() , 250);
  };

  ionViewDidLoad() {
    this.isLoading = true;
    let loading = this.loading("Loading Drugs...")
    loading.present();
    this.ga.trackView('Main Screen')
    this.drugsService.getDrugs().subscribe(data => {
      setTimeout(() => {
        this.splashScreen.hide();
      }, 500)


      this.drugsInitial = data;
      console.log(this.drugsInitial);
      this.drugs = data;
      loading.dismiss();
      this.isLoading = false;
    })

  }

  openDrug(drug) {
    this.navCtrl.push('drugs-details', {
      id: drug.id,
      drug: drug
    })
  }

  doApproximate() {
    this.isLoading = true;
    let loading = this.loading("Loading Approximate Drugs...")
    loading.present();


    setTimeout(() => {
      this.drugs = this.searchApproximate()
    }, 100);
    setTimeout(() => {
      loading.dismiss();
      this.isLoading = false;
    }, 500);





  }

  searchApproximate() {
    var options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: [
        "tradename",
        "activeingredient"
      ]
    };
    console.log(this.drugsInitial);

    var fuse = new Fuse(this.drugsInitial, options);
    return fuse.search(this.drugToSearch)
  }

  loading(content: string): Loading {
    let loading = this.loadingCtrl.create({
      content: content
    });

    return loading;
  }

  filterDrugs(ev) {
    console.log(ev);

    // Reset drugs back to all of the drugs
    this.drugs = this.drugsInitial;

    //Scroll to top
    this.content.scrollToTop()

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the drugs
    if (val && val.trim() != '') {
      this.drugs = this.drugs.filter((drug) => {
        switch (this.searchBy) {
          case "tradename":
            return (drug.tradename.toLowerCase().indexOf(val.toLowerCase()) > -1);
          case "activeingredient":
            return (drug.activeingredient.toLowerCase().indexOf(val.toLowerCase()) > -1);
          case "maingp":
            return (drug.maingp.toLowerCase().indexOf(val.toLowerCase()) > -1);
          case "company":
            return (drug.company.toLowerCase().indexOf(val.toLowerCase()) > -1);
          case "howmany":
            return drug.howmany == val;
          case "price":
            return drug.price == val;
          default:
            return (drug.tradename.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      })
    }
  }



  showRadio() {
    let alert = this.alertCtrl.create();
    alert.setTitle('Choose to search by ...');

    let choices = [{
      type: 'radio',
      label: 'Tradename',
      value: 'tradename',
      checked: false
    },
    {
      type: 'radio',
      label: 'Activeingredient',
      value: 'activeingredient',
      checked: false
    },
    {
      type: 'radio',
      label: 'Price',
      value: 'price',
      checked: false
    },
    {
      type: 'radio',
      label: 'Category',
      value: 'maingp',
      checked: false
    },
    {
      type: 'radio',
      label: 'Company',
      value: 'company',
      checked: false
    },
    {
      type: 'radio',
      label: 'Drug Form',
      value: 'form',
      checked: false
    },
    {
      type: 'radio',
      label: 'Drug Quantity',
      value: 'howmany',
      checked: false
    }

    ]

    for (let i = 0; i < choices.length; i++) {
      console.log(choices[i].value);
      
      if(choices[i].value === this.searchBy){
        choices[i].checked = true;
        console.log(choices[i].value,choices[i].checked);
        
        alert.addInput(choices[i]);
      }else{
        console.log(choices[i].value,choices[i].checked);
        choices[i].checked = false;
        alert.addInput(choices[i]);
        console.log(choices[i]);
        
      }

      
    }



    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: value => {
        this.searchBy = value;
        console.log(value);

      }
    });
    alert.present();
  }


  closeKeyboard(){
    this.keyboard.close();
  }




}
