import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    value: {
        isAuth: false,
        userName: '',
        uid: '',
        isModerator: false,
    },
};

export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logOut: () => {
            return initialState;
        },
        logIn: (state, action) => {
            return {
                value: {
                    isAuth: true,
                    userName: 'Carlos',
                    uid: 123,
                    isModerator: false,
                },
            };
        },
    },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
