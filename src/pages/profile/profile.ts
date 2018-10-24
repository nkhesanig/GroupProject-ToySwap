import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { User } from '../../model/user';
import { UploadPage } from "../upload/upload";
import { BidManager } from '../../model/bidManager';
import { Bid } from '../../model/bid';
import { Item } from '../../model/item';
import { BidInfoPage } from '../../pages/bid-info/bid-info';
declare var firebase;


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {


  user: User;
  profilePhoto;
  username;
  email;
  gender;
  surname;
  userType;
  h = [];
  datalist: Bid[] = [];
  description;
  itemImgUrl;
  itemName;
  items = [];
  itemProfileImg = [];
  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public navParams: NavParams, public profile: ProfileProvider) {

  }
  ionViewDidLoad() {
    var d: Bid[] = [];

    if (this.profile.user != null) {
      this.username = this.profile.user.getUserName();
      this.email = this.profile.user.getEmail();
      this.surname = this.profile.user.getUid();
      this.profilePhoto = this.profile.user.getProfilePic();
      this.userType = this.profile.user.getType();
      
      firebase.database().ref('/userBids/' + this.profile.user.getUid()).on('value', (snapshot) => {

        snapshot.forEach(snap => {
  
          var bid = new Bid(snap.val().bid);
          this.h.push(bid);
          this.items.push(bid.getMerchandise());
          var itemObj = new Item(bid.getMerchandise());
          this.itemProfileImg = itemObj.getImageUri();
        });
      });

      this.user = new User(null);
      this.user.setUserName(this.username);
      this.user.setEmail(this.email);

      if (this.user != null && this.user instanceof User) {
        console.log("user is instance of user object");
      }

    } else {
      console.log("profile provider object is null, Reload the app");
    }
  }
  userBidClick(obj) {
    console.log(obj);
    const modal = this.modalCtrl.create(BidInfoPage, {
      item: obj,
    });
    modal.present();
  }
  addItem() {
    const modal = this.modalCtrl.create(UploadPage);
    modal.present();

  }
  addUserItem() {
    this.navCtrl.push('AddUserItemPage');
  }

  signOut() {
    firebase.auth().signOut().then(resp => {
      this.navCtrl.setRoot("HomePage");
    }).catch(error => {
      // An error happened.
      console.log(error);

    });
  }

  dash(){
    this.navCtrl.setRoot("DashboardPage");
  }
}
