import { useDispatch } from "react-redux";
import { adjustCost, Charge, Receipt } from "../../../models/receipt";
import { updateChargeInReceipt } from "../../../models/session";

interface EditableChargeProps {
    charge : Charge,
    index : number
}

export default function EditableCharge({charge, index} : EditableChargeProps){

    const dispatch = useDispatch()

    function handleChange(index : number, field:'percentage'|'name', value: string){
            
        let newCharge = {
            ...charge
        }
        if(field === 'percentage'){
            newCharge[field] = parseFloat(value);
        }else{
            newCharge["name"] = value;
        }
        dispatch(updateChargeInReceipt({charge: newCharge, index : index}))
    }
    return (
        <tr>
            <td className="Name"><input onChange={(e) => handleChange(index,'name', e.target.value)}  name="chargeName" type="text" defaultValue={charge.name}/></td>
            <td className="Percentage"><input onChange={(e) => handleChange(index, 'percentage', e.target.value)} className="priceInput" name="charge_value" type="number" step="1" min="-100" defaultValue={`${charge.percentage}`}/></td>
            <td className="Difference">-£10</td>
        </tr>
               
    )
}