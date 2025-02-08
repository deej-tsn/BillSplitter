import { FormEvent, useState} from "react";
import { Item } from "../../models/item";
import { Receipt } from "../../models/receipt";
import EditableItem from "./editableItem";
import { changeState, editItemsDispatch } from "../../models/session";
import { useDispatch } from "react-redux";


interface EditItemsProp {
    receipt : Receipt
}

export default function EditItems({receipt} : EditItemsProp ){

    const [newItems, setItems] = useState(receipt.items)
    const dispatch = useDispatch();

    let editItemsComp = newItems.map((item : Item, index : number) => <EditableItem item={item} index={index} newItems = {newItems} setItems = {setItems}/>);

    function handleSubmit(event : FormEvent<HTMLFormElement>) {
        event.preventDefault()
        console.log(newItems);
        dispatch(editItemsDispatch(newItems))
        dispatch(changeState('WORKING'))
    }

    return (
        <>
            <div id="blur">
            </div>
            <form id="editItem" onSubmit={handleSubmit}>
            {editItemsComp}
            <button type="submit">Submit</button>
            </form>
        </>
        
    )
}