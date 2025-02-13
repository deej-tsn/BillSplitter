import { useDispatch } from "react-redux"
import "../setup.css"
import { removeUserFromSession } from "../../../store/session";


interface EditableUserProp {
    userName : string,
    index : number
}


export default function EditableUser({userName, index} : EditableUserProp) {

    const dispatch = useDispatch();

    function handleDelete(event : React.MouseEvent<HTMLTableCellElement>){
        event.preventDefault()
        dispatch(removeUserFromSession(index))

    }

    return (
        <tr>
            <td className="Name">{userName}</td>
            <td className="Delete" onClick={handleDelete}>X</td>
        </tr>
    )
}