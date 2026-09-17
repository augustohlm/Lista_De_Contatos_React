import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'

import App from './App'
import contatosReducer from './store/contatosSlice'

test('exibe o título e a quantidade de contatos do Redux', () => {
  const storeDeTeste = configureStore({
    reducer: {
      contatos: contatosReducer
    },
    preloadedState: {
      contatos: {
        itens: [
          {
            id: 'teste-1',
            nomeCompleto: 'Ana Souza',
            email: 'ana@example.com',
            telefone: '(11) 99999-1234'
          }
        ]
      }
    }
  })

  render(
    <Provider store={storeDeTeste}>
      <App />
    </Provider>
  )

  expect(screen.getAllByRole('listitem')).toHaveLength(1)

  expect(screen.getByRole('heading', { name: 'Ana Souza' })).toBeInTheDocument()

  expect(screen.getByText('E-mail: ana@example.com')).toBeInTheDocument()

  expect(screen.getByText('Telefone: (11) 99999-1234')).toBeInTheDocument()

  expect(
    screen.queryByText('Nenhum contato cadastrado.')
  ).not.toBeInTheDocument()
})

test('informa quando a lista de contatos está vazia', () => {
  const storeDeTeste = configureStore({
    reducer: {
      contatos: contatosReducer
    }
  })

  render(
    <Provider store={storeDeTeste}>
      <App />
    </Provider>
  )

  expect(screen.getByText('Contatos cadastrados: 0')).toBeInTheDocument()

  expect(screen.getByText('Nenhum contato cadastrado.')).toBeInTheDocument()
})
