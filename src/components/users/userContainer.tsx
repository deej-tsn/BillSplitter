import {UsersController } from "../../models/users";
import AddUser from "./addUser";
import UserComp from "./user";
import "./users.css"

export default function UserContainer(userController : UsersController, setUsers : (users : UsersController) => void) {
    return (
        <div id="userContainer">
            <div id="userList">
                {userController.users.map((user) => UserComp(user, userController, setUsers))}
            </div>
            {AddUser(userController, setUsers)}
        </div>
    )
}