import {useSelector } from "react-redux"
import "./users.css"
import { RootState } from "../../store/store";
import UserComp from "./user";

export default function UserContainer() {
    const users = useSelector((state : RootState) => state.session.users)
    const currentSelectedUsers = useSelector((state: RootState) => state.session.currentSelectedUsers)

    return (
        <div id="userContainer">
            <h1>Diners</h1>
            <div id="userList">
                {users.map((user,index) => <UserComp key={index} user={user}  index={index} isCurrentUser={currentSelectedUsers[index]}/>)}
            </div>
        </div>
    )
}