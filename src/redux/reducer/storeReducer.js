import { createSlice } from "@reduxjs/toolkit";
import {
  confirmByStore,
  getDetailOrderByStore,
  loadOrderStore,
} from "../action/storeAction";

const storeSlice = createSlice({
  name: "store",

  initialState: {
    lstOrderStore: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
    detailOrderStore: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadOrderStore.pending, (state, action) => {
        state.lstOrderStore.data = null;
        state.lstOrderStore.isLoading = true;
        state.lstOrderStore.isError = false;
        state.lstOrderStore.messageError = "";
      })
      .addCase(loadOrderStore.fulfilled, (state, action) => {
        state.lstOrderStore.data = action.payload.data;
        state.lstOrderStore.isLoading = false;
        state.lstOrderStore.isError = false;
        state.lstOrderStore.messageError = "";
      })
      .addCase(loadOrderStore.rejected, (state, action) => {
        state.lstOrderStore.data = null;
        state.lstOrderStore.isLoading = false;
        state.lstOrderStore.isError = true;
        state.lstOrderStore.messageError = action.payload;
      });

    builder
      .addCase(confirmByStore.pending, (state, action) => {
        state.lstOrderStore.isLoading = true;
        state.lstOrderStore.isError = false;
        state.lstOrderStore.messageError = "";
      })
      .addCase(confirmByStore.fulfilled, (state, action) => {
        state.lstOrderStore.data.find(
          (item) => item.maHD == action.payload.data.maHD
        ).confirm = true;
        state.detailOrderStore.data = action.payload.data;
        state.lstOrderStore.isLoading = false;
        state.lstOrderStore.isError = false;
        state.lstOrderStore.messageError = "";
      })
      .addCase(confirmByStore.rejected, (state, action) => {
        state.lstOrderStore.isLoading = false;
        state.lstOrderStore.isError = true;
        state.lstOrderStore.messageError = action.payload;
      });

    builder
      .addCase(getDetailOrderByStore.pending, (state, action) => {
        state.detailOrderStore.data = null;
        state.detailOrderStore.isLoading = true;
        state.detailOrderStore.isError = false;
        state.detailOrderStore.messageError = "";
      })
      .addCase(getDetailOrderByStore.fulfilled, (state, action) => {
        state.detailOrderStore.data = action.payload.data;
        state.detailOrderStore.isLoading = false;
        state.detailOrderStore.isError = false;
        state.detailOrderStore.messageError = "";
      })
      .addCase(getDetailOrderByStore.rejected, (state, action) => {
        state.detailOrderStore.data = null;
        state.detailOrderStore.isLoading = false;
        state.detailOrderStore.isError = true;
        state.detailOrderStore.messageError = action.payload;
      });
  },
});
export default storeSlice.reducer;
