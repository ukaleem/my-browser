import { Component, OnInit } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  options: InAppBrowserOptions;
  users: any;
  httpErrorCheck = false;
  httpErrorMsg: any;
  urlSearchtext: any;

  constructor(public navCtrl: NavController,
              private httpClient: HttpClient,
              private plt: Platform,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private iab: InAppBrowser,
              private screen: ScreenOrientation,
              private router: Router) {
              this.loadBasicData();
              // access current orientation
              console.log('Orientation is ' + this.screen.ORIENTATIONS.ANY);

  }
  // ionViewWillEnter() {
  //   this.screenOrientation();
  // }

  screenOrientation() {
    let alert =  this.alertCtrl.create({
      message: 'Display Screen is : ' + this.screen.type,
      buttons: ['OK']
    });
    alert.then(malert => { malert.present(); } );
  }
  loadBasicData() {
    const loading =  this.loadingCtrl.create({
      spinner: 'bubbles',
      message: 'Please wait...',
      translucent: true,
    });
    loading.then(mloading => {
      mloading.present();
    });
    this.httpClient.get('https://randomuser.me/api/?results=20').subscribe(res => {
      console.log(res);
      this.httpErrorCheck = false;
      this.users =  res['results'];
      loading.then(ld => {
        ld.dismiss();
      });
    }, (error: HttpErrorResponse) => {
      loading.then(ld => {
        ld.dismiss();
      });
      this.httpErrorCheck = true;
      this.httpErrorMsg = error.message + ' Please Check your internet Connection!';
      console.log('HttpErrorResponse = ' + error.message + error.error);
    });
  }
  reload() {
    this.loadBasicData();
  }
  ngOnInit() {
    if(this.screen.onChange) {
      this.screenOrientation();
    }
  }
  nfOnChange() {
    this.screenOrientation();
  }
  async checkPlatform() {
    let alert = await this.alertCtrl.create({
      message: 'You are running on: ' + this.plt.platforms(),
      buttons: ['OK']
    });
    alert.present();
    if (this.plt.is('cordova')) {
      console.log(this.plt.platforms());
      // Do Cordova stuff
    } else {
      console.log(this.plt.platforms());
      // Do stuff inside the regular browser
    }
  }
  doSearch() {
    this.navCtrl.navigateForward('results-view');
    this.router.navigate(['/results-view', this.urlSearchtext]);
  }

  go(url) {
    const target = '_self';
    this.options = {
      zoom: 'yes'
    };
    // const options = 'location=yes,hidden=yes,beforeload=yes';
    // this.iab.create('www.google.com', '_blank');
    const refresnes = this.iab.create('http://' + url , '_blank' , this.options);
  }
}
