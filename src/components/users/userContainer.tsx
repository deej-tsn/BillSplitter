import { useDispatch, useSelector } from "react-redux"
import "./users.css"
import { RootState } from "../../store/store";
import UserComp from "./user";
import AddUser from "./addUser";

export default function UserContainer() {
    const dispatch = useDispatch();
    const users = useSelector((state : RootState) => state.session.users)
    const currentUserIndex = useSelector((state: RootState) => state.session.currentUser)

    return (
        <div id="userContainer">
            <div id="userList">
                {users.map((user,index) => UserComp(user, index,(index==currentUserIndex),  dispatch))}
            </div>
            {AddUser(dispatch)}
        </div>
    )
}