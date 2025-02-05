
import { setCurrentUser} from "../../models/session"
import UserItem from "./userItem"
import "./users.css"
import { User } from "../../models/receipt"
import { Dispatch, UnknownAction } from "@reduxjs/toolkit"
export default function UserComp(user : User, index:number, isCurrentUser:boolean,  dispatch : Dispatch<UnknownAction>) {

    
    function handleClick(event : React.MouseEvent<HTMLDivElement>){
        event.preventDefault()
        dispatch(setCurrentUser(index))
    }
    return (
        <div key={user.name} onClick={handleClick} className={`user ${isCurrentUser? 'selected' : '' }`}>
            <div className="userHero">
                <div>
                    <h1 className="userName">{user.name}</h1>
                    <h4 className="userQuantity">has {user.recipe.items.length} items</h4>
                </div>
                    <h4 className="userCost">£{user.recipe.cost}</h4>
            </div>
            <ul className="userItemList">
                {user.recipe.items.map((item, userIndex) => UserItem(user, item, userIndex,  dispatch))}
            </ul>
        </div>

    )
}