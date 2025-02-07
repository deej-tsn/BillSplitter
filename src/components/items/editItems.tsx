import { Item } from "../../models/item";
import { Receipt } from "../../models/receipt";
import editableItem from "./editableItem";

export default function editItems(recipe : Receipt){

    let editItemsComp = recipe.items.map((item : Item, index : number) => editableItem(item,index))

    return (
        <>
            <div id="blur">
            </div>
            <form id="editItem">
            {editItemsComp}
            <button id="">Submit</button>
            </form>
        </>
        
    )
}