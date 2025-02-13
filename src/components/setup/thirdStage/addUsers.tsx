import {  useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { createUser } from "../../../store/session";
import "../setup.css";
import EditableUser from "./editableUser";

export default function addUsers(){
    const users = useSelector((state : RootState) => state.session.users)

    const rows = users.map((user, index) => <EditableUser key={user.uuid} userName={user.name} index={index}/>)
    const dispatch = useDispatch()
    
    function SubmitForm(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let details = event.target as unknown as {
            name: HTMLInputElement,
        };
        let value = details.name.value.trim();
        if(value != "") dispatch(createUser(value));
        details.name.value = '';
    }
    return (
        <form id="usersForm" onSubmit={SubmitForm}>
            <h1>Diners</h1>
            <hr/>
            <div id="usersTableHolder">
                <table id="usersTable">
                    <thead>
                        <tr>
                        <th className="Name">Name</th>
                        <th className="Delete"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
            <hr/>
            <div id="addUser">
                <input autoComplete="off" type="text" placeholder="Name" name="name"/>
                <button type="submit">Add User</button>
            </div>
            
        </form>
    )

}