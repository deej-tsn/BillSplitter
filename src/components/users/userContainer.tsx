import { useSelector } from "react-redux"
import "./users.css"
import { RootState } from "../../store/store";
import UserComp from "./user";
import AddUser from "./addUser";

export default function UserContainer() {
    const users = useSelector((state : RootState) => state.users.users)

    return (
        <div id="userContainer">
            <div id="userList">
                {users.map((user) => UserComp(user))}
            </div>
            {AddUser()}
        </div>
    )
}