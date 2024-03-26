import {createSlice, PayloadAction} from '@reduxjs/toolkit'

interface AuthState {
    isAuth: boolean;
}

const initialState: AuthState = {
    isAuth: false,
}


export const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setIsAuth: (state, action: PayloadAction<boolean>) => {
            state.isAuth = action.payload
        },
    },
})

export const {setIsAuth} = AuthSlice.actions

export default AuthSlice.reducer
