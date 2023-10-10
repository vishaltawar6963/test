import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./api";

export const getUsers = createAsyncThunk(
    "getUsers",
    async (userData, { rejectWithValue, getState }) => {
        try {
            const { data } = await api.get("/users")
            return data
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong")
        }
    })


export const addUser = createAsyncThunk(
    "addUser",
    async (userData, { rejectWithValue, getState }) => {
        try {
            const { data } = await api.post("/users", userData)
            return true
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong")
        }
    })

export const updateUser = createAsyncThunk(
    "updateUser",
    async (userData, { rejectWithValue, getState }) => {
        try {
            const { data } = await api.put(`/users/${userData.id}`, userData)
            return true
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong")
        }
    })


export const deleteUser = createAsyncThunk(
    "deleteUser",
    async (userData, { rejectWithValue, getState }) => {
        try {
            const { data } = await api.delete(`/users/${userData.id}`)
            return true
        } catch (error) {
            return rejectWithValue(error.message || "something went wrong")
        }
    })