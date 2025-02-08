
import { setCurrentUser} from "../../models/session"
import "./users.css"
import { User } from "../../models/receipt"
import downArrow from "../../assets/downArrow.svg";
import { useDispatch } from "react-redux";
import UserItems from "./userItems";

interface UserCompProps {
    user : User,
    index: number,
    isCurrentUser : boolean
}

export default function UserComp({user, index,isCurrentUser} : UserCompProps) {
    
    const dispatch = useDispatch();

    function handleClick(event : React.MouseEvent<HTMLDivElement>){
        event.preventDefault()
        dispatch(setCurrentUser(index))
    }


    function flipItemListState(event : any){
        event.preventDefault()
        event.stopPropagation()
        if(event.target.parentElement.parentElement){
            let div : HTMLDivElement = event.target.parentElement.parentElement
            div.classList.toggle('closed')
            div.classList.toggle('open')
        }
    }
    return (
        <div onClick={handleClick} className={`user  closed`}>
            <div className={`userHero ${isCurrentUser && 'selected'}`}>
                <div>
                    <h1 className="userName">{user.name}</h1>
                    <h4 className="userQuantity">has {user.recipe.items.length} items</h4>
                </div>
                    <h4 className="userCost">£{user.recipe.cost}</h4>
                <img className='userArrow'src={downArrow} onClick={flipItemListState}/>
            </div>
            <ul className="userItemList">
                {user.recipe.items.map((item, userIndex) => <UserItems key={index} user={user} item={item} userIndex={userIndex}/>)}
            </ul>
        </div>

    )
}