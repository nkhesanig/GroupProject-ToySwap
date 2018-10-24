import { User } from "./user";
import { Item } from "./item";
import { Flag } from "./flag";



export class Bid{
    
    bidId: String;
    owner: User;
    bidder: User;
    views: number;
    merchandise: Item;
    offers: Item[];
    bidDate: Date;
    status: String;
    expireDate: Date;
    bidDuration: number;
    flagId: String;

    constructor(obj: Object){
  
        if(obj != null){
            obj && Object.assign(this, obj);
        }else{
            this.views = 0;
        }
    
    }
    setOwner(owner: User){
        if(owner != null && owner instanceof User){
            this.owner = owner;
        }
    }
    setBidDuration(expireDate: number){
        this.bidDuration = expireDate;
    }
    setBidder(bidder: User){
        if(bidder != null && bidder instanceof User){
            this.bidder = bidder;
        }
    }
    setViews(views)
    {
        this.views = views;
    }
    setMerchandise(merchandise){
        this.merchandise = merchandise;
    }
    setBidDate(bidDate){
        this.bidDate = bidDate;
    }
    setOffers(offers: Item[]){
        //null check ofers
        this.offers = offers;
    }
    setStatus(status: String){
        //null check status
        this.status = status;
    }
    setBidId(bidId: String){
        //null check status
        this.bidId = bidId;
    }
    setFlagId(flagId: String){
        this.flagId = flagId;
    }
    getFlagId(){
        return
    }
    getBidId(){
        return this.bidId;
    }
    getOffers(){
        return this.offers;
    }
    getOwner(){
        return this.owner;
    }
    getBidders()
    {
        return this.bidder;
    }
    getViews(){
        return  this.views;
    }
    getMerchandise(){
        return this.merchandise;
    }
    getBidDate(){
        return this.bidDate;
    }
    getStatus(){
        return this.status;
    }
    getExpireDate(){
        return this.expireDate;
    }
    getBidDuration(){
        return this.bidDuration;
    }
}