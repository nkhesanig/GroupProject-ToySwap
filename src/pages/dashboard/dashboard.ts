import { Component , ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

declare var google;
declare var firebase;

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  activeScreen : number;
  month : string = "All time";
  selectOptions;
  numOfResults : number = 15;
  activeBids : any = [];
  closedBids : any = [];
  dispList: any = [];
  filteredList : any = [];
  users = [];

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November', 
    'December'
  ];


  @ViewChild('barCanvas') barCanvas;
 
  barChart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.selectOptions = {
      subTitle: 'choose duration of report',
    };

    this.activeScreen = 2;

    //fetch all users
    firebase.database().ref('/users/').on('value', snapshot => {
      this.users = []; 
      snapshot.forEach(snap => {
        this.users.push(snap.val());
        return false;
      });

      console.log(this.users);
      
      this.users.reverse();
    });

    //fetch active bids
    firebase.database().ref('/activeBids/').on('value', snapshot => {
      this.activeBids = []; 
      snapshot.forEach(snap => {
        this.activeBids.push(snap.val());
        return false;
      });
      console.log("active");
      console.log(this.activeBids);
      
      this.activeBids.reverse();
    });

    //fetch closed bids
    firebase.database().ref('/userSuccessfulBids/').equalTo('').on('value', snapshot => {
      this.closedBids = []; 
      snapshot.forEach(snap => {
        this.closedBids.push(snap.val());
        return false;
      });
      console.log("closed");
      console.log(this.closedBids);
      
      this.closedBids.reverse();
    });
    
    this.dispList = this.activeBids.concat(this.closedBids);
  }

  toggleScreens(x){
    this.activeScreen = x;
    console.log(x);
    
  }

  onChange(){
  
    this.filterData(this.month);
    
  }

  filterData(month){
    
    
    this.dispList = this.closedBids.concat(this.activeBids);
    
    if(this.numOfResults >= this.dispList.length){
      console.log("if");
      this.filteredList = [];
      for(let i = 0; i < this.dispList.length; i++){
        let d = new Date(this.dispList[i].bid.bidDate);
        let monthInt = d.getMonth();
        let month = this.months[monthInt];
        console.log(month);

        if(this.month != "All time" && month == this.month){
          this.filteredList.push(this.dispList[i]);
        }
        if(this.month == "All time"){
          this.filteredList.push(this.dispList[i]);
        }
        console.log(this.filteredList);
      }

    }else{
      console.log("else");
      
      this.filteredList = [];
      for(let x = 0; x < this.numOfResults; x++){
        this.filteredList.push(this.dispList[x]);
      }

      console.log(this.filteredList); 
    }

    var close = 0;
    var open = 0;

    console.log("close " + close);
    console.log("open " + open);
     
    
  }

  home(){
    this.navCtrl.setRoot('FeedPage');
  }

}
