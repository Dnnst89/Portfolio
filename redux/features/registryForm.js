import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
};

export const registryForm = createSlice({
    name: 'registry',
    initialState,
    reducers: {
        resetForm: () => {
            return initialState;
        },
        userData: (state, action) => {
            return {...state, ...action.payload}
        }
    },
});
export const { userData, resetForm } = registryForm.actions;
export default registryForm.reducer;
