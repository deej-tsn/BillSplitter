
import { useSelector } from "react-redux";
import "./items.css";
import { RootState } from "../../store/store";
import ItemComp from "./item";
import { Item } from "../../models/receipt";

export default function ItemsTable() {

    const receipt = useSelector((state : RootState) => state.session.leftOver)

    const selectedItems = useSelector((state : RootState) => state.session.currentSelectedItems)

    const listOfItems = receipt.items.map((item : Item, index:number) => (<ItemComp key={item.uuid} index={index} isSelected = {selectedItems[index]} item={item}/>))
    
    return (
        <>
            <div id="itemTableHolder" className="tableHolder">
                <table id="itemsTable">
                    <caption>Items Left:</caption>
                    <thead>
                        <tr>
                            <th className="Quantity">Quantity</th>
                            <th className="Name">Name</th>
                            <th className="Price">Price per Item</th>
                            <th className="Total">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOfItems}
                    </tbody>
                </table>
            </div>
            <h4><span style={{fontWeight : 400}}> Cost Left To Allocate :</span> £{receipt.cost}</h4>
        </>
    )
}