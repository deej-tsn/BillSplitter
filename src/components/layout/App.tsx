import {useSelector } from 'react-redux'
import './App.css'
import ItemHolder from '../items/itemHolder'
import UserContainer from '../users/userTable'
import { RootState } from '../../store/store'
import ActionHolder from '../actions/actionsHolder'
import ManageReceipt from '../setup/secondStage/manageReceipt'
import StageController from '../setup/stageController'


function App() {

  const session = useSelector((state : RootState) => state.session);

  return (
    <>
      {session.stage < 5&& <StageController/>}
      {session.stage == 5 && <div id="content">
          <ItemHolder/>
          <hr/>
          <UserContainer/>
          <hr/>
          <ActionHolder/>
        </div>}
    </>
  )
}

export default App
