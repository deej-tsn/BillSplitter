import './App.css'
import data from '../data/test_data.json'
import { Item } from './models/items'
import ItemList from './components/items/itemList'


function App() {

  let items = data.items

  items.map((item) => {
    item as Item
  })
  items = items as Item[]

  return (
    <>
      {ItemList(items)}
    </>
  )
}

export default App
