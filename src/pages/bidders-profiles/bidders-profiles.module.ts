import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BiddersProfilesPage } from './bidders-profiles';

@NgModule({
  declarations: [
    BiddersProfilesPage,
  ],
  imports: [
    IonicPageModule.forChild(BiddersProfilesPage),
  ],
})
export class BiddersProfilesPageModule {}
