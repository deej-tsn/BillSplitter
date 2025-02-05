
import "./items.css";
import { Dispatch } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { Item } from "../../models/item";
import { setCurrentItem } from "../../models/session";

export default function ItemComp(key:number, isCurrentItem: boolean,  item : Item, dispatch :Dispatch<UnknownAction>) {

    function handleClick(event:React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        dispatch(setCurrentItem(key))
    }

    return (
        <div onClick={handleClick} key={key} className="item" id={isCurrentItem? "currentItem" : undefined}>
            <div>
                <h2 className="itemName">{item.name}</h2>
                <h4 className="itemPrice">Price : £{item.price.toFixed(2)}</h4>
            </div>
            
            <h4 className="itemQuantity">{item.quantity}</h4>
            
        </div>
    )
}
