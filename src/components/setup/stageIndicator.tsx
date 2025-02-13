import { useDispatch } from "react-redux";
import "./setup.css"
import { nextStage, prevStage } from "../../store/session";

export default function StageIndicator({stageIndex}: {stageIndex:number}){

    const indicators = new Array(5).fill(true).map((_, index) => <div key={index} className={`indicator ${(stageIndex-1==index)? 'currentStage': ''}`}></div>)
    const dispatch = useDispatch()
    function handleLeftPress(event : React.MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        dispatch(prevStage());
    }

    function handleRightPress(event : React.MouseEvent<HTMLButtonElement>){
        event.preventDefault();
        dispatch(nextStage());
    }


    return(
        <div id="indicatorHolder">
            <button onClick={handleLeftPress}>&#x25c4;</button>
            {indicators}
            <button onClick={handleRightPress}>&#x25BA;</button>
        </div>
    )
}