import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { CompanyState } from './types'
import { CompanyController } from '@/controllers/company.controller'

const initialState: CompanyState = {
  companies: {
    data: [],
    isLoading: false,
    error: null
  },
  currentCompany: {
    data: null,
    isLoading: false,
    error: null
  }
}

export const fetchCompanies = createAsyncThunk('companies', async (_, { rejectWithValue }) => {
  try {
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
      .addCase(fetchCompanies.pending, (state) => {
        state.companies.isLoading = true
        state.companies.error = null
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.companies.isLoading = false
        state.companies.data = action.payload
        state.companies.error = null
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.companies.isLoading = false
        state.companies.error = action.payload as string
        state.companies.data = []
      })
      // Handle fetchCompanyById
      .addCase(fetchCompanyById.pending, (state) => {
        state.currentCompany.isLoading = true
        state.currentCompany.error = null
      })
      .addCase(fetchCompanyById.fulfilled, (state, action) => {
        state.currentCompany.isLoading = false
        state.currentCompany.data = action.payload
        state.currentCompany.error = null
      })
      .addCase(fetchCompanyById.rejected, (state, action) => {
        state.currentCompany.isLoading = false
        state.currentCompany.error = action.payload as string
        state.currentCompany.data = null
      })
  }
})

export const { clearCurrentCompany, clearCompanies } = companySlice.actions
export default companySlice.reducer
