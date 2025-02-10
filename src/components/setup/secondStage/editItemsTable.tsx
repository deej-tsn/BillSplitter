import { useSelector } from "react-redux";
import { Item } from "../../../models/item";
import EditableItem from "./editableItem";
import { RootState } from "../../../store/store";
import "../setup.css"

export default function EditItemTable(){

    const receipt = useSelector((state : RootState) => state.session.leftOver)
    let editItemsComp = receipt.items.map((item : Item, index : number) => <EditableItem key={index} item={item} index={index}/>);

    return (
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
    )
}