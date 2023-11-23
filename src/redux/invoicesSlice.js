import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    deleteInvoice: (state, action) => {
      return state.filter((invoice) => invoice.id !== action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.findIndex(
        (invoice) => invoice.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload.updatedInvoice;
      }
    },
    updateInvoicesList: (state, action) => {
      return action.payload;
    },
    
    deleteSelectedInvoices: (state, action) => {
      // payload is an array of invoice IDs
      return state.filter((invoice) => !action.payload.includes(invoice.id));
    },
    
  },
});

export const {
  addInvoice,
  deleteInvoice,
  updateInvoice,
  updateInvoicesList,
  deleteSelectedInvoices
} = invoicesSlice.actions;

export const selectInvoiceList = (state) => state.invoices;

export default invoicesSlice.reducer;
