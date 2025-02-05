import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store";
import SendItem from "./sendItemToUser";

export default function ActionHolder(){

    const dispatch = useDispatch();
    //const state = useSelector((state : RootState) => state.session)

    return (
        <div>
            {SendItem(dispatch)}

        </div>
    )
}