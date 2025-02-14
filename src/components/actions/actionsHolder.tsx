import { useDispatch, useSelector} from "react-redux"
import { RootState } from "../../store/store";
import { addItemToOneUser, splitItem } from "../../store/session";
import ActionButton from "./actionButton";

export default function ActionHolder() {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.session);

    const numUsersSelected = state.currentSelectedUsers.reduce((total , isSelected)=> total += (isSelected)? 1 : 0, 0 );
    const numItemsSelected = state.currentSelectedItems.reduce((total , isSelected)=> total += (isSelected)? 1 : 0, 0 );
    const sendItem = () => dispatch(addItemToOneUser());
    const splitItemFunc = () => dispatch(splitItem());

    return (
        <>
            {numUsersSelected === 1 && numItemsSelected > 0 && 
                <ActionButton label="Send Item" onClick={sendItem} />}
            {numItemsSelected === 1 && numUsersSelected > 1 && 
                <ActionButton label="Split" onClick={splitItemFunc} />}
        </>
    );
}