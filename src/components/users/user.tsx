import { User } from "../../models/users";

export default function UserComp(user:User) {
    return (
        <div>
            <div>
                <h1>{user.name}</h1>
                <h4>has {user.items.size} items</h4>
            </div>
            <div>
                <h1>{user.cost}</h1>
            </div>
        </div>

    )
}