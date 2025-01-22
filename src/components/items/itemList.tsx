
import { Item } from "../../models/items";
import ItemComp from "./item";
import "./items.css";

export default function ItemList(items:Map<string, Item>) {
    let list : JSX.Element[] = []
    items.forEach((item:Item) => list.push(ItemComp(item)))
    return (
        <ul id="itemList">
            {list}
        </ul>
    )
}