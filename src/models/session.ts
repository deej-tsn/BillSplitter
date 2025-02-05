
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addManyToRecipe, addToRecipe, dataToRecipe, deleteFromRecipe, deleteManyFromRecipe, newUser, Receipt, sortRecipe, User } from './receipt';
import data from '../../data/test_data.json';
import { Item } from './item';



type Session = {
  users: User[];
  leftOver : Receipt,
  currentSelectedUsers: boolean[],
  currentSelectedItems : boolean[],
};

const initialState: Session = {
  users:[],
  leftOver : dataToRecipe(data),
  currentSelectedUsers: [],
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
        state.currentSelectedUsers.push(true);
      }
    },
    setCurrentUser: (state, action: PayloadAction<number>) => {
      const itemIndex = action.payload
      state.currentSelectedUsers[itemIndex] = !state.currentSelectedUsers[itemIndex];
    },
    setCurrentItem: (state, action: PayloadAction<number>) => {
      const itemIndex = action.payload
      state.currentSelectedItems[itemIndex] = !state.currentSelectedItems[itemIndex];
    },
    addItemToOneUser: (state) => {
      if (state.currentSelectedItems.includes(true) == false) return;
      let userIndex = state.currentSelectedUsers.findIndex((isSelected) => isSelected)
      state.users[userIndex].recipe = addManyToRecipe(state.users[userIndex].recipe, state.leftOver, state.currentSelectedItems)
      state.leftOver = deleteManyFromRecipe(state.leftOver, state.currentSelectedItems);
      state.users[userIndex].recipe.items = sortRecipe(state.users[userIndex].recipe);
      state.currentSelectedItems = new Array(state.leftOver.items.length).fill(false);
    },
    removeItemFromUser: (state , action: PayloadAction<{user:User, item:Item}>) => {
      const {user, item} = action.payload;
      state.leftOver = addToRecipe(state.leftOver, item);
      const stateUser = state.users.find((temp_user) => temp_user.name == user.name)!;
      stateUser.recipe = deleteFromRecipe(stateUser.recipe, item);
      state.leftOver.items = sortRecipe(state.leftOver);
      state.currentSelectedItems = new Array(state.leftOver.items.length).fill(false);
      
    }
  },
});

export const { createUser, setCurrentUser,setCurrentItem, addItemToOneUser, removeItemFromUser } = sessionSlice.actions;
export default sessionSlice.reducer;
