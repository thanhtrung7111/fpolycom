import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../api/api";

export const loginUser = createAsyncThunk(
  "user/login",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/userlogin", data)
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

export const registerStore = createAsyncThunk(
  "user/registerStore",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/user/cuahang/register", data)
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

export const getProfileUser = createAsyncThunk(
  "user/getProfile",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/user/profile/get", data)
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

export const updateProfileUser = createAsyncThunk(
  "user/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/user/profile/update", data)
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

export const getStore = createAsyncThunk(
  "user/getStore",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/user/cuahang/get", data)
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

export const loadWishList = createAsyncThunk(
  "user/getAllWishList",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/user/sanpham/likes", data)
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

export const removeWishlist = createAsyncThunk(
  "user/removeWishList",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/user/sanpham/disliked", data)
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

export const addWishList = createAsyncThunk(
  "user/addWishList",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/user/sanpham/liked", data)
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

export const loadOrder = createAsyncThunk(
  "user/loadOrder",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/user/hoadon/all", data)
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

export const getDetailOrderByUser = createAsyncThunk(
  "user/getDetailOrder",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/user/hoadon/get", data)
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
