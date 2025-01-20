import { Item } from "../../models/items";
import ItemComp from "./item";
import "./items.css";

export default function ItemList(items:Item[]) {
    return (
        <ul id="itemList">
            {items.map((item) => ItemComp(item))}

        </ul>
    )
}