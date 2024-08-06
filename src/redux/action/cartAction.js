import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const loadCartByUser = createAsyncThunk(
  "user/loadCartByUser",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/user/giohang/all", data)
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

export const addToCartByUser = createAsyncThunk(
  "user/addToCartByUser",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/user/giohang/new", data)
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

export const removeToCartByUser = createAsyncThunk(
  "user/removeToCartByUser",
  async (data, { rejectWithValue }) => {
    try {
      const result = await api
        .post("/user/giohang/delete", data)
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
