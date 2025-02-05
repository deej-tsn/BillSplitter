import { useDispatch} from "react-redux"
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