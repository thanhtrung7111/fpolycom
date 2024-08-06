import { createSlice } from "@reduxjs/toolkit";
import {
  getProductDetail,
  loadAllProduct,
  loadEvaludate,
  loadLoaiHang,
  loadLoaiShip,
  loadLoaiThanhToan,
  loadSPByStore,
  loadThanhPho,
  loadThiXa,
  loadTinh,
  loadVoucher,
  postEvaludate,
  removeEvaludate,
} from "../action/commonAction";
import { getProfileUser } from "../action/userAction";

const commonSlice = createSlice({
  name: "common",

  initialState: {
    lstThanhPho: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
    lstTinh: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
    lstThiXa: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
    lstProduct: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
    productDetail: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
    lstEvaludate: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
    lstAllProduct: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
    lstLoaiThanhToan: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
    lstVoucher: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
    lstLoaiShip: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
    lstLoaiHang: {
      data: null,
      isLoading: false,
      isError: false,
      messageError: "",
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loadTinh.pending, (state, action) => {
        state.lstTinh.data = null;
        state.lstTinh.isLoading = true;
        state.lstTinh.isError = false;
        state.lstTinh.messageError = "";
      })
      .addCase(loadTinh.fulfilled, (state, action) => {
        state.lstTinh.data = action.payload.data;
        state.lstTinh.isLoading = false;
        state.lstTinh.isError = false;
        state.lstTinh.messageError = "";
      })
      .addCase(loadTinh.rejected, (state, action) => {
        state.lstTinh.data = null;
        state.lstTinh.isLoading = false;
        state.lstTinh.isError = true;
        state.lstTinh.messageError = action.payload;
      });

    builder
      .addCase(loadThanhPho.pending, (state, action) => {
        state.lstThanhPho.data = null;
        state.lstThanhPho.isLoading = true;
        state.lstThanhPho.isError = false;
        state.lstThanhPho.messageError = "";
      })
      .addCase(loadThanhPho.fulfilled, (state, action) => {
        state.lstThanhPho.data = action.payload.data;
        state.lstThanhPho.isLoading = false;
        state.lstThanhPho.isError = false;
        state.lstThanhPho.messageError = "";
      })
      .addCase(loadThanhPho.rejected, (state, action) => {
        state.lstThanhPho.data = null;
        state.lstThanhPho.isLoading = false;
        state.lstThanhPho.isError = true;
        state.lstThanhPho.messageError = action.payload;
      });

    builder
      .addCase(loadThiXa.pending, (state, action) => {
        state.lstThiXa.data = null;
        state.lstThiXa.isLoading = true;
        state.lstThiXa.isError = false;
        state.lstThiXa.messageError = "";
      })
      .addCase(loadThiXa.fulfilled, (state, action) => {
        state.lstThiXa.data = action.payload.data;
        state.lstThiXa.isLoading = false;
        state.lstThiXa.isError = false;
        state.lstThiXa.messageError = "";
      })
      .addCase(loadThiXa.rejected, (state, action) => {
        state.lstThiXa.data = null;
        state.lstThiXa.isLoading = false;
        state.lstThiXa.isError = true;
        state.lstThiXa.messageError = action.payload;
      });

    builder
      .addCase(loadSPByStore.pending, (state, action) => {
        state.lstProduct.data = null;
        state.lstProduct.isLoading = true;
        state.lstProduct.isError = false;
        state.lstProduct.messageError = "";
      })
      .addCase(loadSPByStore.fulfilled, (state, action) => {
        state.lstProduct.data = action.payload.data;
        state.lstProduct.isLoading = false;
        state.lstProduct.isError = false;
        state.lstProduct.messageError = "";
      })
      .addCase(loadSPByStore.rejected, (state, action) => {
        state.lstProduct.data = null;
        state.lstProduct.isLoading = false;
        state.lstProduct.isError = true;
        state.lstProduct.messageError = action.payload;
      });

    builder
      .addCase(loadAllProduct.pending, (state, action) => {
        state.lstAllProduct.data = null;
        state.lstAllProduct.isLoading = true;
        state.lstAllProduct.isError = false;
        state.lstAllProduct.messageError = "";
      })
      .addCase(loadAllProduct.fulfilled, (state, action) => {
        state.lstAllProduct.data = action.payload.data;
        state.lstAllProduct.isLoading = false;
        state.lstAllProduct.isError = false;
        state.lstAllProduct.messageError = "";
      })
      .addCase(loadAllProduct.rejected, (state, action) => {
        state.lstAllProduct.data = null;
        state.lstAllProduct.isLoading = false;
        state.lstAllProduct.isError = true;
        state.lstAllProduct.messageError = action.payload;
      });

    builder
      .addCase(getProductDetail.pending, (state, action) => {
        state.productDetail.data = null;
        state.productDetail.isLoading = true;
        state.productDetail.isError = false;
        state.productDetail.messageError = "";
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.productDetail.data = action.payload.data;
        state.productDetail.isLoading = false;
        state.productDetail.isError = false;
        state.productDetail.messageError = "";
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.productDetail.data = null;
        state.productDetail.isLoading = false;
        state.productDetail.isError = true;
        state.productDetail.messageError = action.payload;
      });

    builder
      .addCase(loadEvaludate.pending, (state, action) => {
        state.lstEvaludate.data = null;
        state.lstEvaludate.isLoading = true;
        state.lstEvaludate.isError = false;
        state.lstEvaludate.messageError = "";
      })
      .addCase(loadEvaludate.fulfilled, (state, action) => {
        state.lstEvaludate.data = action.payload.data;
        state.lstEvaludate.isLoading = false;
        state.lstEvaludate.isError = false;
        state.lstEvaludate.messageError = "";
      })
      .addCase(loadEvaludate.rejected, (state, action) => {
        state.lstEvaludate.data = null;
        state.lstEvaludate.isLoading = false;
        state.lstEvaludate.isError = true;
        state.lstEvaludate.messageError = action.payload;
      });

    builder
      .addCase(postEvaludate.pending, (state, action) => {
        state.lstEvaludate.isLoading = true;
        state.lstEvaludate.isError = false;
        state.lstEvaludate.messageError = "";
      })
      .addCase(postEvaludate.fulfilled, (state, action) => {
        state.lstEvaludate.data?.push({ ...action.payload.data });
        state.lstEvaludate.isLoading = false;
        state.lstEvaludate.isError = false;
        state.lstEvaludate.messageError = "";
      })
      .addCase(postEvaludate.rejected, (state, action) => {
        state.lstEvaludate.isLoading = false;
        state.lstEvaludate.isError = true;
        state.lstEvaludate.messageError = action.payload;
      });

    builder
      .addCase(removeEvaludate.pending, (state, action) => {
        state.lstEvaludate.isLoading = true;
        state.lstEvaludate.isError = false;
        state.lstEvaludate.messageError = "";
      })
      .addCase(removeEvaludate.fulfilled, (state, action) => {
        state.lstEvaludate.data = state.lstEvaludate.data?.filter(
          (item) => item.maNguoiDanhGia != action.payload?.data?.maNguoiDanhGia
        );
        state.lstEvaludate.isLoading = false;
        state.lstEvaludate.isError = false;
        state.lstEvaludate.messageError = "";
      })
      .addCase(removeEvaludate.rejected, (state, action) => {
        state.lstEvaludate.isLoading = false;
        state.lstEvaludate.isError = true;
        state.lstEvaludate.messageError = action.payload;
      });

    builder
      .addCase(loadLoaiThanhToan.pending, (state, action) => {
        state.lstLoaiThanhToan.data = null;
        state.lstLoaiThanhToan.isLoading = true;
        state.lstLoaiThanhToan.isError = false;
        state.lstLoaiThanhToan.messageError = "";
      })
      .addCase(loadLoaiThanhToan.fulfilled, (state, action) => {
        state.lstLoaiThanhToan.data = action.payload.data;
        state.lstLoaiThanhToan.isLoading = false;
        state.lstLoaiThanhToan.isError = false;
        state.lstLoaiThanhToan.messageError = "";
      })
      .addCase(loadLoaiThanhToan.rejected, (state, action) => {
        state.lstLoaiThanhToan.data = null;
        state.lstLoaiThanhToan.isLoading = false;
        state.lstLoaiThanhToan.isError = true;
        state.lstLoaiThanhToan.messageError = action.payload;
      });

    builder
      .addCase(loadVoucher.pending, (state, action) => {
        state.lstVoucher.data = null;
        state.lstVoucher.isLoading = true;
        state.lstVoucher.isError = false;
        state.lstVoucher.messageError = "";
      })
      .addCase(loadVoucher.fulfilled, (state, action) => {
        state.lstVoucher.data = action.payload.data;
        state.lstVoucher.isLoading = false;
        state.lstVoucher.isError = false;
        state.lstVoucher.messageError = "";
      })
      .addCase(loadVoucher.rejected, (state, action) => {
        state.lstVoucher.data = null;
        state.lstVoucher.isLoading = false;
        state.lstVoucher.isError = true;
        state.lstVoucher.messageError = action.payload;
      });

    builder
      .addCase(loadLoaiShip.pending, (state, action) => {
        state.lstLoaiShip.data = null;
        state.lstLoaiShip.isLoading = true;
        state.lstLoaiShip.isError = false;
        state.lstLoaiShip.messageError = "";
      })
      .addCase(loadLoaiShip.fulfilled, (state, action) => {
        state.lstLoaiShip.data = action.payload.data;
        state.lstLoaiShip.isLoading = false;
        state.lstLoaiShip.isError = false;
        state.lstLoaiShip.messageError = "";
      })
      .addCase(loadLoaiShip.rejected, (state, action) => {
        state.lstLoaiShip.data = null;
        state.lstLoaiShip.isLoading = false;
        state.lstLoaiShip.isError = true;
        state.lstLoaiShip.messageError = action.payload;
      });

    builder
      .addCase(loadLoaiHang.pending, (state, action) => {
        state.lstLoaiHang.data = null;
        state.lstLoaiHang.isLoading = true;
        state.lstLoaiHang.isError = false;
        state.lstLoaiHang.messageError = "";
      })
      .addCase(loadLoaiHang.fulfilled, (state, action) => {
        state.lstLoaiHang.data = action.payload.data;
        state.lstLoaiHang.isLoading = false;
        state.lstLoaiHang.isError = false;
        state.lstLoaiHang.messageError = "";
      })
      .addCase(loadLoaiHang.rejected, (state, action) => {
        state.lstLoaiHang.data = null;
        state.lstLoaiHang.isLoading = false;
        state.lstLoaiHang.isError = true;
        state.lstLoaiHang.messageError = action.payload;
      });
  },
});
export default commonSlice.reducer;
