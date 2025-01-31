
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addToRecipe, dataToRecipe, deleteFromRecipe, Item, newUser, Receipt, User } from './receipt';
import data from '../../data/test_data.json';



type Session = {
  users: User[];
  leftOver : Receipt,
  currentUser: User | null;
};

const initialState: Session = {
  users:[],
  leftOver : dataToRecipe(data),
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
      state.users.find((user) => user.name == state.currentUser!.name)!.recipe = addToRecipe(state.currentUser.recipe, item);
      state.leftOver = deleteFromRecipe(state.leftOver, item);
    
    },
    removeItemFromUser: (state , action: PayloadAction<{user:User, item:Item}>) => {
      const {user, item} = action.payload;
      state.leftOver = addToRecipe(state.leftOver, item);
      const stateUser = state.users.find((temp_user) => temp_user.name == user.name)!;
      stateUser.recipe = deleteFromRecipe(stateUser.recipe, item);
    }
  },
});

export const { createUser, setCurrentUser, addItemToUser, removeItemFromUser } = sessionSlice.actions;
export default sessionSlice.reducer;
