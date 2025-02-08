
import "./items.css";
import { Item } from "../../models/item";
import { setCurrentItem } from "../../models/session";
import { useDispatch } from "react-redux";

interface ItemCompProps {
    isSelected : boolean,
    item : Item,
    index : number
}

export default function ItemComp({isSelected,  item, index} : ItemCompProps) {

    const dispatch = useDispatch();

    function handleClick(event:React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        dispatch(setCurrentItem(index))
    }

    return (
        <div onClick={handleClick} className={`item ${isSelected && 'selected'} `}>
            <div>
                <h2 className="itemName">{item.name}</h2>
                <h4 className="itemPrice"><span style={{fontWeight : 400}}>Price : </span> £{item.price.toFixed(2)}</h4>
            </div>
            
            <h4 className="itemQuantity">{item.quantity}</h4>
            
        </div>
    )
}
