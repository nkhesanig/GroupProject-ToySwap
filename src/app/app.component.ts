import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AndroidPermissions } from '@ionic-native/android-permissions';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "SplashPage";

  constructor(private androidPermissions: AndroidPermissions, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //statusBar.backgroundColorByHexString("#00BCD4");
      statusBar.styleBlackTranslucent();

      this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
        result => {
          console.log('Has permission?',result.hasPermission)
          if(result.hasPermission == false){
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA);
            this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE);
            console.log("asked for camera permission");
            
          }
        },
        err => {
          this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA);
          console.log("error occured : ");
          console.log(err);
          
          
        }
      );

      //this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
            
      splashScreen.hide();
    });
  }
}

