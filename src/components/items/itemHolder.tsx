
import { useSelector } from "react-redux";
import ItemTable from "./itemTable";
import { RootState } from "../../store/store";

export default function ItemHolder() {

    const cost = useSelector((state : RootState) => state.session.leftOver.cost)

    return (
        <>
            <ItemTable/>
            <h4><span style={{fontWeight : 400}}> Cost Left To Allocate :</span> £{cost}</h4>
        </>
        
    )
}