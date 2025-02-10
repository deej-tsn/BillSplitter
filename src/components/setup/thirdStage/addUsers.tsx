import {  useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { createUser } from "../../../models/session";
import "../setup.css";

export default function addUsers(){
    const users = useSelector((state : RootState) => state.session.users)
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
            <div id="users">
                {users.map((user, index) => <div key={index} className="user">{user.name}</div>)}
            </div>
            <hr/>
            <div id="addUser">
                <input autoComplete="off" type="text" placeholder="Name" name="name"/>
                <button type="submit">Add User</button>
            </div>
            
        </form>
    )

}