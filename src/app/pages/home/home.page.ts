import { Component, OnInit } from '@angular/core';
import { NavController, Platform, AlertController, LoadingController, PopoverController } from '@ionic/angular';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Router } from '@angular/router';
import { PopoverViewComponent } from '../popover-view/popover-view.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  subscription: any;
  options: InAppBrowserOptions;
  urlSearchtext: any;
  loadingMode = false;
  displayAtonces = false;

  savedUrls = [
    {
      url: 'https://www.google.com/',
      // tslint:disable-next-line: max-line-length
      image: '../../../assets/images/kisspng-google-logo-google-search-google-doodle-circular-economy-5b2082fe6d9843.2262246515288573424489.png',
      name: 'Google'
    },
    {
      url: 'https://web.facebook.com/?_rdc=1&_rdr',
      image: '../../../assets/images/1789596.png',
      name: 'Facebook'
    },
    {
      url: 'https://www.youtube.com/',
      image: '../../../assets/images/transparent-youtube-play-button-20.png',
      name: 'Youtube'
    },
    {
      url: 'https://twitter.com',
      image: '../../../assets/images/27-273507_twitter-round-logo-transparent-clipart-computer-icons-circle.png',
      name: 'twitter'
    },
  ];

  constructor(public navCtrl: NavController,
              private httpClient: HttpClient,
              private plt: Platform,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private iab: InAppBrowser,
              private screen: ScreenOrientation,
              private router: Router,
              private popOverController: PopoverController) {
              // access current orientation
              console.log('Orientation is ' + this.screen.ORIENTATIONS.ANY);
  }

  ionViewWillEnter() {
    this.screen.onChange().subscribe(() => {
      console.log('screen orientation cahnged!!');
      if (this.displayAtonces=== false) {
        this.screenOrientation();
        this.displayAtonces = true;
      }
    });
  }

  screenOrientation() {
    const alert =  this.alertCtrl.create({
      message: 'Display Screen : ' + this.screen.type + ' is Activated!',
      buttons: ['OK']
    });
    alert.then(malert => { malert.present(); } );
  }

  ngOnInit() {
  }

  async addNewUrl() {
    await this.popOverController.create({
      component: PopoverViewComponent,
      cssClass: 'popoverCss',
      translucent: true,
      componentProps: {
        pos: ''
      },
      showBackdrop: false,
    }).then((popoverElement) => {
      popoverElement.present();
      return popoverElement.onDidDismiss();
    }).then(responeData => {
      console.log(responeData);
      console.log('url array = ', responeData.data);
      if (responeData.data) {
        this.savedUrls.push(responeData.data);
      }
    }) ;

  }

  async checkPlatform() {
    const alert = await this.alertCtrl.create({
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

  validURL(url) {
    if (url.indexOf('https://') === -1 && url.indexOf('http://') === -1) {
        url = 'http://' + url;
    }
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name and extension
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?' + // port
      '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
      '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    if (!pattern.test(url)) {
        console.log('Invalid URL: ' + url);
        const alert =  this.alertCtrl.create({
          message: 'Please enter a valid url. ',
          buttons: [
              {
                  text: 'Ok',
                  role: 'cancel',
                  handler: () => {
                      console.log('Cancel clicked');
                  }
              }
          ]
      }).then(mAlert => {
        mAlert.present();
      });
        return false;
    } else {
        return url;
    }
  }

  isValidUrl(stringUrl) {
    let url;
    try {
      url = new URL(stringUrl);
      console.log(url.protocol);
      console.log(url.hostname);
      console.log(url.origin);
    } catch (_) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  doSearch() {
    const result = this.validURL(this.urlSearchtext);
    // this.isValidUrl(this.urlSearchtext);
    console.log(result);
    // return;
    this.loadingMode = true;
    const target = '_self';
    this.options = {
      zoom: 'yes',
      location: 'yes',
      clearcache: 'yes',
      clearsessioncache: 'yes',
      hardwareback: 'yes',
      toolbar: 'yes',
      closebuttoncaption: 'DONE?'
    };
    const browser = this.iab.create(
      encodeURI(result), '_blank' , this.options);
    this.loadingMode = false;

    // this.navCtrl.navigateForward('results-view');
    // this.router.navigate(['/results-view', this.urlSearchtext]);
  }

  ionViewDidEnter() {
}

  go(url) {
    const result = this.validURL(url);
    console.log(result);
    this.loadingMode = true;
    const target = '_self';
    this.options = {
      zoom: 'yes'
    };
    // const options = 'location=yes,hidden=yes,beforeload=yes';
    // this.iab.create('www.google.com', '_blank');
    const refresnes = this.iab.create(encodeURI(url) , '_blank' , this.options);
    this.loadingMode = false;
  }

  exit() {
    this.presentConfirm();
  }

  async presentConfirm() {
    const alert = await this.alertCtrl.create({
        header: 'Confirm',
        message: 'Do you want to exit?',
        buttons: [
            {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            },
            {
                text: 'Yes',
                handler: () => {
                    console.log('Yes clicked');
                    this.subscription = this.plt.backButton.subscribeWithPriority(666666 , () => {
                      if (this.constructor.name === 'HomePage') {
                        if (window.confirm('Are you sure')) {
                        navigator['app'].exitApp();
                        }
                      }
                      console.log(navigator);
                    });
                    console.log('subscription variable is', this.subscription);
                }
            }
        ]
    });
    alert.present().then(() => {
    });
}

}
