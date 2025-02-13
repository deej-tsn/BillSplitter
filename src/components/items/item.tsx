
import "./items.css";
import { Item } from "../../models/receipt";
import { setCurrentItem } from "../../store/session";
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
        <tr onClick={handleClick} className={`item ${isSelected && 'selected'} `}>
                <td className="Quantity">{item.quantity}</td>
                <td className="Name">{item.name}</td>
                <td className="Price">{item.price.toFixed(2)}</td>
                <td className="Total">£{(item.price * item.quantity).toFixed(2)}</td>
        </tr>
    )
}
