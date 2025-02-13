import { useDispatch, useSelector} from "react-redux"
import { RootState } from "../../store/store";
import { addItemToOneUser, splitItem } from "../../store/session";
import ActionButton from "./actionButton";

export default function ActionHolder() {
    const dispatch = useDispatch();
    const state = useSelector((state: RootState) => state.session);

    const sendItem = () => dispatch(addItemToOneUser());
    const splitItemFunc = () => dispatch(splitItem());

    return (
        <>
            {state.currentSelectedUsers.length === 1 && state.currentSelectedItems.length > 0 && 
                <ActionButton label="Send Item" onClick={sendItem} />}
            {state.currentSelectedItems.length === 1 && state.currentSelectedUsers.length > 1 && 
                <ActionButton label="Split" onClick={splitItemFunc} />}
        </>
    );
}