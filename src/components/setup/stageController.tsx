import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import StageIndicator from "./stageIndicator";
import Intro from "./intro/intro";
import ManageReceipt from "./secondStage/manageReceipt";
import AddUsers from "./thirdStage/addUsers";
import GenerateReceiptFromPhoto from "./firstStage/generateReceiptFromPhoto";
import Content from "./finalStage/content";

export default function StageController(){

    const stage = useSelector((state : RootState) => state.session.stage)
    
    const stageComp = [<Intro/>, <GenerateReceiptFromPhoto/>, <ManageReceipt/>, <AddUsers/>, <Content/>]

    return (
        <div id="stageController">
            {stageComp[stage-1]}
            {stage <=4  && <StageIndicator stageIndex={stage}/>}
        </div>
    )
}