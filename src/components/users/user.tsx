
import { useDispatch } from "react-redux"
import { setCurrentUser} from "../../models/session"
import UserItem from "./userItem"
import "./users.css"
import { User } from "../../models/receipt"
export default function UserComp(user : User) {

    const dispatch = useDispatch()
    function handleClick(event : React.MouseEvent<HTMLDivElement>){
        event.preventDefault()

        console.log(user)
        dispatch(setCurrentUser(user.name))
    }
    return (
        <div key={user.name} onClick={handleClick} className="user">
            <div className="userHero">
                <div>
                    <h1 className="userName">{user.name}</h1>
                    <h4 className="userQuantity">has {user.recipe.items.length} items</h4>
                </div>
                    <h4 className="userCost">£{user.recipe.cost}</h4>
            </div>
            <ul className="userItemList">
                {user.recipe.items.map((item) => UserItem(item))}
            </ul>
        </div>

    )
}