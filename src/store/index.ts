import { configureStore } from '@reduxjs/toolkit'
import contatosReducer from './contatosSlice'
import { carregarContatos, salvarContatos } from '../services/armazenamento'

export function criarStore() {
  const novaStore = configureStore({
    reducer: {
      contatos: contatosReducer
    },
    preloadedState: {
      contatos: {
        itens: carregarContatos()
      }
    }
  })

  novaStore.subscribe(() => {
    salvarContatos(novaStore.getState().contatos.itens)
  })
  return novaStore
}

export const store = criarStore()

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
