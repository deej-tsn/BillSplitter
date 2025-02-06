
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
    createUser: (state : Session, action: PayloadAction<string>) => {
      const userName = action.payload;
      if (!state.users.find(user => user.name === userName)) {
        const user = newUser(userName, state.leftOver.charges);
        state.users.push(user);
        state.currentSelectedUsers.push(true);
      }
    },
    setCurrentUser: (state : Session, action: PayloadAction<number>) => {
      const itemIndex = action.payload
      state.currentSelectedUsers[itemIndex] = !state.currentSelectedUsers[itemIndex];
    },
    setCurrentItem: (state : Session, action: PayloadAction<number>) => {
      const itemIndex = action.payload
      state.currentSelectedItems[itemIndex] = !state.currentSelectedItems[itemIndex];
    },
    addItemToOneUser: (state : Session) => {
      if (state.currentSelectedItems.includes(true) == false) return;
      let userIndex = state.currentSelectedUsers.findIndex((isSelected: boolean) => isSelected)
      state.users[userIndex].recipe = addManyToRecipe(state.users[userIndex].recipe, state.leftOver, state.currentSelectedItems)
      state.leftOver = deleteManyFromRecipe(state.leftOver, state.currentSelectedItems);
      state.users[userIndex].recipe.items = sortRecipe(state.users[userIndex].recipe);
      state.currentSelectedItems = new Array(state.leftOver.items.length).fill(false);
    },
    removeItemFromUser: (state : Session , action: PayloadAction<{user:User, item:Item}>) => {
      const {user, item} = action.payload;
      state.leftOver = addToRecipe(state.leftOver, item);
      const stateUser = state.users.find((temp_user : User) => temp_user.name == user.name)!;
      stateUser.recipe = deleteFromRecipe(stateUser.recipe, item);
      state.leftOver.items = sortRecipe(state.leftOver);
      state.currentSelectedItems = new Array(state.leftOver.items.length).fill(false);
    },
    splitItem : (state : Session) => {
      const itemIndex = state.currentSelectedItems.indexOf(true)
      if(itemIndex == -1) return;
      const numOfUsers = state.currentSelectedUsers.filter((isSelected : boolean) => isSelected).length
      if(numOfUsers < 1) return;
      const originalItem = state.leftOver.items[itemIndex];
      // generate items for each person
      state.users.forEach((user, index) => {
        if(state.currentSelectedUsers[index]){
          let item : Item = {
            name : originalItem.name,
            price : originalItem.price,
            quantity : 1/numOfUsers
          }
          state.users[index].recipe = addToRecipe(user.recipe, item);
        }
      });
      let removedItem : Item = {
        ...originalItem,
        quantity : 1,
      }
      state.leftOver = deleteFromRecipe(state.leftOver, removedItem);
      state.currentSelectedItems = new Array(state.leftOver.items.length).fill(false);
    }
  },
});

export const { createUser, setCurrentUser,setCurrentItem, addItemToOneUser,splitItem, removeItemFromUser } = sessionSlice.actions;
export default sessionSlice.reducer;
