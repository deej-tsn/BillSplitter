import { CreateUser, UserFormData, UsersController } from "../../models/users";

export default function AddUser(userController : UsersController, setUser : (user : UsersController) => void) {

    function SubmitForm(event:React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        let details = event.target as UserFormData;
        const newUser = CreateUser(details.name.value)
        const newUserController : UsersController= {
            users : [...userController.users, newUser],
            currentUser : newUser
        }
        setUser(newUserController)
    }


    return (
        <form onSubmit={SubmitForm}>
            <input autoComplete="off" type="text" placeholder="Name" name="name"/>
        <button type="submit">Add User</button>
        </form>
        
    )
}