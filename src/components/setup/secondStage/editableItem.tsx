import { useDispatch } from "react-redux";
import { Item } from "../../../models/item";
import { removeItemFromLeftOver, updateItemInLeftOver} from "../../../models/session";

interface EditableItemProp {
    item : Item,
    index : number
}

export default function EditableItem({item, index} : EditableItemProp) {

    const dispatch = useDispatch()

    function handleChange(index : number, field:'price'|'quantity'|'name', value: string){
        
        let newItem : Item = {
            ...item
        }
        if(field === 'price' || field === 'quantity'){
            newItem[field] = parseFloat(value);
        }else{
            newItem["name"] = value;
        }
        dispatch(updateItemInLeftOver({item : newItem, index : index}))
    }

    function handleDelete(event : React.MouseEvent<HTMLTableCellElement>){
        event.preventDefault()
        dispatch(removeItemFromLeftOver(index))

    }
    return (
        <tr className="itemRow">
            <td className="Quantity"><input onInput={(e) => handleChange(index, 'quantity', e.currentTarget.value)}  className="quantityInput" name="quantity" type="number" step="1" min="0" inputMode="numeric" defaultValue={`${item.quantity}`}/></td>
            <td className="Name"><input onInput={(e) => handleChange(index,'name', e.currentTarget.value)}  name="itemName" type="text" defaultValue={item.name}/></td>
            <td className="Price"><input onInput={(e) => handleChange(index, 'price', e.currentTarget.value)} className="priceInput" name="price" type="number" step="0.01" min="0" inputMode="decimal" defaultValue={`${item.price.toFixed(2)}`}/></td>
            <td className="Total">£{(item.price * item.quantity).toFixed(2)}</td>
            <td className="Delete" onClick={handleDelete}>X</td>
        </tr>
    )
}