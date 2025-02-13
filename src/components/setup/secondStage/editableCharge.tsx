import { useDispatch } from "react-redux";
import { Charge,} from "../../../models/receipt";
import { removeChargeFromLeftOver, updateChargeInLeftOver } from "../../../store/session";

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
        dispatch(updateChargeInLeftOver({charge: newCharge, index : index}))
    }

    function handleDelete(event : React.MouseEvent<HTMLTableCellElement>){
        event.preventDefault()
        dispatch(removeChargeFromLeftOver(index))

    }
    return (
        <tr>
            <td className="Name"><input onChange={(e) => handleChange(index,'name', e.target.value)}  name="chargeName" type="text" defaultValue={charge.name}/></td>
            <td className="Percentage"><input onChange={(e) => handleChange(index, 'percentage', e.target.value)} className="priceInput" name="charge_value" type="number" step="1" min="-100" inputMode="numeric" defaultValue={`${charge.percentage}`}/></td>
            <td className="Delete" onClick={handleDelete}>X</td>
        </tr>
               
    )
}
