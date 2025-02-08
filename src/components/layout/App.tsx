import {useSelector } from 'react-redux'
import './App.css'
import ItemHolder from '../items/itemHolder'
import UserContainer from '../users/userContainer'
import { RootState } from '../../store/store'
import ActionHolder from '../actions/actionsHolder'
import EditItems from '../items/editItems'


function App() {

  const session = useSelector((state : RootState) => state.session);

  return (
    <div id="content">
      {session.state === 'WORKING' && <ItemHolder/>}
      <hr/>
      { session.state === 'WORKING' && <UserContainer/>}
      <hr/>
      { session.state === 'WORKING' && <ActionHolder/>}
      {session.state === 'SETUP' && <EditItems receipt={session.leftOver}/>}
    </div>
  )
}

export default App
