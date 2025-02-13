
import { setCurrentUser} from "../../store/session";
import "./users.css"
import { User } from "../../models/receipt"
import downArrow from "../../assets/downArrow.svg";
import { useDispatch } from "react-redux";
import UserItems from "./userItems";
import { useState } from "react";

interface UserCompProps {
    user : User,
    index: number,
    isCurrentUser : boolean
}

export default function UserComp({user, index,isCurrentUser} : UserCompProps) {

    const userItems = user.receipt.items.map((item, userIndex) => <UserItems key={index} user={user} item={item} userIndex={userIndex}/>)
    
    const dispatch = useDispatch();
    const [expanded, setExpanded] = useState(false)

    function handleClick(event : React.MouseEvent<HTMLDivElement>){
        event.preventDefault()
        dispatch(setCurrentUser(index))
    }


    function flipItemListState(event : React.MouseEvent<HTMLImageElement>){
        event.preventDefault()
        event.stopPropagation()
        setExpanded(!expanded)
    }
    return (
        <>
            <tr onClick={handleClick} className={`user ${(expanded) ? 'open' : 'closed'} ${isCurrentUser && 'selected'}`}>
                <td className="Name">{user.name}</td>
                <td className="NumOfItems">{user.receipt.items.length}</td>
                <td className="Total">£{user.receipt.cost}</td>
                <td className="Expand"><img className='userArrow'src={downArrow} onClick={flipItemListState}/></td>
            </tr>

            {expanded && userItems}

        </>
       
    

    )
}