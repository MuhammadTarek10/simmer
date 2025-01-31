import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface GlobalState {
  isLoading: boolean
  error: string | null
}

const initialState: GlobalState = {
  isLoading: false,
  error: null
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload
    },
    clearError(state) {
      state.error = null
    }
  }
})

export const { setLoading, setError, clearError } = globalSlice.actions
export default globalSlice.reducer
