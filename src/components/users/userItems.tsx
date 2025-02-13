import { User, Item } from "../../models/receipt";
import { removeItemFromUser, setCurrentUser } from "../../store/session";
import { useDispatch } from "react-redux";

interface UserItemsProp {
    user : User,
    item : Item, 
    userIndex: number, 
}

export default function UserItems({user, item, userIndex} : UserItemsProp){

    const dispatch = useDispatch()

    function buttonHandler(event : React.MouseEvent<HTMLTableCellElement>){
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
        <tr className="userItem">
            <td className="Name">{item.name}</td>
            <td className="NumOfItems">{item.quantity}</td>
            <td></td>
            <td className="Delete" onClick={buttonHandler}>X</td>
        </tr>
    )
}