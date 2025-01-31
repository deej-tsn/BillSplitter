import { Item } from "../../models/items";

export default function UserItem(item : Item){
    return(
        <li className="userItem">
            <h4>{item.name}</h4>
            <h4 className="userItemRight">{item.quantity}</h4>

        </li>
    )
}