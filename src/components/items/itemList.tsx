
import { useDispatch, useSelector } from "react-redux";
import "./items.css";
import { RootState } from "../../store/store";
import ItemComp from "./item";
import { Item } from "../../models/items";

export default function ItemList() {

    const items = useSelector((state : RootState) => state.itemsLeft.items)
    const dispatch = useDispatch();

    const currentUser = useSelector((state : RootState) => state.users.currentUser)

    console.log(items)
    const listOfItems : JSX.Element[] = items.map((item : Item, key) => (ItemComp(key, item, currentUser, dispatch)))
    
    return (
        <div id="itemList">
            {listOfItems}
        </div>
    )
}