
import { useSelector } from "react-redux";
import ItemList from "./itemList";
import { RootState } from "../../store/store";

export default function ItemHolder() {

    const cost = useSelector((state : RootState) => state.itemsLeft.cost)

    return (
        <div id="itemHolder">
            <h1>Items Left:</h1>
                {ItemList()}
            <h4>Cost Left To Allocate : {cost}</h4>
        </div>
    )
}