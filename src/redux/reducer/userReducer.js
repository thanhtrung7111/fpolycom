import { createSlice } from "@reduxjs/toolkit";
import {
  addWishList,
  getDetailOrderByUser,
  getProfileUser,
  getStore,
  loadOrder,
  loadWishList,
  loginUser,
  registerStore,
  removeWishlist,
  updateProfileUser,
} from "../action/userAction";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
    screenBlock: false,
    profileUser: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
    detailCuaHang: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
    wishList: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
    lstOrder: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
    orderDetailUser: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
    orderPending: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
  },

  reducers: {
    logout: (state, action) => {
      state.currentUser = {
        data: null,
        isLoading: false,
        isError: false,
        messageError: "",
      };
    },
    checkoutPending: (state, action) => {
      state.orderPending.data = action.payload;
    },
    actionBlockScreen: (state, action) => {
      state.screenBlock = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state, action) => {
        state.currentUser.isLoading = true;
        state.currentUser.isError = false;
        state.currentUser.messageError = "";
        state.currentUser.data = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.currentUser.isLoading = false;
        state.currentUser.isError = false;
        state.currentUser.messageError = "";
        state.currentUser.data = action.payload.data;
        sessionStorage.setItem("token", action.payload.data.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.currentUser.isLoading = false;
        state.currentUser.isError = true;
        state.currentUser.messageError = action.payload;
        state.currentUser.data = null;
      });

    builder
      .addCase(registerStore.pending, (state, action) => {
        state.currentUser.isLoading = true;
        state.currentUser.isError = false;
        state.currentUser.messageError = "";
      })
      .addCase(registerStore.fulfilled, (state, action) => {
        console.log(action.payload);
        state.currentUser.isLoading = false;
        state.currentUser.isError = false;
        state.currentUser.messageError = "";
        state.currentUser.data.cuaHang = action.payload.data;
      })
      .addCase(registerStore.rejected, (state, action) => {
        state.currentUser.isLoading = false;
        state.currentUser.isError = true;
        state.currentUser.messageError = action.payload;
      });
    builder
      .addCase(getProfileUser.pending, (state, action) => {
        state.profileUser.isLoading = true;
        state.profileUser.isError = false;
        state.profileUser.messageError = "";
        state.profileUser.data = null;
      })
      .addCase(getProfileUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.profileUser.isLoading = false;
        state.profileUser.isError = false;
        state.profileUser.messageError = "";
        state.profileUser.data = action.payload.data;
      })
      .addCase(getProfileUser.rejected, (state, action) => {
        state.profileUser.isLoading = false;
        state.profileUser.isError = true;
        state.profileUser.messageError = action.payload;
        state.profileUser.data = null;
      });

    builder
      .addCase(updateProfileUser.pending, (state, action) => {
        state.profileUser.isLoading = true;
        state.profileUser.isError = false;
        state.profileUser.messageError = "";
        state.profileUser.data = null;
      })
      .addCase(updateProfileUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.profileUser.isLoading = false;
        state.profileUser.isError = false;
        state.profileUser.messageError = "";
        state.currentUser.data = {
          ...state.currentUser.data,
          tenNguoiDung: action.payload.data.tenNguoiDung,
          soDienThoai: action.payload.data.soDienThoai,
          diaChi: action.payload.data.diaChi,
          hinhAnh: action.payload.data.hinhAnh,
          banner: action.payload.data.banner,
          email: action.payload.data.email,
          gioitinh: action.payload.data.gioitinh,
        };
        state.profileUser.data = action.payload.data;
      })
      .addCase(updateProfileUser.rejected, (state, action) => {
        state.profileUser.isLoading = false;
        state.profileUser.isError = true;
        state.profileUser.messageError = action.payload;
        state.profileUser.data = null;
      });

    builder
      .addCase(getStore.pending, (state, action) => {
        state.detailCuaHang.isLoading = true;
        state.detailCuaHang.isError = false;
        state.detailCuaHang.messageError = "";
      })
      .addCase(getStore.fulfilled, (state, action) => {
        console.log(action.payload);
        state.detailCuaHang.isLoading = false;
        state.detailCuaHang.isError = false;
        state.detailCuaHang.messageError = "";
        state.detailCuaHang.data = action.payload.data;
      })
      .addCase(getStore.rejected, (state, action) => {
        state.detailCuaHang.isLoading = false;
        state.detailCuaHang.isError = true;
        state.detailCuaHang.messageError = action.payload;
      });

    builder
      .addCase(loadWishList.pending, (state, action) => {
        state.wishList.data = null;
        state.wishList.isLoading = true;
        state.wishList.isError = false;
        state.wishList.messageError = "";
      })
      .addCase(loadWishList.fulfilled, (state, action) => {
        console.log(action.payload);
        state.wishList.isLoading = false;
        state.wishList.isError = false;
        state.wishList.messageError = "";
        state.wishList.data = action.payload.data;
      })
      .addCase(loadWishList.rejected, (state, action) => {
        state.wishList.isLoading = false;
        state.wishList.isError = true;
        state.wishList.messageError = action.payload;
        state.wishList.data = null;
      });

    builder
      .addCase(removeWishlist.pending, (state, action) => {
        state.wishList.isLoading = true;
        state.wishList.isError = false;
        state.wishList.messageError = "";
      })
      .addCase(removeWishlist.fulfilled, (state, action) => {
        console.log(action.payload);
        state.wishList.isLoading = false;
        state.wishList.isError = false;
        state.wishList.messageError = "";
        state.wishList.data = state.wishList.data.filter(
          (item) => item.maSanPham != action.payload.data.maSanPham
        );
      })
      .addCase(removeWishlist.rejected, (state, action) => {
        state.wishList.isLoading = false;
        state.wishList.isError = true;
        state.wishList.messageError = action.payload;
      });

    builder
      .addCase(addWishList.pending, (state, action) => {
        state.wishList.isLoading = true;
        state.wishList.isError = false;
        state.wishList.messageError = "";
      })
      .addCase(addWishList.fulfilled, (state, action) => {
        console.log(action.payload);
        state.wishList.isLoading = false;
        state.wishList.isError = false;
        state.wishList.messageError = "";
        state.wishList.data.push(action.payload.data);
      })
      .addCase(addWishList.rejected, (state, action) => {
        state.wishList.isLoading = false;
        state.wishList.isError = true;
        state.wishList.messageError = action.payload;
      });

    builder
      .addCase(loadOrder.pending, (state, action) => {
        state.lstOrder.data = null;
        state.lstOrder.isLoading = true;
        state.lstOrder.isError = false;
        state.lstOrder.messageError = "";
      })
      .addCase(loadOrder.fulfilled, (state, action) => {
        console.log(action.payload);
        state.lstOrder.isLoading = false;
        state.lstOrder.isError = false;
        state.lstOrder.messageError = "";
        state.lstOrder.data = action.payload.data;
      })
      .addCase(loadOrder.rejected, (state, action) => {
        state.lstOrder.data = null;
        state.lstOrder.isLoading = false;
        state.lstOrder.isError = true;
        state.lstOrder.messageError = action.payload;
      });

    builder
      .addCase(getDetailOrderByUser.pending, (state, action) => {
        state.orderDetailUser.data = null;
        state.orderDetailUser.isLoading = true;
        state.orderDetailUser.isError = false;
        state.orderDetailUser.messageError = "";
      })
      .addCase(getDetailOrderByUser.fulfilled, (state, action) => {
        console.log(action.payload);
        state.orderDetailUser.isLoading = false;
        state.orderDetailUser.isError = false;
        state.orderDetailUser.messageError = "";
        state.orderDetailUser.data = action.payload.data;
      })
      .addCase(getDetailOrderByUser.rejected, (state, action) => {
        state.orderDetailUser.data = null;
        state.orderDetailUser.isLoading = false;
        state.orderDetailUser.isError = true;
        state.orderDetailUser.messageError = action.payload;
      });
  },
});
export const { logout, checkoutPending, actionBlockScreen } = userSlice.actions;
export default userSlice.reducer;
