import { createSlice } from "@reduxjs/toolkit";
import {
  addToCartByUser,
  loadCartByUser,
  removeToCartByUser,
} from "../action/cartAction";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    lstCart: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
  },

  reducers: {
    checkAllCart: (state, action) => {
      state.lstCart.data = state.lstCart.data.map((item) => {
        if (item.maCH == action.payload.idCuaHang) {
          return { ...item, check: action.payload.check };
        }
        return item;
      });
    },
    checkItemCart: (state, action) => {
      state.lstCart.data.find(
        (item) => item.maSanPhamCT == action.payload.item.maSanPhamCT
      ).check = !action.payload.item.check;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadCartByUser.pending, (state, action) => {
        state.lstCart.data = null;
        state.lstCart.isLoading = true;
        state.lstCart.isError = false;
        state.lstCart.messageError = "";
      })
      .addCase(loadCartByUser.fulfilled, (state, action) => {
        state.lstCart.data = action.payload?.data.map((item) => ({
          check: false,
          ...item,
        }));
        state.lstCart.isLoading = false;
        state.lstCart.isError = false;
        state.lstCart.messageError = "";
      })
      .addCase(loadCartByUser.rejected, (state, action) => {
        state.lstCart.data = null;
        state.lstCart.isLoading = false;
        state.lstCart.isError = true;
        state.lstCart.messageError = action.payload;
      });

    builder
      .addCase(addToCartByUser.pending, (state, action) => {
        state.lstCart.isLoading = true;
        state.lstCart.isError = false;
        state.lstCart.messageError = "";
      })
      .addCase(addToCartByUser.fulfilled, (state, action) => {
        const index = state.lstCart.data.findIndex(
          (item) => item.maSanPhamCT == action.payload?.data.maSanPhamCT
        );
        if (index < 0) {
          state.lstCart.data?.push({ check: false, ...action.payload?.data });
        } else {
          state.lstCart.data[index] = { check: false, ...action.payload?.data };
        }
        state.lstCart.isLoading = false;
        state.lstCart.isError = false;
        state.lstCart.messageError = "";
      })
      .addCase(addToCartByUser.rejected, (state, action) => {
        state.lstCart.isLoading = false;
        state.lstCart.isError = true;
        state.lstCart.messageError = action.payload;
      });

    builder
      .addCase(removeToCartByUser.pending, (state, action) => {
        state.lstCart.isLoading = true;
        state.lstCart.isError = false;
        state.lstCart.messageError = "";
      })
      .addCase(removeToCartByUser.fulfilled, (state, action) => {
        state.lstCart.data = state.lstCart.data.filter(
          (item) => item.maSanPhamCT != action.payload.data.maSanPhamCT
        );
        state.lstCart.isLoading = false;
        state.lstCart.isError = false;
        state.lstCart.messageError = "";
      })
      .addCase(removeToCartByUser.rejected, (state, action) => {
        state.lstCart.isLoading = false;
        state.lstCart.isError = true;
        state.lstCart.messageError = action.payload;
      });
  },
});
export const { checkAllCart, checkItemCart } = cartSlice.actions;
export default cartSlice.reducer;
