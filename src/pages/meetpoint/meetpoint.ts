import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PlacesProvider } from '../../providers/places/places';
import leaflet from 'leaflet';

declare var L;

@IonicPage()
@Component({
  selector: 'page-meetpoint',
  templateUrl: 'meetpoint.html',
})
export class MeetpointPage {

  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  searchPlaces = [];
  myInput;

  lat = 0;
  long = 0;

  constructor(public places : PlacesProvider,public navCtrl: NavController, public navParams: NavParams) {
    
  }

  fetchPlaces(placeName){
    
      this.searchPlaces = [];
      this.places.getPlace(placeName).subscribe( resp =>{
        var x = resp.features.length;
        for(let i = 0; i < x ; i++){
          this.searchPlaces.push(resp.features[i]);
        }

        console.log(this.searchPlaces);
      
        
        
        
        }
      );
  }

  ionViewDidLoad(){
    this.loadmap();
  }

  search($event){

    if(this.myInput != ''){
      this.fetchPlaces(this.myInput);
      
      
    }
  }

  onCancel($event){
    this.searchPlaces = [];
    this.myInput = "";
  }

  loadmap() {

    
    this.map = leaflet.map('map').setView([ this.lat,this.long], 15); 

    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18
    }).addTo(this.map);

    var marker = leaflet.marker([this.lat,this.long]).addTo(this.map);
    marker.bindPopup("<b>Hello Friend!</b><br>Let's meet here.").openPopup();

    
  }

  setTarget(coord){

    this.long = coord.geometry.coordinates[0];
    this.lat = coord.geometry.coordinates[1];
    this.searchPlaces = [];

    this.map.setView([ this.lat,this.long], 15);
    var marker = leaflet.marker([this.lat,this.long]).addTo(this.map);
  
    marker.bindPopup("<b>Hello Friend!</b><br>Let's meet here.").openPopup();
    
    //console.log("long");
        //console.log(this.searchPlaces.geometry.coordinates[0]);
    //console.log("lat");
    //console.log(this.searchPlaces.geometry.coordinates[1]);

    
  }

}
