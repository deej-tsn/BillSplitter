
import "./items.css";
import { Dispatch } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { addItemToUser } from "../../models/session";
import { Item } from "../../models/item";

export default function ItemComp(key:number , item : Item, currentUser : number | null, dispatch :Dispatch<UnknownAction>) {

    function handleClick(event:React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        console.log(currentUser);
        if(currentUser != null){
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
