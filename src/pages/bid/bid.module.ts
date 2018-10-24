import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BidPage } from './bid';

@NgModule({
  declarations: [
    BidPage,
  ],
  imports: [
    IonicPageModule.forChild(BidPage),
  ],
})
export class BidPageModule {}
