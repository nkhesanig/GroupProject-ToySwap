import { Bid } from "./bid";
import { User } from "./user";
import { Item } from "./item";
import { Offer } from "./offer";
import { ProfileProvider } from "../providers/profile/profile";
import { Flag } from "./flag";
declare var firebase;
export class BidManager {

  private bid: Bid;
  bidder: User;
  private upload;
  bidDate: Date;
  itemObj;
  offerItemsMerchandise = [];

  constructor() {

  }
  // this.uid,this.username,this.imgUrl,this.title,this.description, this.toyType
  // this.status,this.bidderUid,this.duration,this.bidDate,this.profilePicture,this.views
  perfomBid(bid: Bid, bidder: User) {
    bid.setBidder(bidder);
    firebase.database().ref('/closeBids/').push(
      {
        bid: bid
      }
    );
  }

  writePlacedBid(bid: Bid) {

    var placedBidskey;
    var placedBidsRef = firebase.database().ref('/placedBids/');
    placedBidskey = placedBidsRef.push().getKey();

    bid.setBidId(placedBidskey);
    bid.setOffers(null);
    console.log(placedBidskey);
    console.log(bid);
    placedBidsRef.child('/' + placedBidskey + '/').set({
      bid: bid,
    });
    
  }
  updatePlacedBid(bid: Bid){
    console.log(bid);
    console.log(bid.getBidId());
    
    var placedBidsRef = firebase.database().ref('/placedBids/');
    var placedBidskey = bid.getBidId();

    placedBidsRef.child('/' + placedBidskey + '/').set({
      bid: bid,
    });
  }
  updateUsersBid(bid: Bid,userId){
    console.log(bid);
    var placedBidsRef = firebase.database().ref('/userBids/');
    var userBidkey = bid.getBidId();
    console.log(userBidkey);
    console.log(userId);
    placedBidsRef.child('/'+ userId +'/' + userBidkey + '/').set({
      bid: bid,
    });
  }
  writeUserBid(bid: Bid) {
    var userId = bid.getOwner().getUid();
    var bidId = bid.getBidId();
    var userBidsRef = firebase.database().ref('/userBids/');
    bid.setOffers(null);
    console.log(userId);
    console.log(bid);
    userBidsRef.child('/' + userId + '/' + bidId).set({
      bid: bid,
    });
  }
  delay() {
    // `delay` returns a promise
    return new Promise(function (resolve, reject) {
      // Only `delay` is able to resolve or reject the promise
      setTimeout(function () {
        resolve(42); // After 3 seconds, resolve the promise with value 42
      }, 3000);
    });
  }
  userBids: Object;
  dataList  = [];
  mySandwich(param1, param2, callback) {
    alert('Started eating my sandwich.\n\nIt has: ' + param1 + ', ' + param2);
    callback();
  }
  getUserBidsById(userId: String,callback) {
    // var userBidObjArr = {};
    // var dataList: Bid[] = [];
    // firebase.database().ref('/userBids/' + userId).on('value', (snapshot) => {
    //   snapshot.forEach(snap => {
    //     this.userBids = snap.val().bid;
    //     var bid = new Bid(this.userBids);
    //     userBidObjArr = bid;
    //     // var bid2 = bid;
    //     dataList.push(bid);

    //     console.log(dataList);

    //   });
    //   console.log(dataList.length);
    // });
    // if(dataList.length > 0){
    //   console.log(dataList);
    //   return dataList;
    // }
    // `delay` returns a promise

    // Only `delay` is able to resolve or reject the promise
    var userBidObjArr = {};
 
    firebase.database().ref('/userBids/' + userId).on('value', (snapshot) => {
      snapshot.forEach(snap => {
        console.log(snap)
        console.log(snap.val())
        this.userBids = snap.val().bid;
        var bid = new Bid(this.userBids);
        userBidObjArr = bid;
        // var bid2 = bid;
        this.dataList.push(bid);

        console.log(this.dataList);

      });
      // console.log(dataList.length);
      alert('Started eating my sandwich');
      callback( this.dataList);
    });
    // setTimeout(function() {
    //   resolve(42); // After 3 seconds, resolve the promise with value 42
    // }, 3000);
    // return new Promise(function (resolve, reject)  {
    //  }).then(value =>{
    //   return this.dataList;
    //   console.log("-----------------");
    // });

  }
  getUserById(uid: String,callback){
    var currentUser;
    firebase.database().ref('/users/' + uid).on('value', (snapshot) => {

          console.log(snapshot.val().name);   
          currentUser = new User(snapshot.val());
  
      console.log(currentUser);
      callback(currentUser);
    });
  }
  getAllPlacedBids() {

    var placedBidObject: Object;
    firebase.database().ref('/placedBids/').on('value', (snapshot) => {
      snapshot.forEach(snap => {
        placedBidObject = snap.val();
        console.log(placedBidObject);
        return false;
      });
    });
    if (placedBidObject != null) {
      return placedBidObject;
    }
  }

