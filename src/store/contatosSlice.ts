import { createSlice } from '@reduxjs/toolkit'
import type { Contato } from '../types/Contato'

type ContatosState = {
  itens: Contato[]
}

const initialState: ContatosState = {
  itens: []
}

const contatosSlice = createSlice({
  name: 'contatos',
  initialState,
  reducers: {}
})

export default contatosSlice.reducer
