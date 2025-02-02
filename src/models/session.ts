
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addToRecipe, dataToRecipe, deleteFromRecipe, newUser, Receipt, sortRecipe, User } from './receipt';
import data from '../../data/test_data.json';
import { Item } from './item';



type Session = {
  users: User[];
  leftOver : Receipt,
  currentUser: number | null;
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
        state.currentUser = state.users.length-1;
      }
    },
    setCurrentUser: (state, action: PayloadAction<number>) => {
      state.currentUser = action.payload;
    },
    addItemToUser: (state, action: PayloadAction<Item>) => {
      const item = action.payload;
      if (state.currentUser == null) return;
      state.users[state.currentUser].recipe = addToRecipe(state.users[state.currentUser].recipe, item);
      state.leftOver = deleteFromRecipe(state.leftOver, item);
      state.users[state.currentUser].recipe.items = sortRecipe(state.users[state.currentUser].recipe)
    },
    removeItemFromUser: (state , action: PayloadAction<{user:User, item:Item}>) => {
      const {user, item} = action.payload;
      state.leftOver = addToRecipe(state.leftOver, item);
      const stateUser = state.users.find((temp_user) => temp_user.name == user.name)!;
      stateUser.recipe = deleteFromRecipe(stateUser.recipe, item);
      state.leftOver.items = sortRecipe(state.leftOver)

    }
  },
});

export const { createUser, setCurrentUser, addItemToUser, removeItemFromUser } = sessionSlice.actions;
export default sessionSlice.reducer;
