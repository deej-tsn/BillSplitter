import { CreateUser, User } from "../../models/users";

export default function AddUser(users : User[], setUser : (user : User[]) => void) {
    return (
        <button onClick={() => setUser([...users,CreateUser("Allie")])}>Add User</button>
    )
}