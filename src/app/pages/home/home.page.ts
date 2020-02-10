import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController, Platform, AlertController, LoadingController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  users: any;
  httpErrorCheck = false;
  httpErrorMsg: any;

  constructor(public navCtrl: NavController,
              private httpClient: HttpClient,
              private plt: Platform,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController) {
              this.loadBasicData();
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
}
