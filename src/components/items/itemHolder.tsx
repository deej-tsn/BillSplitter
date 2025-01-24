import { ItemsLeft } from "../../models/items";
import { UsersController } from "../../models/users";
import ItemList from "./itemList";

export default function ItemHolder(itemsLeft :ItemsLeft, userController : UsersController) {
    return (

        <div id="itemHolder">
            <h1>Items Left:</h1>
            {ItemList(itemsLeft.items, userController)}
            <h4>Cost Left To Allocate : {itemsLeft.cost}</h4>
        </div>
    )
}