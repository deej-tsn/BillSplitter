import { ItemsLeft } from "../../models/items";
import ItemList from "./itemList";

export default function ItemHolder(itemsLeft :ItemsLeft) {
    return (

        <div id="itemHolder">
            <h1>Items Left:</h1>
            {ItemList(itemsLeft.items)}
            <h4>Cost Left To Allocate : {itemsLeft.cost}</h4>
        </div>
    )
}