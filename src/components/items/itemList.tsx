
import { Item } from "../../models/items";
import { UsersController } from "../../models/users";
import ItemComp from "./item";
import "./items.css";

export default function ItemList(items:Map<string, Item>, userController : UsersController) {
    let list : JSX.Element[] = []
    items.forEach((item:Item) => list.push(ItemComp(
        item,
        userController
    )))
    return (
        <div id="itemList">
            {list}
        </div>
    )
}