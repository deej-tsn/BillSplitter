
export type User = {
    name: string;
    recipe : Receipt
  };

export type Item = {
    name: string;
    price: number;
    quantity: number;
  };

type Charge = {
    name : string,
    charge_value : number // -1 < x < ∞ // Negative means discount, Positive means tax
}


export type Receipt = {
    items : Item[],
    charges : Charge[], // extra charges, order is important, added in order of array
    cost: number
}

function newEmptyRecipe(charges : Charge[]) : Receipt{
    return {
        items: [],
        charges : charges,
        cost : 0
    } 
}

export function newUser(name:string, charges : Charge[]) : User {
    return {
        name : name,
        recipe : newEmptyRecipe(charges)
    }
}

export function deleteFromRecipe(receipt : Receipt, itemToRemove : Item){
    const itemInRecipe = receipt.items.find((item) => item.name == itemToRemove.name);
    if (itemInRecipe == undefined) return
    let costRemoved : number;
    if(itemInRecipe.quantity < itemToRemove.quantity) throw new Error('Quantity greater than amount left.');
    if(itemInRecipe.quantity == itemToRemove.quantity){
        receipt.items.filter((item) => item.name != itemToRemove.name);
        costRemoved = itemInRecipe.quantity * itemInRecipe.price;
    }
    else{
        itemInRecipe.quantity -= itemToRemove.quantity;
        costRemoved = itemInRecipe.price * itemToRemove.quantity;
    }
    receipt.cost -= costRemoved;
}

export function addToRecipe(receipt : Receipt, itemToAdd : Item){
    const itemInRecipe = receipt.items.find((item) => item.name == itemToAdd.name);
    if (itemInRecipe == undefined){
        // add to Recipe
        receipt.items.push(itemToAdd);
    }
    else {
        itemInRecipe.quantity += itemToAdd.quantity;
    }
    receipt.cost += itemToAdd.price * itemToAdd.quantity;
}




//function newRecipeFromData()

export function adjustCost(receipt  : Receipt) : number {
    let cost = 0
    receipt.items.forEach((item) => cost += item.price * item.quantity)
    receipt.charges.forEach((charge) => cost *= (1+charge.charge_value))
    return cost
}

