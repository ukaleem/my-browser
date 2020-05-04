import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-view',
  templateUrl: './popover-view.component.html',
  styleUrls: ['./popover-view.component.scss'],
})
export class PopoverViewComponent implements OnInit {
  url: any;
  urlName: any;

  constructor(private popOverController: PopoverController) { }

  ngOnInit() {}

  closePopover() {
    this.popOverController.dismiss();
  }
  saveUrl() {
    const urlArray = {
        url: this.url ,
        image: 'https://i7.pngguru.com/preview/203/717/254/social-science-global-perspectives-social-media-world-business-social-media.jpg',
        name: this.urlName
    };
    console.log('form functioin is called...');
    this.popOverController.dismiss(urlArray, 'saved array');
    console.log(urlArray);
  }


}
