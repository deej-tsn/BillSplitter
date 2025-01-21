import './App.css'
import data from '../data/test_data.json'
import { Item, ItemsLeft, newItemsLeft } from './models/items'
import ItemList from './components/items/itemList'
import { useState } from 'react'
import { User } from './models/users'


function App() {

  let items = data.items

  items.map((item) => {
    item as Item
  })
  items = items as Item[]

  const [ItemsLeft, setItemsLeft] = useState<ItemsLeft>(newItemsLeft(items))

  const [Users, setUsers] = useState<User[]>([]);



  return (
    <>
      {ItemList(items)}
      
    </>
  )
}

export default App
