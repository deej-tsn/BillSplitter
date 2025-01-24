
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from './items';


export type User = {
  name: string;
  items: Record<string, Item>; // Simplify with a plain object
  cost: number;
};

type UsersState = {
  users: User[];
  currentUser: User | null;
};

const initialState: UsersState = {
  users: [],
  currentUser: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<string>) => {
      const newUser: User = { name: action.payload, items: {}, cost: 0 };
      state.users.push(newUser);
    },
    setCurrentUser: (state, action: PayloadAction<string>) => {
      state.currentUser = state.users.find(user => user.name === action.payload) || null;
    },
    addItemToUser: (state, action: PayloadAction<{ userName: string; item: Item }>) => {
      const user = state.users.find(u => u.name === action.payload.userName);
      if (user) {
        const item = action.payload.item;
        if (user.items[item.name]) {
          user.items[item.name].quantity += item.quantity;
        } else {
          user.items[item.name] = item;
        }
        user.cost += item.price * item.quantity;
      }
    },
    removeItemFromUser: (state, action: PayloadAction<{ userName: string; item: Item }>) => {
      const user = state.users.find(u => u.name === action.payload.userName);
      if (user) {
        const item = action.payload.item;
        if (user.items[item.name]) {
          const currentItem = user.items[item.name];
          if (item.quantity === currentItem.quantity) {
            delete user.items[item.name];
          } else if (item.quantity > currentItem.quantity) {
            throw new Error('Quantity greater than amount left.');
          } else {
            currentItem.quantity -= item.quantity;
          }
          user.cost -= item.price * item.quantity;
        } else {
          throw new Error(`${user.name} does not have this item in their list`);
        }
      }
    },
  },
});

export const { createUser, setCurrentUser, addItemToUser, removeItemFromUser } = usersSlice.actions;
export default usersSlice.reducer;
