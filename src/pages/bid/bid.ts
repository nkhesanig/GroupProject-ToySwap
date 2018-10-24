import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController, LoadingController} from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { User } from '../../model/user';
import { Crop } from '@ionic-native/crop';
import { ProfileProvider } from '../../providers/profile/profile';
import { ImagePicker } from '@ionic-native/image-picker';
import { File } from '@ionic-native/file';
import { BidManager } from '../../model/bidManager';
import { Offer } from '../../model/offer';
import { Bid } from '../../model/bid';
import { Item } from '../../model/item';
declare var firebase;

@IonicPage()
@Component({
  selector: 'page-bid',
  templateUrl: 'bid.html',
})
export class BidPage  {

  types = [
    "Action figures",
    "Animals",
    "Cars and radio controlled",
    "Construction toys",
    "Creative toys",
    "Dolls",
    "Educational toys",
    "Electronic toys",
    "Puzzle/assembly",
    "Games", 
    "Sound toys",
    "Spinning toys",
    "Wooden toys",
    "Other"
  ];


  title : string = "";
  description : string = "";
  toyType : string = "";
  start  : string = "";
  expire : string = "";
  pictures = [];
  downloadUrls = [];
  bidDuration : number = 3;

  selectOptions : any;
  firebaseStorage : any;
  imageUri : any = null;
  details : string = null;
  uid : any;
  username : any;
  profilePicture : any;
  loading: any;

  bidder: User;
  itemsObj = [];
  activeBid: Bid;
  itemObj: Item;
  item: any;
  bid: Bid;
  bidOwner:User;
  bidObj: Bid;

  itemPassedItem: Item;


  itemName ;
  itemDescription ;
  itemPicture;
  
  
  constructor(public toastCtrl: ToastController, private file: File, private crop: Crop, public loadingCtrl: LoadingController, private imagePicker: ImagePicker, private camera: Camera, public navCtrl: NavController, public navParams: NavParams, public profile: ProfileProvider) {
    this.selectOptions = {
      subTitle: 'Select a category',
    };
    this.firebaseStorage = firebase.storage();
  
  
    this.bidder = profile.user;
    this.item = navParams.get('item');
    this.bidObj = new Bid(this.item.bid);
    this.bidOwner = new User(this.bidObj.getOwner());

    // console.log();
    this.itemPassedItem = new Item(this.bidObj.getMerchandise());
    console.log(this.itemPassedItem);

    this.itemDescription = this.itemPassedItem.getDescription();
    this.itemName = this.itemPassedItem.getName();
    this.itemPicture = this.itemPassedItem.getImageUri();
    

    this.firebaseStorage = firebase.storage();
    
  }

  close(){
    this.navCtrl.pop();
  }

  ionViewDidLoad(){

    this.pictures = [];
    this.downloadUrls = [];
    
  }

  takePicture(){
       
    let options: CameraOptions = {
      quality: 25,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum : false,
      cameraDirection : 0,
      targetWidth : 640,
      targetHeight : 640,
      allowEdit : true

    };

    this.camera.getPicture(options).then((imageData) => {
      
      this.imageUri = 'data:image/jpeg;base64,' + imageData;
      this.details =  "img" + Date.now().toString() + ".jpeg";
      this.loading = this.loadingCtrl.create({
        content: 'Optimizing image. please wait...'
      });
    
      this.loading.present();
      

      if(this.pictures.length <= 5){
        this.pictures.push({
          name :this.details,
          uri : this.imageUri
        });
        this.loading.dismiss();
      }else{
        this.presentToast("You can only add 6 images");
        this.loading.dismiss();
      }
      console.log(this.pictures);
      
     }, (err) => {
      
      console.log(err);
      this.loading.dismiss();
     });
    
  }


