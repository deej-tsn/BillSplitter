
import { Item } from './items'

export type User = {
    name : string, 
    items : Map<string,Item>,
    cost : number,
}




export function CreateUser(name : string) : User {
    return {
        name : name,
        items : new Map<string,Item>(),
        cost : 0,
    }
}

export function AddItemToUser(user:User, item : Item) {
    if(user.items.has(item.name)) {
        user.items.get(item.name)!.quantity += item.quantity
    }else {
        user.items.set(item.name,item);
    }
    user.cost += item.price*item.quantity
}

export function RemoveItemToUser(user:User, item : Item) {
    if(user.items.has(item.name)){
        const currentItem = user.items.get(item.name)!
        if(item.quantity == currentItem.quantity){
            user.items.delete(item.name)
        }else if(item.quantity > currentItem.quantity){
            throw new Error("Quantity greater than amount left.");
        } else{
            currentItem.quantity -= item.quantity;
        }
    }else{
        throw new Error(`${user.name} does not have this item in their list`);  
    }
}