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
    },
    remover(state, action: PayloadAction<string>) {
      state.itens = state.itens.filter(
        (contato) => contato.id !== action.payload
      )
    },
    editar(state, action: PayloadAction<Contato>) {
      const contato = state.itens.find((item) => item.id === action.payload.id)
      if (contato) {
        contato.nomeCompleto = action.payload.nomeCompleto
        contato.email = action.payload.email
        contato.telefone = action.payload.telefone
      }
    }
  }
})

export const { adicionar, remover, editar } = contatosSlice.actions
export default contatosSlice.reducer
