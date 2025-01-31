
import { deleteFromItemsLeft, Item } from "../../models/items";
import "./items.css";
import { addItemToUser, User } from "../../models/session";
import { Dispatch } from "react";
import { UnknownAction } from "@reduxjs/toolkit";

export default function ItemComp(key:number , item : Item, currentUser : User | null, dispatch :Dispatch<UnknownAction>) {
    
   

    function handleClick(event:React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        console.log(currentUser)
        if(currentUser){
            let newItem : Item = {
                name : item.name,
                quantity : 1,
                price : item.price
            }
            
            dispatch(addItemToUser({userName : currentUser.name, item : newItem}))
            dispatch(deleteFromItemsLeft(newItem))
        }


    }

    return (
        <div onClick={handleClick} key={key} className="item">
            <div>
                <h2 className="itemName">{item.name}</h2>
                <h4 className="itemPrice">Price : £{item.price}</h4>
            </div>
            
            <h4 className="itemQuantity">{item.quantity}</h4>
        </div>
    )
}
