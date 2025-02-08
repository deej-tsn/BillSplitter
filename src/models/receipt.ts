import { Item } from "./item";

export type User = {
    name: string;
    recipe : Receipt
  };


type Charge = {
    name : string,
    charge_value : number // -1 < x < ∞ // Negative means discount, Positive means tax
}


export type Receipt = {
    items : Item[],
    charges : Charge[], // extra charges, order is important, added in order of array
    cost: string
}

export function dataToRecipe(data : any) : Receipt{
    let initialState = data as Receipt
    initialState.cost = adjustCost(data)
    initialState.items = sortRecipe(initialState);
    return initialState;
}

function newEmptyRecipe(charges : Charge[]) : Receipt{
    return {
        items: [],
        charges : charges,
        cost : "0.00"
    } 
}

export function newUser(name:string, charges : Charge[]) : User {
    return {
        name : name,
        recipe : newEmptyRecipe(charges)
    }
}

export function setRecipeFromItems(recipe : Receipt, newItems : Item[]) : Receipt{
    recipe.items = newItems;
    recipe.cost = adjustCost(recipe);
    recipe.items = sortRecipe(recipe);
    return recipe;
}

export function sortRecipe(receipt : Receipt) : Item[] {
    let sortedItems = receipt.items.sort((a , b) => a.name.localeCompare(b.name))
    return sortedItems
}

export function deleteManyFromRecipe(receipt : Receipt, toDelete : boolean[]):Receipt {
    if(toDelete.length != receipt.items.length) throw new Error('selected Array of incorrect size');
    receipt.items.forEach((item, index) => {
        if(toDelete[index]) item.quantity -= 1;
    })
    receipt.items = receipt.items.filter((item) => item.quantity != 0);
   
   receipt.cost = adjustCost(receipt);
   return receipt;
}

export function deleteFromRecipe(receipt : Receipt, itemToRemove : Item) : Receipt{
    const itemInRecipe = receipt.items.find((item) => item.name == itemToRemove.name);
    if (itemInRecipe == undefined) throw new Error('Item not in Recipe to Delete')
    if(itemInRecipe.quantity < itemToRemove.quantity) throw new Error('Quantity greater than amount left.');
    if(itemInRecipe.quantity == itemToRemove.quantity){
        receipt.items = receipt.items.filter((item) => item.name != itemToRemove.name);
    }
    else{
        itemInRecipe.quantity -= itemToRemove.quantity;
    }
    receipt.cost = adjustCost(receipt);
    return receipt
}

export function addManyToRecipe(receiptTo : Receipt, receiptFrom : Receipt, selected : boolean[]){
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

export function addToRecipe(receipt : Receipt, itemToAdd : Item) : Receipt{
    const itemInRecipe = receipt.items.find((item) => item.name == itemToAdd.name);
    if (itemInRecipe == undefined){
        // add to Recipe
        receipt.items.push(itemToAdd);
    }
    else {
        itemInRecipe.quantity += itemToAdd.quantity;
    }
    receipt.cost = adjustCost(receipt);
    receipt.items = sortRecipe(receipt);
    return receipt;
}




//function newRecipeFromData()

export function adjustCost(receipt  : Receipt) : string {
    let cost = 0;
    receipt.items.forEach((item) => cost += item.price * item.quantity)
    let service_charge = cost * receipt.charges[1].charge_value;
    cost = cost * (1+receipt.charges[0].charge_value);
    cost += service_charge;
    return cost.toFixed(2);
}

