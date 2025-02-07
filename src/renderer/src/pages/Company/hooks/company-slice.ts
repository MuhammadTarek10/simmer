import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { CompanyState } from './types'
import { CompanyController } from '@/controllers/company.controller'

const initialState: CompanyState = {
  companies: { data: null },
  currentCompany: { data: null }
}

export const fetchCompanies = createAsyncThunk('companies', async (_, { rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Delay first
    const response = await CompanyController.getCompanies()
    return response
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch companies')
  }
})

export const fetchCompanyById = createAsyncThunk(
  'companies/id',
  async (id: string, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Delay first
      const response = await CompanyController.getCompany(id)
      return response
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch company')
    }
  }
)

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    clearCurrentCompany: (state) => {
      state.currentCompany = initialState.currentCompany
    },
    clearCompanies: (state) => {
      state.companies = initialState.companies
    }
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchCompanies
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies.data = action.payload
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.currentCompany.data = action.payload
      })
  }
})

export const { clearCurrentCompany, clearCompanies } = companySlice.actions
export default companySlice.reducer
