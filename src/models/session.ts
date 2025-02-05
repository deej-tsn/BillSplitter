
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addManyToRecipe, addToRecipe, dataToRecipe, deleteFromRecipe, deleteManyFromRecipe, newUser, Receipt, sortRecipe, User } from './receipt';
import data from '../../data/test_data.json';
import { Item } from './item';



type Session = {
  users: User[];
  leftOver : Receipt,
  currentUser: number | null,
  currentSelectedItems : boolean[],
};

const initialState: Session = {
  users:[],
  leftOver : dataToRecipe(data),
  currentUser: null,
  currentSelectedItems : new Array(data.items.length).fill(false),
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
    setCurrentItem: (state, action: PayloadAction<number>) => {
      const itemIndex = action.payload
      state.currentSelectedItems[itemIndex] = !state.currentSelectedItems[itemIndex];
    },
    addItemToUser: (state) => {
      if (state.currentUser == null || state.currentSelectedItems.includes(true) == false) return;
      state.users[state.currentUser].recipe = addManyToRecipe(state.users[state.currentUser].recipe, state.leftOver, state.currentSelectedItems)
      state.leftOver = deleteManyFromRecipe(state.leftOver, state.currentSelectedItems);
      state.users[state.currentUser].recipe.items = sortRecipe(state.users[state.currentUser].recipe);
      state.currentSelectedItems = new Array(state.leftOver.items.length).fill(false);
    },
    removeItemFromUser: (state , action: PayloadAction<{user:User, item:Item}>) => {
      const {user, item} = action.payload;
      state.leftOver = addToRecipe(state.leftOver, item);
      const stateUser = state.users.find((temp_user) => temp_user.name == user.name)!;
      stateUser.recipe = deleteFromRecipe(stateUser.recipe, item);
      state.leftOver.items = sortRecipe(state.leftOver);
      state.currentSelectedItems = new Array(state.leftOver.items.length).fill(false);
      console.log(state);
    }
  },
});

export const { createUser, setCurrentUser,setCurrentItem, addItemToUser, removeItemFromUser } = sessionSlice.actions;
export default sessionSlice.reducer;
