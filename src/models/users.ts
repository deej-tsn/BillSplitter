
import { Item } from './items'

export type User = {
    name : string, 
    items : Set<Item>,
    cost : number,
}

export type Users = {
    users : User[]
}


export function CreateUser(name : string) {
    return {
        name : name,
        items : new Set<Item>(),
        cost : 0,
    }
}

export function AddItemToUser(user:User, item : Item) {
    if(user.items.has())
    user.items.add(item);
    user.cost += item.price*item.quantity
}

export function RemoveItemToUser(user:User, item : Item) {
    user.items.(item);
    user.cost += item.price*item.quantity

}