  getBidById(bidId: String,consumedData) {
    var fireBaseBidObject;
    firebase.database().ref('/placedBids/' + bidId).on('value', (snapshot) => {
      snapshot.forEach(snap => {
        console.log("------------------------------------------------------------");
        fireBaseBidObject = snap.val();
        console.log(snap.val());
        console.log(fireBaseBidObject);
        return false;
      });
      consumedData(fireBaseBidObject);
    });
    // if (fireBaseBidObject != null) {
    //   return fireBaseBidObject;
    // }
  }

  writeUserCancelledBids(bid: Bid,uid) {

    //cancelled
    var cancelledBidsRef = firebase.database().ref('/userCancelledBids/');
    var cancelledBidskey = bid.getBidId();
    cancelledBidsRef.child("/" + uid + '/' + cancelledBidskey).set({
      bid: bid,
    });

  }
  readUserCancelledBids(userId: String) {
    var successfulBids: Object;
    firebase.database().ref('/userCancelledBids/' + userId).on('value', (snapshot) => {
      snapshot.forEach(snap => {
        successfulBids = snap.val();
        console.log(successfulBids);
        return false;
      });
    });
  }
  
  writeUserSuccessfullBids(bid: Bid) {
    // cancelled
    var userSuccessfulBidsRef = firebase.database().ref('/userSuccessfulBids/');
    var userSuccessFulBidskey = bid.getBidId();
    var bidOwner = new User(bid.getOwner());
    var userId = bidOwner.getUid();
    bid.setStatus("completed");
    console.log(userId);
    userSuccessfulBidsRef.child("/" + userId + '/'+ userSuccessFulBidskey).set({
      bid: bid,
    });

  }
  writeUserRejectedOffer(offer:Offer,ownerId) {

    var bidOfferRef = firebase.database().ref('/userRejectedOffers/');
    var Offerkey = bidOfferRef.push().getKey();

    // offer.setOfferId(Offerkey);
    // console.log(offer);
    // console.log(Offerkey);
    // console.log(bidId);
    bidOfferRef.child('/' + ownerId + '/' + offer.getOfferId()).set({
      offer: offer,
    });

  }
  removePlacedBid(bidId){
    
    firebase.database().ref('/placedBids/').child(bidId).remove();
  }
  removeBidOffer(bidId,offerId){
    firebase.database().ref('/bidOffers/' + bidId).child(offerId).remove();
  }
  removeUserPlacedBid(uid,bidId){
    firebase.database().ref('/userBids/' + uid).child(bidId).remove();
  }
  readUserSuccesfullBids(userId: String) {

    var successfulBids: Object;
    firebase.database().ref('/userSuccessfulBids/' + userId).on('value', (snapshot) => {
      snapshot.forEach(snap => {
        successfulBids = snap.val();
        console.log(successfulBids);
        return false;
      });
    });

  }
  writeAllCancelled(cancelledBid: Bid) {
    var userId = cancelledBid.getOwner().getUid();
    var allCancelledBidsRef = firebase.database().ref('/cancelledBids/');
    var cancelledBidskey = cancelledBid.getBidId();

    // userBidsRef.child('/' + userId + '/' + bidId).set({

    console.log(cancelledBidskey);
    allCancelledBidsRef.child('/' + userId + '/' + cancelledBidskey).set({
      cancelledBid: cancelledBid,
    });
  }

