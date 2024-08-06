import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const loadThanhPho = createAsyncThunk(
  "thanhpho/load",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/thanhpho/getByTinh", data)
        .then((response) => response.data)
        .catch((e) => {
          return rejectWithValue("Lỗi hệ thống");
        });
      console.log(result);
      if (result.status) {
        return result;
      } else {
        return rejectWithValue(result.messageError);
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);

export const loadTinh = createAsyncThunk(
  "tinh/load",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .get("/tinh/all")
        .then((response) => response.data)
        .catch((e) => {
          return rejectWithValue("Lỗi hệ thống");
        });
      console.log(result);
      if (result.status) {
        return result;
      } else {
        return rejectWithValue(result.messageError);
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);

export const loadThiXa = createAsyncThunk(
  "thiXa/load",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/thixa/getByThanhPho", data)
        .then((response) => response.data)
        .catch((e) => {
          return rejectWithValue("Lỗi hệ thống");
        });
      console.log(result);
      if (result.status) {
        return result;
      } else {
        return rejectWithValue(result.messageError);
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);

export const loadSPByStore = createAsyncThunk(
  "sanPham/loadByStore",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/user/sanpham/getByCH", data)
        .then((response) => response.data)
        .catch((e) => {
          return rejectWithValue("Lỗi hệ thống");
        });
      console.log(result);
      if (result.status) {
        return result;
      } else {
        return rejectWithValue(result.messageError);
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);

export const loadAllProduct = createAsyncThunk(
  "sanPham/loadAllProduct",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .get("/user/sanpham/all")
        .then((response) => response.data)
        .catch((e) => {
          return rejectWithValue("Lỗi hệ thống");
        });
      console.log(result);
      if (result.status) {
        return result;
      } else {
        return rejectWithValue(result.messageError);
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);

export const getProductDetail = createAsyncThunk(
  "sanPham/getProductDetail",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/user/sanpham/get", data)
        .then((response) => response.data)
        .catch((e) => {
          return rejectWithValue("Lỗi hệ thống");
        });
      console.log(result);
      if (result.status) {
        return result;
      } else {
        return rejectWithValue(result.messageError);
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);

export const loadEvaludate = createAsyncThunk(
  "sanPham/loadEvaluate",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/user/danhgia/all", data)
        .then((response) => response.data)
        .catch((e) => {
          return rejectWithValue("Lỗi hệ thống");
        });
      console.log(result);
      if (result.status) {
        return result;
      } else {
        return rejectWithValue(result.messageError);
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);

export const postEvaludate = createAsyncThunk(
  "sanPham/postEvaluate",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/user/danhgia/new", data)
        .then((response) => response.data)
        .catch((e) => {
          return rejectWithValue("Lỗi hệ thống");
        });
      console.log(result);
      if (result.status) {
        return result;
      } else {
        return rejectWithValue(result.messageError);
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);

export const removeEvaludate = createAsyncThunk(
  "sanPham/removeEvaluate",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/user/danhgia/delete", data)
        .then((response) => response.data)
        .catch((e) => {
          return rejectWithValue("Lỗi hệ thống");
        });
      console.log(result);
      if (result.status) {
        return result;
      } else {
        return rejectWithValue(result.messageError);
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);

export const loadLoaiThanhToan = createAsyncThunk(
  "loaithanhtoan/load",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .get("/loaithanhtoan/all")
        .then((response) => response.data)
        .catch((e) => {
          return rejectWithValue("Lỗi hệ thống");
        });
      console.log(result);
      if (result.status) {
        return result;
      } else {
        return rejectWithValue(result.messageError);
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);

export const loadVoucher = createAsyncThunk(
  "loadVoucher/load",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .get("/voucher/all")
        .then((response) => response.data)
        .catch((e) => {
          return rejectWithValue("Lỗi hệ thống");
        });
      console.log(result);
      if (result.status) {
        return result;
      } else {
        return rejectWithValue(result.messageError);
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);

export const loadLoaiHang = createAsyncThunk(
  "loaihang/load",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .get("/loaihang/all")
        .then((response) => response.data)
        .catch((e) => {
          return rejectWithValue("Lỗi hệ thống");
        });
      console.log(result);
      if (result.status) {
        return result;
      } else {
        return rejectWithValue(result.messageError);
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);

export const loadLoaiShip = createAsyncThunk(
  "loaiship/load",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .get("/loaiship/all")
        .then((response) => response.data)
        .catch((e) => {
          return rejectWithValue("Lỗi hệ thống");
        });
      console.log(result);
      if (result.status) {
        return result;
      } else {
        return rejectWithValue(result.messageError);
      }
    } catch (error) {
      return rejectWithValue("Lỗi hệ thống!");
    }
  }
);
