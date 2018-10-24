import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Offer } from '../../model/offer';
import { Item } from '../../model/item';
import { User } from '../../model/user';
import { BidManager } from '../../model/bidManager';
import { Bid } from '../../model/bid';
import { ProfileProvider } from '../../providers/profile/profile';

/**
 * Generated class for the ViewOfferPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-offer',
  templateUrl: 'view-offer.html',
})
export class ViewOfferPage {

  offerObj: Offer;
  offerItem = [];
  offeritemsFormatted = [];// ngModel bind
  offerItemObj: Item;
  offerOwner: User;
  profilePic;
  ownerName;// ngModel bind
  itemname; // ngModel bind
  itemDescription;// ngModel bind
  bid:Bid;
  bidOwner:User;

  constructor(public navCtrl: NavController, public navParams: NavParams,public profile: ProfileProvider) {
    console.log(navParams.get('item'));
    this.bid = new Bid(navParams.get('bid'));
    console.log(this.bid.getBidId());
    console.log(profile.user.getUserName());
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad ViewOfferPage');
    this.offerObj = new Offer(this.navParams.get('item'));
    console.log(this.offerObj);
    this.offerOwner = new User(this.offerObj.getOwner());
    console.log(this.offerOwner);
    this.ownerName = this.offerOwner.getUserName() + " "+ this.offerOwner.getSurname();
    this.profilePic = this.offerOwner.getProfilePic();
    this.offerItem = this.offerObj.getItems();``
    console.log(this.offerItem[0]);
    this.offerItemObj = new Item(this.offerItem[0]);
    this.itemname = this.offerItemObj.getName();
    this.itemDescription = this.offerItemObj.getDescription();
    console.log(this.offerItemObj);
    this.offeritemsFormatted = this.offerItemObj.getImageUri();
    console.log(this.offeritemsFormatted);
  }
  acceptBid(){
    var bidFactory = new BidManager();
    bidFactory.writeUserSuccessfullBids(this.bid);
    console.log(this.bid.getBidId());
    bidFactory.removePlacedBid(this.bid.getBidId());
    bidFactory.removeUserPlacedBid(this.profile.user.getUid(),this.bid.getBidId());
    this.navCtrl.push("MeetpointPage");
  }
  rejectBid(){
    var bidFactory = new BidManager();
    bidFactory.removeBidOffer(this.bid.getBidId(), this.offerObj.getOfferId());
    bidFactory.writeUserRejectedOffer(this.offerObj,this.offerOwner.getUid());
  }

  close(){
    this.navCtrl.pop();
  }

}
