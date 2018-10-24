export class Item{

    itemId: String;
    type: String;
    name: String;
    imageUri: String[];
    description: String;

    constructor(obj){
        if(obj != null){
            obj && Object.assign(this, obj);
        }
        
    }
    setItemId(itemId: String){
        //validate item id
        this.itemId = itemId;
    }
    setType(type: String){
        //validate item id
        this.type = type;
    }
    setName(name: String){
        //validate item id
        this.name = name;
    }
    setImageUri(imageUri: String[]){
        //validate item id
        this.imageUri = imageUri;
    }
    setDescription(description: String){
        this.description = description;
    }
    getDescription(){
        return this.description;
    }
    getItemId(){
        return this.itemId;
    }
    getType(){
        return this.type;
    }
    getName(){
        return this.name;
    }
    getImageUri(){
        return this.imageUri;
    }
}