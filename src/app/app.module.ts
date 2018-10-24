import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http'; 
import { MyApp } from './app.component';
import { BidPage } from "../pages/bid/bid";
import { NotificationsPage } from "../pages/notifications/notifications";
import { UploadPage } from "../pages/upload/upload";
import { ImagePicker } from '@ionic-native/image-picker';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { TestProvider } from '../providers/test/test';
import { ProfileProvider } from '../providers/profile/profile';
import { UploadProvider } from '../providers/upload/upload';
import { BidInfoPage } from '../pages/bid-info/bid-info';
import { ReportPage } from "../pages/report/report";
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { ViewOfferPage } from "../pages/view-offer/view-offer";
import { BiddersProfilesPage } from "../pages/bidders-profiles/bidders-profiles";
import { PlacesProvider } from '../providers/places/places';


@NgModule({
  declarations: [
    MyApp,
    BidPage,
    NotificationsPage,
    UploadPage,
    BidInfoPage,
    ReportPage,
    ViewOfferPage,
    BiddersProfilesPage
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    BidPage,
    NotificationsPage,
    UploadPage,
    BidInfoPage,
    ReportPage,
    ViewOfferPage,
    BiddersProfilesPage
   
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    ImagePicker,
    Crop,
    TestProvider,
    File,
    ProfileProvider,
    UploadProvider,
    AndroidPermissions,
    PlacesProvider

  ]
})
export class AppModule {}
