import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MeetpointPage } from './meetpoint';

@NgModule({
  declarations: [
    MeetpointPage,
  ],
  imports: [
    IonicPageModule.forChild(MeetpointPage),
  ],
})
export class MeetpointPageModule {}
