
import "./items.css";
import { Dispatch } from "react";
import { UnknownAction } from "@reduxjs/toolkit";
import { Item } from "../../models/item";
import { setCurrentItem } from "../../models/session";

export default function ItemComp(key:number, isSelected: boolean,  item : Item, dispatch :Dispatch<UnknownAction>) {

    function handleClick(event:React.MouseEvent<HTMLDivElement>) {
        event.preventDefault();
        dispatch(setCurrentItem(key))
    }

    return (
        <div onClick={handleClick} key={key} className={`item ${isSelected && 'selected'} `}>
            <div>
                <h2 className="itemName">{item.name}</h2>
                <h4 className="itemPrice"><span style={{fontWeight : 400}}>Price : </span> £{item.price.toFixed(2)}</h4>
            </div>
            
            <h4 className="itemQuantity">{item.quantity}</h4>
            
        </div>
    )
}
