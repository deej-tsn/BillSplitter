import { splitItem } from "../../models/session";

export default function SplitItem(dispatch : any){

    function handleClick(event:React.MouseEvent<HTMLDivElement>) {
                event.preventDefault();
                dispatch(splitItem())
            }

    return (
        <div className="action" onClick={handleClick}>
            Split
        </div>
    )
}