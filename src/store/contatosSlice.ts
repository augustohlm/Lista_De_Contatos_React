import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import type { Contato, DadosContato } from '../types/Contato'

type ContatosState = {
  itens: Contato[]
}

const initialState: ContatosState = {
  itens: []
}

const contatosSlice = createSlice({
  name: 'contatos',
  initialState,
  reducers: {
    adicionar: {
      reducer(state, action: PayloadAction<Contato>) {
        state.itens.push(action.payload)
      },
      prepare(dados: DadosContato) {
        return {
          payload: {
            ...dados,
            id: nanoid()
          }
        }
      }
    }
  }
})

export const { adicionar } = contatosSlice.actions
export default contatosSlice.reducer
