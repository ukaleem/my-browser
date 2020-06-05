import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  showSplash = true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private navController: NavController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // window.open = cordova.InAppBrowser.open;
      // this.deeplinks.routeWithNavController(this.navController, {
      //   '/': HomePage,
      // }).subscribe(match => {
      //     // match.$route - the route we matched, which is the matched entry from the arguments to route()
      //     // match.$args - the args passed in the link
      //     // match.$link - the full link data
      //     console.log('Successfully matched route', match);
      //   }, nomatch => {
      //     // nomatch.$link - the full link data
      //     console.error('Got a deeplink that didn\'t match', nomatch);
      //   });
      this.statusBar.styleLightContent();
      this.splashScreen.hide();
      // this.showSplash = false;
      timer(5000).subscribe(() => this.showSplash = false);
    });
  }
}
