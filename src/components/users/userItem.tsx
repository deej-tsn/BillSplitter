import { Dispatch, UnknownAction } from "@reduxjs/toolkit";
import { Item, User } from "../../models/receipt";
import { removeItemFromUser, setCurrentUser } from "../../models/session";

export default function UserItem(user : User, item : Item, dispatch : Dispatch<UnknownAction>){

    function buttonHandler(event : React.MouseEvent<HTMLButtonElement>){
        event.preventDefault()
        console.log(event);
        let newItem : Item = {
            name : item.name,
            quantity : 1,
            price : item.price
        }
        dispatch(removeItemFromUser({
            user : user,
            item: newItem
        }))

        dispatch(setCurrentUser(user))
    }

    return(
        <li key={`${user.name}_${item.name}`} className="userItem">
            <h4>{item.name}</h4>
            <h4 className="userItemRight">{item.quantity}</h4>
            <button onClick={buttonHandler}>remove</button>

        </li>
    )
}