  writeAllSuccessful(successfulBid: Bid) {

    var allSuccessfulBidsRef = firebase.database().ref('/successfulBids/');
    var successfulBidskey = allSuccessfulBidsRef.getBidId();

    console.log(successfulBidskey);
    allSuccessfulBidsRef.child('/' + successfulBid + '/').set({
      bsuccessfulBidskeyid: successfulBidskey,
    });
  }
  readAllSuccessfulBids() {
    var successfulBids: Object;
    firebase.database().ref('/successfulBids/').on('value', (snapshot) => {
      snapshot.forEach(snap => {
        successfulBids = snap.val();
        console.log(successfulBids);
        return false;
      });
    });
  }
  readAllCancelledBids() {
    var cancelledBids: Object;
    firebase.database().ref('/cancelledBids/').on('value', (snapshot) => {
      snapshot.forEach(snap => {
        cancelledBids = snap.val();
        console.log(cancelledBids);
        return false;
      });
    });
    if (cancelledBids != null) {
      return cancelledBids;
    }
  }
  // updatePlacedBid(bid: Bid,bidId: String, property: String, newVal: number) {

  //   var placedBidsRef = firebase.database().ref('/placedBids/');
  //   var placedBidskey = bid.getBidId();
  //   var userId = bid.getOwner().getUid();

  //   bid.setBidId(placedBidKeyBidskey);
  //   console.log(userId);
  //   bid.setViews();
  //   placedBidsRef.child("/" + placedBidskey).set({
  //     bid: bid,
  //   });
  // }
  incrementViews(bid: Bid) {
    console.log(bid)
    var placedBidsRef = firebase.database().ref('/placedBids/');
    var placedBidskey = bid.getBidId();
    // bid.setBidId(placedBidskey);
    var views = bid.getViews();
    views++;
    bid.setViews(views);
    placedBidsRef.child("/" + placedBidskey).set({
      bid: bid,
    });

    var user = new User(bid.getOwner());
    console.log(user);
    var userBidsRef = firebase.database().ref('/userBids/' + user.getUid());
    userBidsRef.child('/' + placedBidskey + '/').set({
      bid: bid,
    });
  }
  updateUserBid(userId: String, property: String, newVal: String) {
    var updates: Object;
    updates['/userBids/' + userId + '/bid/' + property] = newVal;
    return firebase.database().ref().update(updates);
  }
  writeBidOffer(offer: Offer, bidId: String) {

    var bidOfferRef = firebase.database().ref('/bidOffers/');
    var Offerkey = bidOfferRef.push().getKey();

    offer.setOfferId(Offerkey);
    console.log(offer);
    console.log(Offerkey);
    console.log(bidId);
    bidOfferRef.child('/' + bidId + '/' + Offerkey).set({
      offer: offer,
    });
  }
  writeAcceptedBids(bid:Bid) {

    var acceptedBidsRef = firebase.database().ref('/acceptedBids/');
    var acceptedBidKey =  bid.getBidId();
    bid.setStatus("completed");
    acceptedBidsRef.child('/' + acceptedBidKey + '/').set({
      bid: bid,
    });
  }
  readBidOffer() {

    var bidOffer: Object;
    firebase.database().ref('/bidOffers/').on('value', (snapshot) => {
      snapshot.forEach(snap => {
        bidOffer = snap.val();
        console.log(bidOffer);
        return false;
      });
    });
  }
  offerItems = [];
  ownerArr = [];
  
