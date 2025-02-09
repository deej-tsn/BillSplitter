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
    <>
      {session.state === 'WORKING' && 
        <div id="content">
          <ItemHolder/>
          <hr/>
          <UserContainer/>
          <hr/>
          <ActionHolder/>
        </div>
      }
      
      {session.state === 'SETUP' && <EditItems receipt={session.leftOver}/>}
    </>

  )
}

export default App
