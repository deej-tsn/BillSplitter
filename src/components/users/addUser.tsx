import { createUser } from "../../models/users";


export default function AddUser() {

    const dispatch = useDispatch();
    

    function SubmitForm(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        dispatch(createUser(event.))
    }


    return (
        <form onSubmit={SubmitForm}>
            <input autoComplete="off" type="text" placeholder="Name" name="name"/>
        <button type="submit">Add User</button>
        </form>
        
    )
}