  offerMechandiseArr = [];

  readBidOffersById(bidId: String,consumedOfferData) {
    var g = 0;
    // var bidOffer: Offer;
    firebase.database().ref('/bidOffers/' + bidId).on('value', (snapshot) => {
      g = 0;
      snapshot.forEach(snap => {
        // var bidOffer = new Offer(snap.val().offer);
        this.offerItems.push(snap.val().offer);
        console.log(snap.val().offer);
        console.log(snap.val().offer.bidId);
        this.ownerArr.push(snap.val().offer.owner);
        this.offerItemsMerchandise.push(snap.val().offer.items);
        this.offerMechandiseArr.push(this.offerItemsMerchandise[g][0]);
        console.log(this.ownerArr[g].name);
        // console.log(owner);
       g++;
        return false;
      });
      // console.log(this.offerItems);
      // console.log(this.offerItemsMerchandise[0][0]);
      // console.log(this.offerMechandiseArr);
      // console.log(this.offerMechandiseArr[0].description);
      consumedOfferData(this.offerItems,this.ownerArr,this.offerMechandiseArr);
    });

  }
  readBidByOfferId(uid,bidId,consumedData){

    firebase.database().ref('/bidOffers/'+  + bidId).on('value', (snapshot) => {

    });
  }
  updateOffer(bidId: String, property: String, newVal: String) {
    var updates: Object;
    updates['/placedBids/' + bidId + '/bid/' + property] = newVal;
    return firebase.database().ref().update(updates);
  }

  writeFlag(flag: Flag, bidId: String) {

    var bidFlagRef = firebase.database().ref('/bidFlags/');
    var bidFlagkey = bidFlagRef.push().getKey();
    flag.setBidId(bidId);
    console.log(flag);
    bidFlagRef.child('/' + bidId + '/' + bidFlagkey).set({
      flag: flag,
    });
  }
  readAllBidFlags() {
    var flags: Object;
    firebase.database().ref('/bidFlags/').on('value', (snapshot) => {
      snapshot.forEach(snap => {
        flags = snap.val();
        console.log(flags);
        return false;
      });
    });
    if (flags != null) {
      return flags;
    }
  }
  readAllBidFlagsById(bidId,consumedFlagsData) {
    var flags = [];
    firebase.database().ref('/bidFlags/' + bidId).on('value', (snapshot) => {
      snapshot.forEach(snap => {
        flags.push(snap.val());
        console.log(flags);
        return false;
      });
    });
    if (flags != null) {
      consumedFlagsData(flags);
    }
  }
  readBidFlagById(bidId: String) {
    var flag: Object;
    firebase.database().ref('/bidFlags/' + bidId).on('value', (snapshot) => {
      snapshot.forEach(snap => {
        flag = snap.val();
        console.log(flag);
        return false;
      });
    });
    if (flag != null) {
      return flag;
    }
  }
  writeDeviceData(userId: String) {
    var deviceRef = firebase.database().ref('/userDevices/');
    deviceRef.child("/" + userId + "/").set({
      uid: "not yet specified",
      deviceId: "not yet specified"
    });
  }
  readDeviceData() {
    var deviceData = [];
    firebase.database().ref('/userDevices/').on('value', (snapshot) => {
      snapshot.forEach(snap => {
        deviceData.push(snap.val());
        console.log(deviceData);
        return false;
      });
    });
  }
  readDeviceDataById(deviceId: String) {
    var deviceData = [];
    firebase.database().ref('/userDevices/' + deviceId).on('value', (snapshot) => {
      snapshot.forEach(snap => {
        deviceData.push(snap.val());
        console.log(deviceData);
        return false;
      });
    });
  }
  cloneObject() {
    this.userBids
    var bids = new Bid(this.userBids);
    console.log(bids);
  }
}