import { User } from "./user";


export class CurrentUserProfile{
    
    private user: User;
    private lastLogInTime: Date;
    private profilePicUrl: String;

    constructor() {

    } 
    setUser(user: User){
        if(user != null && user instanceof User){
            console.log("the current user is" + user);
            this.user = user;
        }
    }
    setLastLogInTime(lastLogIn: Date){
        if(lastLogIn != null){
                this.lastLogInTime = lastLogIn;
        }
    }
    setProfilePicUrl(){
        
    }

}