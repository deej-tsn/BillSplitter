import {useSelector } from "react-redux"
import "./users.css"
import { RootState } from "../../store/store";
import UserComp from "./user";

export default function UserContainer() {
    const users = useSelector((state : RootState) => state.session.users)
    const currentSelectedUsers = useSelector((state: RootState) => state.session.currentSelectedUsers)
    const rows = users.map((user,index) => <UserComp key={index} user={user}  index={index} isCurrentUser={currentSelectedUsers[index]}/>)

    return (
        <div id="userTableHolder"className="tableHolder">
            <table id="userTable">
                <caption>Diners</caption>
                <thead>
                    <tr>
                        <th className="Name">Name</th>
                        <th className="NumOfItems"># Of Items</th>
                        <th className="Total">Total</th>
                        <th className="Expand"></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}