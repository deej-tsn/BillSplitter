import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import "../setup.css"
import EditableCharge from "./editableCharge";
import { Charge } from "../../../models/receipt";
import { useState } from "react";
import { addChargeToLeftOver } from "../../../store/session";
import { nanoid } from "@reduxjs/toolkit";

export default function EditChargesTable(){

    const receipt = useSelector((state : RootState) => state.session.leftOver)
    let editChargesComp = receipt.charges.map((charge, index) => <EditableCharge key={charge.uuid} charge={charge} index={index}/>)
    const dispatch = useDispatch()

    const [chargeCounter, incrementItemCounter] = useState(0);

    function handleButton(event : React.MouseEvent<HTMLButtonElement>){
        event.preventDefault()

        let exampleCharge : Charge = {
            uuid : nanoid(),
            name: `Example Charge ${chargeCounter}`,
            percentage : 10
        }

        dispatch(addChargeToLeftOver(exampleCharge))
        incrementItemCounter(chargeCounter + 1);
    }


    return (
        <div id="editChargesHolder" className="tableHolder">
            <table id="editChargesTable">
                <caption>Additional Charges</caption>
                <thead>
                    <tr>
                        <th className="Name">Name</th>
                        <th className="Pecentage">Percentage</th>
                        <th className="Delete"></th>
                    </tr>
                </thead>
                <tbody>
                    {editChargesComp}
                </tbody>
            </table>
            <button onClick={handleButton}>Add New Charge</button>
        </div>
    )
}