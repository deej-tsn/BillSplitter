import { User, UsersController } from "../../models/users";
import "./users.css"
export default function UserComp(user:User, userController : UsersController, setUsers : (userController : UsersController) => void) {
    function handleClick(event : React.MouseEvent<HTMLDivElement>){
        event.preventDefault()
        setUsers({...userController, currentUser : user})
    }
    return (
        <div key={user.name} onClick={handleClick} className="user">
            <div>
                <h1 className="userName">{user.name}</h1>
                <h4 className="userQuantity">has {user.items.size} items</h4>
            </div>
                <h4 className="userCost">£{user.cost}</h4>
        </div>

    )
}