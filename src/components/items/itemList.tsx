
import { useDispatch, useSelector } from "react-redux";
import "./items.css";
import { RootState } from "../../store/store";
import ItemComp from "./item";
import { Item } from "../../models/item";

export default function ItemList() {

    const items = useSelector((state : RootState) => state.session.leftOver.items)
    const dispatch = useDispatch();

    const currentItem = useSelector((state : RootState) => state.session.currentItem)

    //console.log(items)
    const listOfItems : JSX.Element[] = items.map((item : Item, key) => (ItemComp(key,(key == currentItem), item, dispatch)))
    
    return (
        <div id="itemList">
            {listOfItems}
        </div>
    )
}