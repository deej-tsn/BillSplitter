
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import data from '../../data/test_data.json';
import { Item } from './item';
import { addChargeToReceipt, addManyToReceipt, addToReceipt, adjustCost, Charge, deleteFromReceipt, deleteManyFromReceipt, newUser, Receipt, sortItems, User } from './receipt';

export type Session = {
  users: User[];
  leftOver : Receipt, 
  currentSelectedUsers: boolean[],
  currentSelectedItems : boolean[],
  stage : number
};

const initialState: Session = {
  users:[],
  leftOver : {
    items: [],
    charges: [],
    chargeStrategy :'serviceChargeSeperate',
    cost: '0.00'
  },
  currentSelectedUsers: [],
  currentSelectedItems : new Array(data.items.length).fill(false),
  stage : 1
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setLeftOver: (state : Session, action:PayloadAction<Receipt>) => {
      state.leftOver = action.payload;
      state.leftOver.chargeStrategy = 'serviceChargeSeperate';
      state.leftOver.cost = adjustCost(state.leftOver)
    },
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
      state.users[userIndex].receipt = addManyToReceipt(state.users[userIndex].receipt, state.leftOver, state.currentSelectedItems)
      state.leftOver = deleteManyFromReceipt(state.leftOver, state.currentSelectedItems);
      state.users[userIndex].receipt.items = sortItems(state.users[userIndex].receipt.items);
      state.currentSelectedItems = new Array(state.leftOver.items.length).fill(false);
    },
    removeItemFromUser: (state : Session , action: PayloadAction<{user:User, item:Item}>) => {
      const {user, item} = action.payload;
      state.leftOver = addToReceipt(state.leftOver, item);
      const stateUser = state.users.find((temp_user : User) => temp_user.name == user.name)!;
      stateUser.receipt = deleteFromReceipt(stateUser.receipt, item);
      state.leftOver.items = sortItems(state.leftOver.items);
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
          state.users[index].receipt = addToReceipt(user.receipt, item);
        }
      });
      let removedItem : Item = {
        ...originalItem,
        quantity : 1,
      }
      state.leftOver = deleteFromReceipt(state.leftOver, removedItem);
      state.currentSelectedItems = new Array(state.leftOver.items.length).fill(false);
    },
    updateLeftOver : (state : Session, action: PayloadAction<Receipt>) => {
      state.leftOver = action.payload;
      state.currentSelectedItems = new Array(state.leftOver.items.length).fill(false);
    },
    updateItemInLeftOver : (state : Session, action : PayloadAction<{item : Item, index: number}>) => {
      const {item, index} = action.payload;
      if(index < 0 || index >= state.leftOver.items.length) throw new Error("given index not in Range");
      state.leftOver.items = state.leftOver.items.map((itemInArray, indexInArray) => (indexInArray == index)? item : itemInArray);
      state.leftOver.cost = adjustCost(state.leftOver);
      state.currentSelectedItems = new Array(state.leftOver.items.length).fill(false);
    },
    updateChargeInLeftOver : (state : Session, action : PayloadAction<{charge : Charge, index: number}>) => {
      const {charge, index} = action.payload;
      if(index < 0 || index >= state.leftOver.charges.length) throw new Error("given index not in Range");
      state.leftOver.charges = state.leftOver.charges.map((chargeInArray, indexInArray) => (indexInArray == index)? charge : chargeInArray);
      state.leftOver.cost = adjustCost(state.leftOver);
    },
    addItemToLeftOver : (state : Session, action:PayloadAction<Item>) => {
      state.leftOver = addToReceipt(state.leftOver, action.payload);
      state.leftOver.cost = adjustCost(state.leftOver)
    },
    addChargeToLeftOver : (state : Session, action:PayloadAction<Charge>) => {
      state.leftOver = addChargeToReceipt(state.leftOver, action.payload);
      state.leftOver.cost = adjustCost(state.leftOver)
    },
    removeItemFromLeftOver : (state : Session, action : PayloadAction<number>) => {
      const index = action.payload;
      state.leftOver.items= state.leftOver.items.filter((_, indexInArray) => index != indexInArray);
      state.leftOver.cost = adjustCost(state.leftOver);
      state.currentSelectedItems = new Array(state.leftOver.items.length).fill(false);
    },
    removeChargeFromLeftOver : (state : Session, action : PayloadAction<number>) => {
      const index = action.payload;
      state.leftOver.charges= state.leftOver.charges.filter((_, indexInArray) => index != indexInArray);
      state.leftOver.cost = adjustCost(state.leftOver);
    },
    removeUserFromSession : (state : Session, action : PayloadAction<number>) => {
      const index = action.payload;
      state.users= state.users.filter((_, indexInArray) => index != indexInArray);
    },
    nextStage: (state: Session) => {
      if(state.stage == 5) throw new Error("Stage at 5 already");
      else if(state.stage < 4) state.stage += 1;
      else {
        state.currentSelectedItems = new Array(state.leftOver.items.length).fill(false);
        state.currentSelectedUsers = new Array(state.users.length).fill(false);
        state.stage += 1;
      } 
      
    },
    prevStage: (state: Session) => {
      if(state.stage > 1) state.stage -=1;
      else throw new Error("Stage at 1 already");
    }
  },
});

export const { setLeftOver, createUser, setCurrentUser,setCurrentItem, addItemToOneUser,splitItem, removeItemFromUser, updateLeftOver,updateItemInLeftOver, updateChargeInLeftOver,addItemToLeftOver, addChargeToLeftOver, removeItemFromLeftOver,removeChargeFromLeftOver,removeUserFromSession, prevStage, nextStage} = sessionSlice.actions;
export default sessionSlice.reducer;

