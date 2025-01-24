
import { useSelector } from "react-redux";
import "./items.css";
import { RootState } from "../../store/store";
import ItemComp from "./item";
import { Item } from "../../models/items";

export default function ItemList() {

    const items = useSelector((state : RootState) => state.itemsLeft.items)
    const listOfItems = Object.values(items).map((item : Item) => ItemComp(item))

    return (
        <div id="itemList">
            {listOfItems}
        </div>
    )
}