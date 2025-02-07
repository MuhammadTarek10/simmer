import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type { CardState } from './types'
import { CardController } from '@/controllers/card.controller'

const initialState: CardState = {
  cards: { data: null },
  currentCard: { data: null }
}

export const fetchCards = createAsyncThunk('cards', async (_, { rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000)) // Delay first
    const response = await CardController.getCards()
    return response
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch cards')
  }
})

export const fetchCardById = createAsyncThunk(
  'cards/id',
  async (id: string, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Delay first
      const response = await CardController.getCardById(id)
      return response
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch card')
    }
  }
)

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    clearCurrentCard: (state) => {
      state.currentCard = initialState.currentCard
    },
    clearCards: (state) => {
      state.cards = initialState.cards
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCards.fulfilled, (state, action) => {
        state.cards.data = action.payload
      })
      .addCase(fetchCardById.fulfilled, (state, action) => {
        state.currentCard.data = action.payload
      })
  }
})

export const { clearCurrentCard, clearCards } = cardSlice.actions
export default cardSlice.reducer
