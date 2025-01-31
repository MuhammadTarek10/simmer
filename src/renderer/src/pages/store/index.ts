import { configureStore } from '@reduxjs/toolkit'
import companyReducer from '../Company/state/company_slice'
import globalReducer from '../Global/state/global-slice'

export const store = configureStore({
  reducer: {
    global: globalReducer,
    company: companyReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
