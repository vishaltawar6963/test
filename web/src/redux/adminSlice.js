import { createSlice } from "@reduxjs/toolkit";
import { addUser, deleteUser, getUsers, updateUser } from "./adminActions";

const adminSlice = createSlice({
    name: "adminSlice",
    initialState: {},
    reducers: {
        invalidate: (state, { payload }) => {
            state.userAdded = false
            state.userUpdated = false
            state.userDeleted = false
        }
    },
    extraReducers: builder => builder
        .addCase(getUsers.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(getUsers.fulfilled, (state, { payload }) => {
            state.loading = false
            state.users = payload
        })
        .addCase(getUsers.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })


        .addCase(addUser.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(addUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.userAdded = true
        })
        .addCase(addUser.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

        .addCase(updateUser.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(updateUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.userUpdated = true
        })
        .addCase(updateUser.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

        .addCase(deleteUser.pending, (state, { payload }) => {
            state.loading = true
        })
        .addCase(deleteUser.fulfilled, (state, { payload }) => {
            state.loading = false
            state.userDeleted = true
        })
        .addCase(deleteUser.rejected, (state, { payload }) => {
            state.loading = false
            state.error = payload
        })

})

export const { invalidate } = adminSlice.actions
export default adminSlice.reducer