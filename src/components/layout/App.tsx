import { useSelector } from 'react-redux'
import './App.css'
import ItemHolder from '../items/itemHolder'
import UserContainer from '../users/userContainer'
import { RootState } from '../../store/store'
import ActionHolder from '../actions/actionsHolder'
import editItems from '../items/editItems'
function App() {

  const session = useSelector((state : RootState) => state.session);
  console.log(session);

  return (
    <div id="content">
      {ItemHolder()}
      <hr/>
      {UserContainer()}
      <hr/>
      {ActionHolder()}
      {editItems(session.leftOver)}
    </div>
  )
}

export default App
