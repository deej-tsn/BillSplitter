export type Item = {
    name: string;
    price: number;
    quantity: number;
};


export type User = {
    name: string;
    receipt : Receipt
  };


export type Charge = {
    name : string,
    percentage : number // -100 < x < ∞ // Negative means discount, Positive means tax
}


export type Receipt = {
    items : Item[],
    charges : Charge[], // extra charges, order is important, added in order of array
    chargeStrategy : "serviceChargeSeperate"| "inOrder"
    cost: string
}

export function dataToReceipt(data : any) : Receipt{
    let initialState = data as Receipt
    initialState.chargeStrategy = 'serviceChargeSeperate'
    initialState.cost = adjustCost(initialState);
    //initialState.items = sortItems(initialState.items);
    return initialState;
}

function newEmptyReceipt(charges : Charge[]) : Receipt{
    return {
        items: [],
        charges : charges,
        chargeStrategy : 'serviceChargeSeperate',
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

export function addChargeToReceipt(receipt : Receipt, chargeToAdd : Charge) : Receipt{
    const chargeInReceipt = receipt.charges.find((charge) => charge.name == chargeToAdd.name);
    if (chargeInReceipt != undefined) throw new Error("new charge already present ");
    receipt.charges.push(chargeToAdd);
    receipt.cost = adjustCost(receipt);
    return receipt;
}

export function adjustCost(receipt  : Receipt) : string {
    let cost = receipt.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    switch(receipt.chargeStrategy){
        case "serviceChargeSeperate":
            cost = ChargeStrategy.CS_serviceChargeSeperate(cost, receipt.charges)
            break;
        case 'inOrder':
            cost = ChargeStrategy.CS_Inorder(cost, receipt.charges)
            break;
    }
    return cost.toFixed(2);
}



export class ChargeStrategy {
    static CS_Inorder(cost : number, charges : Charge[]) : number{
        charges.forEach((charge : Charge) => {
            (charge.percentage > 0) ? cost*=  (1+ charge.percentage/100) : cost *= (100+charge.percentage)/100
        })
        return cost;
    }

    static CS_serviceChargeSeperate(cost : number, charges : Charge[]) : number{
        let service_charge = charges.find((charge) => charge.name.toLowerCase() === 'service charge');
        if(service_charge == undefined) return ChargeStrategy.CS_Inorder(cost, charges)
        let service_charge_value = cost * (service_charge.percentage/100)
        console.log(service_charge_value);
        charges = charges.filter((charge) => charge.name.toLowerCase() !== 'service charge')
        console.log(charges)
        cost = ChargeStrategy.CS_Inorder(cost, charges)
        cost += service_charge_value;
        return cost;
    }
    
    
}