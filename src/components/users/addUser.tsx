import { createUser } from "../../models/session";
import { useDispatch } from "react-redux";


export default function AddUser() {

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
        <form onSubmit={SubmitForm}>
            <input autoComplete="off" type="text" placeholder="Name" name="name"/>
        <button type="submit">Add User</button>
        </form>
        
    )
}