import { useDispatch } from "react-redux";
import { Item } from "../../../models/item";
import { updateItemInReceipt } from "../../../models/session";

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
        dispatch(updateItemInReceipt({item : newItem, index : index}))
    }
    return (
        <>
            <hr/>
            <div className="editable">
                
                <div>
                    <label>Name:</label>
                    <input onChange={(e) => handleChange(index,'name', e.target.value)}  name="itemName" type="text" defaultValue={item.name}/>
                </div>
                <div className="editableNumbers">
                    <div>
                        <label>Price: <span style={{fontWeight:"400"}}>£</span></label>
                        <input onChange={(e) => handleChange(index, 'price', e.target.value)} className="priceInput" name="price" type="number" step="0.01" min="0" defaultValue={`${item.price}`}/>
                    </div>
                    <div>
                        <label>Quantity:</label>
                        <input onChange={(e) => handleChange(index, 'quantity', e.target.value)}  className="quantityInput" name="quantity" type="number" step="1" min="0" defaultValue={`${item.quantity}`}/>
                    </div>
                </div>
            </div>
        
        
        </>
        
    )
}