  uploadImage(){
    
    let counter = 0;
    this.loading = this.loadingCtrl.create({
      content: 'Uploading files, Please wait...'
    });
  
    this.loading.present();

    for(let i = 0 ; i < this.pictures.length; i++){

      var ref = this.firebaseStorage.ref('bidderItemPictures/' + this.uid  + '/' + this.pictures[i].name );
      ref.putString(
      this.pictures[i].uri, 'data_url').then(
        resp =>{
          counter++;

          if(counter == this.pictures.length){
            this.getUrls();
          }
        }
      ).catch(
        err => {

          this.loading.dismiss();
        }
      );
    }
    
  }

  getUrls(){
    console.log("fetching urls");
    
    for(let i = 0; i <  this.pictures.length ; i++){

        this.firebaseStorage.ref('/bidderItemPictures/' + this.uid +  '/' +  this.pictures[i].name + '/').getDownloadURL().then(url => {
        this.downloadUrls.push(url);
        
        console.log("saving url for image " + (1+i));
        
        if(this.downloadUrls.length == this.pictures.length){
          this.saveToDB();
        }
        
      }).catch(error => {
       
        console.log(error);
      });
    }
  }

  saveToDB() {
    console.log("save to db");
    console.log(this.downloadUrls);
    
    this.bidDuration *= 60*60*24*1000;
    this.bidDuration +=  Date.now();

    var offerItemsObjArr = [];
    var bidFactory = new BidManager();
    var bidOffer = new Offer(null);
    var offerItems = new Item(null);
    
    console.log(this.description);
    offerItems.setDescription(this.description);
   
    //this.downloadUrls.push("asdfsdfsdfsdf");
    console.log(this.downloadUrls);
    offerItems.setImageUri(this.downloadUrls);
    console.log(this.title);
    offerItems.setName(this.title);
    console.log(this.toyType);
    offerItems.setType(this.toyType);
    console.log(offerItems);
    offerItemsObjArr.push(offerItems);
    console.log(this.bidder);
    console.log(offerItemsObjArr);
    bidOffer.setItems(offerItemsObjArr);
    bidOffer.setOfferDate(Date.now());
    console.log(this.bidder);
    bidOffer.setOwner(this.bidder);
    this.bidObj.setOffers(offerItemsObjArr);

    bidFactory.writeBidOffer(bidOffer,this.bidObj.getBidId());

    bidFactory.updatePlacedBid(this.bidObj);
    bidFactory.updateUsersBid(this.bidObj,this.bidOwner.getUid());

    this.loading.dismiss();
    this.presentToast("Bid posted successfully");
    this.navCtrl.pop();


  }

  remove(x){
    this.pictures.splice(x,1);
    this.presentToast("picture deleted");
  }
  openGallery(){

    let options = {maximumImagesCount: 1, outputType : 0};
    this.imagePicker.getPictures(options).then( results => {
      for (var i = 0; i < results.length; i++) {

        this.crop.crop(results[i], {quality: 25, targetWidth : 640, targetHeight : 640})
        .then(
        newImage => {
          console.log('new image path is: ' + newImage);

          let path = newImage.substring(0, newImage.lastIndexOf('/')+1);
          let file = newImage.substring(newImage.lastIndexOf('/') + 1, newImage.lastIndexOf('?'));

          console.log(path);
          console.log(file);

          this.loading = this.loadingCtrl.create({
            content: 'Optimizing image. please wait...'
          });
        
          this.loading.present();
          
          this.file.readAsDataURL(path, file).then(
            uri =>{
              this.imageUri = uri ;
              this.details =  "img" + Date.now().toString() + ".jpeg";

              if(this.pictures.length <= 5){
                this.pictures.push({
                  name :this.details,
                  uri : this.imageUri
                });
                this.loading.dismiss();
              }else{
                this.presentToast("You can only add 6 images");
                this.loading.dismiss();
              }
              
            }
          ).catch( error =>{
              console.log(error);
              
            }
          );
          
        },
        error => console.error('Error cropping image', error)
        );
      }
    }, err => { console.log(err);
     });
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
    });
  
    toast.present();
  }

}
