import { useSelector } from "react-redux";
import "../setup.css"
import { RootState } from "../../../store/store";
import EditItemTable from "./editItemsTable";
import EditChargesTable from "./editChargeTable";

export default function ManageReceipt() {

    const receipt = useSelector((state : RootState) => state.session.leftOver)
    return (
        <>
            <form id="manageReceipt">
                <h3>Edit Receipt</h3>
                <hr/>
                <EditItemTable/>
                <hr/>
                <EditChargesTable/>           
            <h3>Cost : £{receipt.cost}</h3>
            </form>
        </>
        
    )
}