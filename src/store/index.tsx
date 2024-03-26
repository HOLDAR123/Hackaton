import {configureStore} from "@reduxjs/toolkit";
import settingsReducer from "@store/reducers/settingsReducer";
import authReducer from "@store/reducers/authReducer";

const store = configureStore({
    reducer: {
        settings: settingsReducer,
        auth: authReducer,
    },
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
