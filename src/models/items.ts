export type Item = {
    name : string,
    price : number,
    quantity : number,

    
}

export type ItemsLeft = {
    items : Map<string, Item>,
    cost : number
}


export function newItemsLeft(items : Item[]) : ItemsLeft{
    let cost = 0;
    let map = new Map<string, Item>()
    items.forEach((item) => {
        map.set(item.name, item)
        cost += item.price * item.quantity
    })
    return {
        items : map,
        cost : cost,
    }
}

export function addToItemsLeft(itemsLeft : ItemsLeft, item:Item): void {
    if (itemsLeft.items.has(item.name)){
        const currentItem = itemsLeft.items.get(item.name)!
        currentItem.quantity += item.quantity
    }else{
        itemsLeft.items.set(item.name, item)
    }
}


export function DeleteToItemsLeft(itemsLeft : ItemsLeft, item:Item) {
    if (itemsLeft.items.has(item.name)){
        const currentItem = itemsLeft.items.get(item.name)!
        if(item.quantity == currentItem.quantity){
            itemsLeft.items.delete(item.name)
        }else if(item.quantity > currentItem.quantity){
            throw new Error("Quantity greater than amount left.");
        } else{
            currentItem.quantity -= item.quantity;
        }
    }else{
        throw new Error("No Instances of item in Items Left");
    }
}

