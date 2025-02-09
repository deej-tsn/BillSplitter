
import { useDispatch, useSelector } from "react-redux";
import "./items.css";
import { RootState } from "../../store/store";
import ItemComp from "./item";
import { Item } from "../../models/item";

export default function ItemList() {

    const items = useSelector((state : RootState) => state.session.leftOver.items)

    const selectedItems = useSelector((state : RootState) => state.session.currentSelectedItems)

    const listOfItems = items.map((item : Item, index:number) => (<ItemComp key={index} index={index} isSelected = {selectedItems[index]} item={item}/>))
    
    return (
        <div id="itemList">
            {listOfItems}
        </div>
    )
}