import { addItemToOneUser } from "../../models/session";
import "./actions.css";

export default function SendItem(dispatch : any) {

      function handleClick(event:React.MouseEvent<HTMLDivElement>) {
            event.preventDefault();
            dispatch(addItemToOneUser())
        }
    
    return (
        <div onClick={handleClick} className="action">
            Send Item 
        </div>
    )
}