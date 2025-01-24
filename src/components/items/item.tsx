import { DeleteToItemsLeft, Item } from "../../models/items";
import { AddItemToUser, UsersController } from "../../models/users";
import ItemList from "./itemList";
import "./items.css";

export default function ItemComp(item:Item, userController : UsersController) {

    function handleClick(event:React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        console.log(event.currentTarget);
        console.log(userController.currentUser);
        if(userController.currentUser){
            AddItemToUser(userController.currentUser, item);
        }
        
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
