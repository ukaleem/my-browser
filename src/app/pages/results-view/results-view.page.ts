import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-results-view',
  templateUrl: './results-view.page.html',
  styleUrls: ['./results-view.page.scss'],
})
export class ResultsViewPage implements OnInit {

  searchText: any;

  constructor(
    private navCtrl: NavController,
    private activatedRoutes: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private iab: InAppBrowser,
    private platform: Platform ) { }
    subscription: any ;

  exitApp() {
  }

  ionVIewDidEnter() {
  }

  ionViewWillLeave() {
  }

  ngOnInit() {
    this.activatedRoutes.params.subscribe(params => {
      this.searchText = params['text'];
      console.log(this.searchText);
      console.log(params['text']);
    });

    this.doSearch();

  }
  doSearch() {
    const loading =  this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Please wait...',
      translucent: true,
    });
    loading.then(mloading => {
      mloading.present();
    });
    const target = '_blank';
    const options: InAppBrowserOptions = {
      hideurlbar: 'no',
      zoom: 'yes'
    };
    // this.iab.create('www.google.com', '_blank');
    const refresnes = this.iab.create(encodeURI('http://' + this.searchText), target , options);
    refresnes.show();
    loading.then(mloading => {
      mloading.dismiss();
    });
  }
  goback() {
    this.navCtrl.pop();
  }

}
