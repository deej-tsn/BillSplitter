import { useDispatch, useSelector } from "react-redux";
import { Item } from "../../../models/item";
import EditableItem from "./editableItem";
import { RootState } from "../../../store/store";
import "../setup.css"
import { addItemToLeftOver } from "../../../models/session";
import { useState } from "react";

export default function EditItemTable(){

    const receipt = useSelector((state : RootState) => state.session.leftOver)
    const dispatch = useDispatch()
    let editItemsComp = receipt.items.map((item : Item, index : number) => <EditableItem key={index} item={item} index={index}/>);
    const [itemCounter, incrementItemCounter] = useState(0);
    

    function handleButton(event : React.MouseEvent<HTMLButtonElement>){
        event.preventDefault()

        let exampleItem : Item = {
            name: `Example Item ${itemCounter}`,
            price: 10,
            quantity: 1
        }

        dispatch(addItemToLeftOver(exampleItem))
        incrementItemCounter(itemCounter + 1);
    }

    return (
        <>
            <table id="editItemsTable">
                <caption>Items</caption>
                <thead>
                    <tr>
                        <th className="Quantity">Quantity</th>
                        <th className="Name">Name</th>
                        <th className="Price">Price per Item</th>
                        <th className="Total">Total</th>
                    </tr>
                </thead>
                <tbody>
                    {editItemsComp}
                </tbody>
                
            </table>
            <button onClick={handleButton}>Add New Item</button>
        </>
    )
}