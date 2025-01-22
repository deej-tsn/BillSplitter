import { User } from "../../models/users";
import AddUser from "./addUser";
import UserComp from "./user";
import "./users.css"

export default function UserContainer(users : User[], setUsers : (users : User[]) => void) {
    return (
        <div id="userContainer">
            <div id="userList">
                {users.map((user) => UserComp(user))}
            </div>
            {AddUser(users,setUsers)}
        </div>
    )
}