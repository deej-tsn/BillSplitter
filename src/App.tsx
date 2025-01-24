import './App.css'
import data from '../data/test_data.json'
import { Item, ItemsLeft, newItemsLeft } from './models/items'
import ItemList from './components/items/itemList'
import { useState } from 'react'
import { User, UsersController } from './models/users'
import ItemHolder from './components/items/itemHolder'
import UserContainer from './components/users/userContainer'


function App() {

  let items = data.items

  items.map((item) => {
    item as Item
  })
  items = items as Item[]

  const [itemsLeft, setItemsLeft] = useState<ItemsLeft>(newItemsLeft(items))

  const [Users, setUsers] = useState<UsersController>({users : [],
    currentUser : null
  });



  return (
    <>
      {ItemHolder(itemsLeft, Users)}
      {UserContainer(Users, setUsers)}
    </>
  )
}

export default App
