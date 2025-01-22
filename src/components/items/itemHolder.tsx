import { ItemsLeft } from "../../models/items";
import ItemList from "./itemList";

export default function ItemHolder(itemsLeft :ItemsLeft) {
    return (

        <div>
            <h1>Items Left</h1>
            {ItemList(itemsLeft.items)}

        </div>
    )
}