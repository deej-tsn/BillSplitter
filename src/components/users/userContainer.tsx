import {useSelector } from "react-redux"
import "./users.css"
import { RootState } from "../../store/store";
import UserComp from "./user";
import AddUser from "./addUser";

export default function UserContainer() {
    const users = useSelector((state : RootState) => state.session.users)
    const currentSelectedUsers = useSelector((state: RootState) => state.session.currentSelectedUsers)

    return (
        <div id="userContainer">
            <h1>Eaters</h1>
            <div id="userList">
                {users.map((user,index) => <UserComp key={index} user={user}  index={index} isCurrentUser={currentSelectedUsers[index]}/>)}
            </div>
            <AddUser/>
        </div>
    )
}