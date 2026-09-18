import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import App from '../App'
import contatosReducer from '../store/contatosSlice'

test('remove o contato escolhido e mostra a mensagem quando a lista fica vazia', () => {
  const ana = {
    id: 'ana-1',
    nomeCompleto: 'Ana Souza',
    email: 'ana@example.com',
    telefone: '(11) 99999-1234'
  }

  const bruno = {
    id: 'bruno-2',
    nomeCompleto: 'Bruno Lima',
    email: 'bruno@example.com',
    telefone: '(21) 98888-5678'
  }

  const storeDeTeste = configureStore({
    reducer: { contatos: contatosReducer },
    preloadedState: {
      contatos: { itens: [ana, bruno] }
    }
  })

  render(
    <Provider store={storeDeTeste}>
      <MemoryRouter
        initialEntries={['/']}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>
    </Provider>
  )

  expect(screen.getByText('Contatos cadastrados: 2')).toBeInTheDocument()

  userEvent.click(screen.getByRole('button', { name: 'Remover Ana Souza' }))

  expect(
    screen.queryByRole('heading', { name: 'Ana Souza' })
  ).not.toBeInTheDocument()

  expect(
    screen.getByRole('heading', { name: 'Bruno Lima' })
  ).toBeInTheDocument()
  expect(screen.getAllByRole('listitem')).toHaveLength(1)
  expect(screen.getByText('Contatos cadastrados: 1')).toBeInTheDocument()
  expect(storeDeTeste.getState().contatos.itens).toEqual([bruno])

  userEvent.click(screen.getByRole('button', { name: 'Remover Bruno Lima' }))

  expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
  expect(screen.getByText('Contatos cadastrados: 0')).toBeInTheDocument()
  expect(screen.getByText('Nenhum contato cadastrado.')).toBeInTheDocument()
  expect(storeDeTeste.getState().contatos.itens).toEqual([])
})
