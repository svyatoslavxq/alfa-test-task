import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

async function getData() {
  const response = await fetch('https://fakestoreapi.com/products')
  return response.json()
}

export async function goods() {
  const data = await getData()
  return data
}

export const fetchGoods = createAsyncThunk('goods/fetch', async () => goods())

const goodsSlice = createSlice({
  name: 'goods',
  initialState: {
    goods: [],
  },
  reducers: {
    removeGoods(state, action) {
      state.goods = state.goods.filter((item) => item.id !== action.payload.id)
    },
    toggleGoods(state, action) {
      const toggleItem = state.goods.find(
        (item) => item.id === action.payload.id
      )
      toggleItem.completed = !toggleItem.completed
    },
    filterGoods(state, action) {
      return {
        ...state,
        goods: [...state.goods].filter(
          (item) => item.completed === !action.payload.completed
        ),
      }
    },
    filterGoodsAll(state, action) {
      return {
        ...state,
        goods: [...state.goods],
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGoods.fulfilled, (state, action) => {
      state.goods = action.payload
    })
  },
})

export const { removeGoods, toggleGoods, filterGoods, filterGoodsAll } =
  goodsSlice.actions

export default goodsSlice.reducer
