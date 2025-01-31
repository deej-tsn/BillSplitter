import { useDispatch } from "react-redux";
import { createUser } from "../../models/session";


export default function AddUser() {

    const dispatch = useDispatch();
    

    function SubmitForm(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let details = event.target as unknown as {
            name: HTMLInputElement,
        };
        dispatch(createUser(details.name.value))
    }


    return (
        <form onSubmit={SubmitForm}>
            <input autoComplete="off" type="text" placeholder="Name" name="name"/>
        <button type="submit">Add User</button>
        </form>
        
    )
}