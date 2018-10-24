

export class User{

    private uid: String;
    private name: String;
    private surname: String;
    private email: String;
    private type: String;
    private profilePic : String;
    

    constructor(obj) {
        if(obj != null){
            obj && Object.assign(this, obj);
        }
        
    }    
    getUid(){
        return this.uid;

    }
    getUserName(){
        return this.name;
    }
    getEmail(){
        return this.email;
    }
    getType(){
        return this.type;
    }

    setUid(uid:String){
        this.uid = uid;
    }
    setUserName(userName:String){
        if(userName != ""){
            this.name = userName;
        }
    }
    setSurname(surname){
        this.surname = surname;
    }
    setType(type: String){
        this.type = type;
    }
    setEmail(email){
        this.email = email;
    }

    setProfilePic(profilePic){
        this.profilePic = profilePic;
    }
    getSurname(){
        return this.surname;
    }
    getProfilePic(){
        return this.profilePic;
    }
    toString(){
        return "User name : "+ this.name + "/n" + " email : "+ this.email;  
    }
    equals(object:User){
        //compare two user object and return true if condition is met
        if(object != null && object.getEmail() === this.email){
            return true;
        }else{
            return false;
        }
    }


}