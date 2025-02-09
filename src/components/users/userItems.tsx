import { User } from "../../models/receipt";
import { removeItemFromUser, setCurrentUser } from "../../models/session";
import { Item } from "../../models/item";
import { useDispatch } from "react-redux";

interface UserItemsProp {
    user : User,
    item : Item, 
    userIndex: number, 
}

export default function UserItems({user, item, userIndex} : UserItemsProp){

    const dispatch = useDispatch()

    function buttonHandler(event : React.MouseEvent<HTMLButtonElement>){
        event.preventDefault()
        console.log(event);
        let defaultQuantity = 1;
        if(defaultQuantity > item.quantity) defaultQuantity = item.quantity;
        let newItem : Item = {
            name : item.name,
            quantity : defaultQuantity,
            price : item.price
        }
        dispatch(removeItemFromUser({
            user : user,
            item: newItem
        }))

        dispatch(setCurrentUser(userIndex))
    }

    return(
        <li className="userItem">
            <h4>{item.name}</h4>
            <h4 className="userItemRight">{item.quantity}</h4>
            <button onClick={buttonHandler}>remove</button>
        </li>
    )
}