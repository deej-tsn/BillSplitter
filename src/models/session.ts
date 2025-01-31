
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addToRecipe, deleteFromRecipe, Item, newUser, Receipt, User } from './receipt';
import data from '../../data/test_data.json';



type Session = {
  users: User[];
  leftOver : Receipt,
  currentUser: User | null;
};

const initialState: Session = {
  users:[],
  leftOver : data,
  currentUser: null,
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<string>) => {
      const userName = action.payload;
      if (!state.users.find(user => user.name === userName)) {
        const user = newUser(userName, state.leftOver.charges);
        state.users.push(user);
        state.currentUser = user;
      }
    },
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    addItemToUser: (state, action: PayloadAction<Item>) => {
      const item = action.payload;
      if (state.currentUser == null) return;
      addToRecipe(state.currentUser.recipe, item);
      deleteFromRecipe(state.leftOver, item);
    
    },
    removeItemFromUser: (state , action: PayloadAction<Item>) => {
      const item = action.payload;
      if (state.currentUser == null) return; 
      addToRecipe(state.leftOver, item);
      deleteFromRecipe(state.currentUser.recipe, item);
    }
  },
});

export const { createUser, setCurrentUser, addItemToUser, removeItemFromUser } = sessionSlice.actions;
export default sessionSlice.reducer;
