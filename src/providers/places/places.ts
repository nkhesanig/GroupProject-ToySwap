import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlacesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PlacesProvider Provider');
  }

  getPlace(placeName){

    return this.http.get('https://nominatim.openstreetmap.org/search?q=' + placeName + ', za&format=geojson');
  }

}
