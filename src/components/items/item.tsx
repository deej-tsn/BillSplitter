import { Item } from "../../models/items";
import "./items.css";

export default function ItemComp(item : Item) {

    function handleClick(event:React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
    }

    return (
        <div onClick={handleClick} key={item.name} className="item">
            <div>
                <h2 className="itemName">{item.name}</h2>
                <h4 className="itemPrice">Price : £{item.price}</h4>
            </div>
            
            <h4 className="itemQuantity">{item.quantity}</h4>
        </div>
    )
}
