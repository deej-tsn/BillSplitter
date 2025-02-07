import { Item } from "../../models/item";

export default function editableItem(item:Item, key:number) {
    return (
        <div key={key} className="editableItem">
            <input type="text" defaultValue={item.name}/>
            <div>
                <label>Price:</label>
                <input name="price" type="number" step="0.01" min="0" defaultValue={`${item.price}`}/>
            </div>
            <div>
                <label>Quantity:</label>
                <input name="quantity" type="number" step="1" min="0" defaultValue={`${item.quantity}`}/>
            </div>
            
        </div>
    )
}