import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BidInfoPage } from './bid-info';

@NgModule({
  declarations: [
    BidInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(BidInfoPage),
  ],
})
export class BidInfoPageModule {}
