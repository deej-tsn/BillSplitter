import { useDispatch, useSelector } from "react-redux";
import { Item } from "../../../models/item";
import EditableItem from "./editableItem";
import EditableCharge from "./editableCharge";
import "../setup.css"
import { RootState } from "../../../store/store";

export default function ManageReceipt() {

    const receipt = useSelector((state : RootState) => state.session.leftOver)
    const dispatch = useDispatch();

    let editItemsComp = receipt.items.map((item : Item, index : number) => <EditableItem key={index} item={item} index={index}/>);
    let editChargesComp = receipt.charges.map((charge, index) => <EditableCharge key={index} charge={charge} index={index}/>)

    return (
        <>
            <form id="manageReceipt">
                <h3>Edit Items</h3>
                <hr/>
                <div id="editItems">
                    {editItemsComp}
                </div>
                <hr/>
                <h3>Edit Charges</h3>
                <div id="editCharges">
                    {editChargesComp}
                </div>
            <h3>Cost : £{receipt.cost}</h3>
            </form>
        </>
        
    )
}