import { useDispatch, useSelector} from "react-redux"
import SendItem from "./sendItemToUser";
import { RootState } from "../../store/store";
import SplitItem from "./splitItem";

export default function ActionHolder(){

    const dispatch = useDispatch();
    const state = useSelector((state : RootState) => state.session)
    let numOfSelectedUsers = 0;
    let numOfItemsSelected = 0;
    state.currentSelectedItems.forEach((isSelected) => {if(isSelected) numOfItemsSelected++});
    state.currentSelectedUsers.forEach((isSelected) => {if(isSelected)numOfSelectedUsers++});

    return (
        <>
            {numOfSelectedUsers == 1 && numOfItemsSelected > 0 && SendItem(dispatch)}
            {numOfItemsSelected == 1 && numOfSelectedUsers > 1 && SplitItem(dispatch)}
        </>
    )
}