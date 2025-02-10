import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import "../setup.css"
import EditableCharge from "./editableCharge";

export default function EditChargesTable(){

    const receipt = useSelector((state : RootState) => state.session.leftOver)
    let editChargesComp = receipt.charges.map((charge, index) => <EditableCharge key={index} charge={charge} index={index}/>)

    return (
        <table id="editChargesTable">
            <caption>Additional Charges</caption>
            <thead>
                <tr>
                    <th className="Name">Name</th>
                    <th className="Pecentage">Percentage</th>
                    <th className="Difference">Difference</th>
                </tr>
            </thead>
            <tbody>
                {editChargesComp}
            </tbody>
        </table>
    )
}