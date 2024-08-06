import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const loadOrderStore = createAsyncThunk(
  "store/loadOrderStore",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/store/hoadon/all", data)
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

export const confirmByStore = createAsyncThunk(
  "store/confirmByStore",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/store/hoadon/confirm", data)
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

export const getDetailOrderByStore = createAsyncThunk(
  "store/getDetailOrderByStore",
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
