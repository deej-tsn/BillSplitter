import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import StageIndicator from "./stageIndicator";
import Intro from "./intro/intro";
import ManageReceipt from "./secondStage/manageReceipt";
import AddUsers from "./thirdStage/addUsers";
import GetPhotoFromUser from "./firstStage/getPhoto";

export default function StageController(){

    const stage = useSelector((state : RootState) => state.session.stage)
    
    const stageComp = [<Intro/>, <GetPhotoFromUser/>, <ManageReceipt/>, <AddUsers/>]

    return (
        <div id="stageController">
            {stageComp[stage-1]}
            <StageIndicator stageIndex={stage}/>
        </div>
    )
}