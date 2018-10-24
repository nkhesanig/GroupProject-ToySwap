import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Bid } from '../../model/bid';
import { User } from '../../model/user';

/**
 * Generated class for the BiddersProfilesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bidders-profiles',
  templateUrl: 'bidders-profiles.html',
})
export class BiddersProfilesPage {

  bid: Bid;
  profileOwner:User;
  userName;
  profilePic;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    console.log(navParams.get('item'));
    this.bid = new Bid(navParams.get('item').bid);
    console.log(this.bid);
    this.profileOwner = new User(this.bid.getOwner());
    console.log(this.profileOwner);
    this.profilePic = this.profileOwner.getProfilePic();
    console.log(this.profilePic);
            this.userName = this.profileOwner.getUserName() + " " + this.profileOwner.getSurname();

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad BiddersProfilesPage');
 
   
    console.log(this.profileOwner);
 


  }

}
