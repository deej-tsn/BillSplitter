import { useDispatch, useSelector } from "react-redux";
import { Item } from "../../../models/receipt";
import EditableItem from "./editableItem";
import { RootState } from "../../../store/store";
import "../setup.css"
import { addItemToLeftOver } from "../../../store/session";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

export default function EditItemTable(){

    const receipt = useSelector((state : RootState) => state.session.leftOver)
    const dispatch = useDispatch()

    const editItemsComp = receipt.items.map((item : Item, index : number) => <EditableItem key={item.uuid} item={item} index={index}/>);
    const [itemCounter, incrementItemCounter] = useState(0);
    

    function handleButton(event : React.MouseEvent<HTMLButtonElement>){
        event.preventDefault()

        const exampleItem : Item = {
            uuid: nanoid(),
            name: `Example Item ${itemCounter}`,
            price: 10,
            quantity: 1
        }

        dispatch(addItemToLeftOver(exampleItem))
        incrementItemCounter(itemCounter + 1);
    }

    return (
        <div id="editTableHolder" className="tableHolder">
            <table id="editItemsTable">
                <caption>Items</caption>
                <thead>
                    <tr>
                        <th className="Quantity">Quantity</th>
                        <th className="Name">Name</th>
                        <th className="Price">Price per Item</th>
                        <th className="Total">Total</th>
                        <th className="Delete"></th>
                    </tr>
                </thead>
                <tbody>
                    {editItemsComp}
                </tbody>
                
            </table>
            <button onClick={handleButton}>Add New Item</button>
        </div>
    )
}