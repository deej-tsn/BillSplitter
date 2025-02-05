import { addItemToUser } from "../../models/session";
import "./actions.css";

export default function SendItem(dispatch : any) {

      function handleClick(event:React.MouseEvent<HTMLDivElement>) {
            event.preventDefault();
            dispatch(addItemToUser())
        }
    
    return (
        <div onClick={handleClick} className="action">
            Send Item 
        </div>
    )
}