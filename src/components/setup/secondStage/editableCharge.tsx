import { useDispatch } from "react-redux";
import { adjustCost, Charge, Receipt } from "../../../models/receipt";
import { updateChargeInReceipt } from "../../../models/session";

interface EditableChargeProps {
    charge : Charge,
    index : number
}

export default function EditableCharge({charge, index} : EditableChargeProps){

    const dispatch = useDispatch()

    function handleChange(index : number, field:'charge_value'|'name', value: string){
            
        let newCharge = {
            ...charge
        }
        if(field === 'charge_value'){
            newCharge[field] = parseFloat(value);
        }else{
            newCharge["name"] = value;
        }
        dispatch(updateChargeInReceipt({charge: newCharge, index : index}))
    }
    return (
        <div className="editable">
            <div>
                <label>Name:</label>
                <input onChange={(e) => handleChange(index,'name', e.target.value)}  name="chargeName" type="text" defaultValue={charge.name}/>
            </div>
            <div>
                <label>Percentage:</label>
                <input onChange={(e) => handleChange(index, 'charge_value', e.target.value)} className="priceInput" name="charge_value" type="number" step="0.01" min="-100" defaultValue={`${charge.charge_value}`}/>
            </div>
            
        </div>
    )
}