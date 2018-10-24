import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Bid } from '../../model/bid';
import { Item } from '../../model/item';
import { User } from '../../model/user';
import { Flag } from '../../model/flag';
import { BidManager } from '../../model/bidManager';
import { FeedPage } from '../feed/feed';

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {
  complaint;
  complaintBid;
  merchandise;
  bidOwner;
  ownerName;
  complaintBidName;
  complaintBidType;

  constructor(public toastCtrl: ToastController,public navCtrl: NavController, public navParams: NavParams) {
    console.log(navParams.get('item').bid);
    this.complaintBid = new Bid(navParams.get('item').bid);
    console.log(this.complaintBid.merchandise);
    this.merchandise = new Item(this.complaintBid.merchandise);
    console.log(this.complaintBid.owner);
    this.bidOwner = new User(this.complaintBid.owner);
    console.log(this.bidOwner.getUid());
    this.ownerName = this.bidOwner.getUserName();
    console.log(this.ownerName);
    this.complaintBidType = this.merchandise.getType();
    this.complaintBidName = this.merchandise.getName();
    console.log(this.complaintBidType);
    console.log(this.complaintBidName);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }
  submitComplaint(){
    console.log(this.complaint);
    var flag = new Flag(null);
    var bidId = this.complaintBid.getBidId();
    flag.setReportDate(Date.now());
    flag.setIssue(this.complaint);
    flag.setBidId(bidId);
    flag.setStatus("Open");
    flag.setAdminComment("none");

    console.log(flag);
    console.log(bidId);

    var BidFactory = new BidManager();
    BidFactory.writeFlag(flag,bidId);
    this.presentToast("your report has been submitted, thank you");
    // go back to feed page
  }
  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 4000,
      position: 'top',
      showCloseButton : true,
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
      this.navCtrl.push(FeedPage);
    });
  
    toast.present();
  }
  
  close(){
    this.navCtrl.pop();
  }

}
