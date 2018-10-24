import { User } from "./user";
import { Item } from "../../node_modules/ionic-angular/umd";


export class Offer{

    owner: User;
    items: Item[];
    bidId: String;
    offerDate: any;
    

    constructor(obj){
        if(obj != null){
            obj && Object.assign(this, obj);
        }
    }
    setOfferId(offerId: String){
        this.bidId = offerId;
    }
    getOfferId(){
        return this.bidId;
    }
    setItems(items: Item[]){
        this.items = items; 
    }
    getItems(){
        return this.items;
    }
    setOwner(owner:User){
        this.owner = owner;
    }
    getOwner(){
        return this.owner
    }
    setOfferDate(date: any){
        this.offerDate = date;
    }
    getOfferDate(){
        return this.offerDate;
    }
}