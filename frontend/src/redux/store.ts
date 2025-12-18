import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';

// Define the Item interface
interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

// Define the slice state interface
interface ItemsSliceState {
  items: Item[]; // Fixed: Changed from Items[] to Item[]
}

// Initial state
const initialState: ItemsSliceState = {
  items: [], // Fixed: Changed ; to ,
};

// Create the slice
export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    // Add an item
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },

    // Delete an item by ID
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },

    // Update an existing item by ID
    updateItem: (state, action: PayloadAction<Item>) => {
      const index = state.items.findIndex((item) => item.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
  },
});

// Export actions
export const { addItem, deleteItem, updateItem } = itemsSlice.actions;

// Export reducer
// export default itemsSlice.reducer;


// export default configureStore ({
//     reducer : {
//       items:  itemsSlice.reducer,
//     },
// });

const store =  configureStore ({
    reducer : {
      items:  itemsSlice.reducer,
    },
});

//!   creating selector

type RootState = ReturnType<typeof store.getState>;

export const selectItems = (state: RootState) => state.items.items;


export default store;
