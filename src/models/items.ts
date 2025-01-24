import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import data from '../../data/test_data.json';


export type Item = {
    name: string;
    price: number;
    quantity: number;
  };
  

type ItemsLeftState = {
  items: Record<string, Item>;
  cost: number;
};

const setupItems = () => {
    let items : Record<string, Item> = {};
    data.items.map((item : Item) => items[item.name] = item)
    return items;

}

const setUpCost = () => {
    let cost = 0
    data.items.forEach((item : Item) => cost += item.price * item.quantity )
    return cost
}

const initialState: ItemsLeftState = {
  items: setupItems() ,
  cost: setUpCost(),
};

const itemsLeftSlice = createSlice({
  name: 'itemsLeft',
  initialState,
  reducers: {
    addItemsLeft: (state, action: PayloadAction<Item[]>) => {
      action.payload.forEach(item => {
        if (state.items[item.name]) {
          state.items[item.name].quantity += item.quantity;
        } else {
          state.items[item.name] = item;
        }
        state.cost += item.price * item.quantity;
      });
    },
    deleteFromItemsLeft: (state, action: PayloadAction<Item>) => {
      const item = action.payload;
      if (state.items[item.name]) {
        const currentItem = state.items[item.name];
        if (item.quantity === currentItem.quantity) {
          delete state.items[item.name];
        } else if (item.quantity > currentItem.quantity) {
          throw new Error('Quantity greater than amount left.');
        } else {
          currentItem.quantity -= item.quantity;
        }
        state.cost -= item.price * item.quantity;
      } else {
        throw new Error('No instances of item in Items Left');
      }
    },
  },
});

export const { addItemsLeft, deleteFromItemsLeft } = itemsLeftSlice.actions;
export default itemsLeftSlice.reducer;
