import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import getLanguage from 'utils/getLanguage'

interface SettingsState {
  language: string
}

const initialState: SettingsState = {
  language: getLanguage(),
}

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload
    },
  },
})

export const { setLanguage } = settingsSlice.actions

export default settingsSlice.reducer
