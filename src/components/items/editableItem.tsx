import { Item } from "../../models/item";

interface EditableItemProp {
    item : Item,
    index : number, 
    newItems : Item[],
    setItems : (x : Item[]) => void
}

export default function EditableItem({item, index, newItems, setItems } : EditableItemProp) {

    function handleChange(index : number, field:'price'|'quantity'|'name', value: string){
        
        let newItem = {
            ...newItems[index]
        }
        if(field === 'price' || field === 'quantity'){
            newItem[field] = parseFloat(value);
        }else{
            newItem["name"] = value;
        }
        let updatedItem = newItems.map((item, indexInArray) => (index == indexInArray)? newItem : item);
        setItems(updatedItem);
    }
    return (
        <div className="editableItem">
            <div>
                <label>Name:</label>
                <input onChange={(e) => handleChange(index,'name', e.target.value)}  name="itemName" type="text" defaultValue={item.name}/>
            </div>
            <div>
                <label>Price:</label>
                <input onChange={(e) => handleChange(index, 'price', e.target.value)} className="priceInput" name="price" type="number" step="0.01" min="0" defaultValue={`${item.price}`}/>
            </div>
            <div>
                <label>Quantity:</label>
                <input onChange={(e) => handleChange(index, 'quantity', e.target.value)}  className="quantityInput" name="quantity" type="number" step="1" min="0" defaultValue={`${item.quantity}`}/>
            </div>
            
        </div>
    )
}