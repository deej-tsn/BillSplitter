
import "./items.css";
import { Dispatch } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { Item, User } from "../../models/receipt";
import { addItemToUser } from "../../models/session";

export default function ItemComp(key:number , item : Item, currentUser : User | null, dispatch :Dispatch<UnknownAction>) {

    function handleClick(event:React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        console.log(currentUser);
        if(currentUser){
            let newItem : Item = {
                name : item.name,
                quantity : 1,
                price : item.price
            }
            
            dispatch(addItemToUser(newItem))
        }


    }

    return (
        <div onClick={handleClick} key={key} className="item">
            <div>
                <h2 className="itemName">{item.name}</h2>
                <h4 className="itemPrice">Price : £{item.price.toFixed(2)}</h4>
            </div>
            
            <h4 className="itemQuantity">{item.quantity}</h4>
            
        </div>
    )
}
