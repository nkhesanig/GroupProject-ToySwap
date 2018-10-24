import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Bid } from '../../model/bid';
import { ProfileProvider } from '../../providers/profile/profile';
import { Offer } from '../../model/offer';
import { Item } from '../../model/item';
import { BidManager } from '../../model/bidManager';
import { User } from '../../model/user';
import { ViewOfferPage } from "../view-offer/view-offer";
declare var firebase

@IonicPage()
@Component({
  selector: 'page-bid-info',
  templateUrl: 'bid-info.html',
})
export class BidInfoPage {

  bidInfo: any;
  bid: Bid;
  offersObjArr = [];
  offerOwnersArr;
  itemImageUri = [];
  itemObjects = [];
  merchandise: Item;
  offerOwner: User;
  ownerName;
  ownerProfilePic;
  itemName;
  itemType;
  bidDate;
  itemDescription;
  offerObj;
  views;
  formattedDate;
  offerMechandisesArr;
  offerSize;
  

  // consumedData;
  constructor(public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams, public profile: ProfileProvider) {
    console.log(navParams.get('item'));
    this.bidInfo = navParams.get('item');
    this.bid = new Bid(this.bidInfo);
    console.log(this.bidInfo);
    this.merchandise = new Item(this.bid.getMerchandise());
    this.itemImageUri = this.merchandise.getImageUri();
    this.offerOwner = new User(this.bid.getOwner());
    this.ownerName = this.offerOwner.getUserName();
    this.ownerProfilePic = this.offerOwner.getProfilePic();
    this.itemName = this.merchandise.getName();
    this.itemType = this.merchandise.getType();
    this.itemDescription = this.merchandise.getDescription();
    this.views = this.bid.getViews();
    this.bidDate = this.bid.getBidDate();
    this.formattedDate = new Date(this.bidDate);
    this.formattedDate.toString("MMM dd YYYY");

    var count = 0;
    var bidFactory = new BidManager();
    var items;
    var offerOwners;
    var offerMechandises;
    bidFactory.readBidOffersById(this.bid.getBidId(), function (consumedData,ownerArr,offerMechandiseArr) {
      console.log(consumedData);
      // this.offersObjArr = consumedData;
      items = [];
      items = consumedData;
      offerOwners = ownerArr;
      offerMechandises = offerMechandiseArr;

      count++;
      
    });
    this.offersObjArr = items;
    this.offerOwnersArr = offerOwners;
    this.offerObj = new Offer(items);
    this.offerMechandisesArr = offerMechandises;
    //this.offerSize = this.offersObjArr.length;
    console.log(count);
    this.offerSize = count;
    
  }

  close() {
    this.navCtrl.pop();
  }

  viewOffer(item){
    const modal = this.modalCtrl.create(ViewOfferPage, {
      item: item
    });
    modal.present();
  }
}
