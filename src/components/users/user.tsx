
import { User } from "../../models/users"
import "./users.css"
export default function UserComp(user : User) {
    function handleClick(event : React.MouseEvent<HTMLDivElement>){
        event.preventDefault()
    }
    return (
        <div key={user.name} onClick={handleClick} className="user">
            <div>
                <h1 className="userName">{user.name}</h1>
                <h4 className="userQuantity">has {Object.keys(user.items).length} items</h4>
            </div>
                <h4 className="userCost">£{user.cost}</h4>
        </div>

    )
}