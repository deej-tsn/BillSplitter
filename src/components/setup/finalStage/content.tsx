import ActionHolder from "../../actions/actionsHolder";
import ItemsTable from "../../items/itemsTable";
import UsersTable from "../../users/usersTable";

export default function Content() {
    return (
        <>
            <ItemsTable/>
            <hr/>
            <UsersTable/>
            <hr/>
            <ActionHolder/>
        </>
    )
}