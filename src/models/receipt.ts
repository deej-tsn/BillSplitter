import { Item } from "./item";

export type User = {
    name: string;
    receipt : Receipt
  };


export type Charge = {
    name : string,
    charge_value : number // -1 < x < ∞ // Negative means discount, Positive means tax
}


export type Receipt = {
    items : Item[],
    charges : Charge[], // extra charges, order is important, added in order of array
    cost: string
}

export function dataToReceipt(data : any) : Receipt{
    let initialState = data as Receipt
    initialState.cost = adjustCost(data)
    //initialState.items = sortItems(initialState.items);
    return initialState;
}

function newEmptyReceipt(charges : Charge[]) : Receipt{
    return {
        items: [],
        charges : charges,
        cost : "0.00"
    } 
}

export function newUser(name:string, charges : Charge[]) : User {
    return {
        name : name,
        receipt : newEmptyReceipt(charges)
    }
}

export function setReceiptFromItems(receipt : Receipt, newItems : Item[]) : Receipt{
    receipt.items = newItems;
    receipt.cost = adjustCost(receipt);
    receipt.items = sortItems(receipt.items);
    return receipt;
}

export function setReceiptFromCharge(receipt : Receipt, newCharges: Charge[]) : Receipt{
    receipt.charges = newCharges;
    receipt.cost = adjustCost(receipt);
    receipt.items = sortItems(receipt.items);
    return receipt;
}



export function sortItems(items : Item[]) : Item[] {
    let sortedItems = items.sort((a , b) => a.name.localeCompare(b.name))
    return sortedItems
}

export function deleteManyFromReceipt(receipt : Receipt, toDelete : boolean[]):Receipt {
    if(toDelete.length != receipt.items.length) throw new Error('selected Array of incorrect size');
    receipt.items.forEach((item, index) => {
        if(toDelete[index]) item.quantity -= 1;
    })
    receipt.items = receipt.items.filter((item) => item.quantity != 0);
   
   receipt.cost = adjustCost(receipt);
   return receipt;
}

export function deleteFromReceipt(receipt : Receipt, itemToRemove : Item) : Receipt{
    const itemInReceipt = receipt.items.find((item) => item.name == itemToRemove.name);
    if (itemInReceipt == undefined) throw new Error('Item not in Receipt to Delete')
    if(itemInReceipt.quantity < itemToRemove.quantity) throw new Error('Quantity greater than amount left.');
    if(itemInReceipt.quantity == itemToRemove.quantity){
        receipt.items = receipt.items.filter((item) => item.name != itemToRemove.name);
    }
    else{
        itemInReceipt.quantity -= itemToRemove.quantity;
    }
    receipt.cost = adjustCost(receipt);
    return receipt
}

export function addManyToReceipt(receiptTo : Receipt, receiptFrom : Receipt, selected : boolean[]){
    receiptFrom.items.forEach((item, index) => {
        if(selected[index]){
            let itemIn = receiptTo.items.find((toItem) => toItem.name == item.name)
            if(itemIn == undefined){
                let newItem : Item = {
                    name : item.name,
                    price : item.price,
                    quantity : 1
                }
                receiptTo.items.push(newItem);
            }else{
                itemIn.quantity += 1;
            }
        }
    });
    receiptTo.cost = adjustCost(receiptTo);
    return receiptTo;
}

export function addToReceipt(receipt : Receipt, itemToAdd : Item) : Receipt{
    const itemInReceipt = receipt.items.find((item) => item.name == itemToAdd.name);
    if (itemInReceipt == undefined){
        // add to Receipt
        receipt.items.push(itemToAdd);
    }
    else {
        itemInReceipt.quantity += itemToAdd.quantity;
    }
    receipt.cost = adjustCost(receipt);
    receipt.items = sortItems(receipt.items);
    return receipt;
}




//function newReceiptFromData()

export function adjustCost(receipt  : Receipt) : string {
    let cost = 0;
    receipt.items.forEach((item) => cost += item.price * item.quantity)
    let service_charge = cost * receipt.charges[1].charge_value;
    cost = cost * (1+receipt.charges[0].charge_value);
    cost += service_charge;
    return cost.toFixed(2);
}

