import { useSelector } from 'react-redux'
import './App.css'
import ItemHolder from './components/items/itemHolder'
import UserContainer from './components/users/userContainer'
import { RootState } from './store/store'
import ActionHolder from './components/actions/actionsHolder'
function App() {

  const session = useSelector((state : RootState) => state.session);
  console.log(session);

  return (
    <>
      {ItemHolder()}
      {UserContainer()}
      {ActionHolder()}
    </>
  )
}

export default App
