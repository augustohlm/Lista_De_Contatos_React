import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import App from '../App'
import contatosReducer from '../store/contatosSlice'

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

function renderizarApp(caminho = '/') {
  const storeDeTeste = configureStore({
    reducer: { contatos: contatosReducer },
    preloadedState: {
      contatos: { itens: [ana, bruno] }
    }
  })

  render(
    <Provider store={storeDeTeste}>
      <MemoryRouter
        initialEntries={[caminho]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        <App />
      </MemoryRouter>
    </Provider>
  )

  return storeDeTeste
}

test('preenche os campos e salva a edição preservando o ID e os outros contatos', () => {
  const storeDeTeste = renderizarApp()

  userEvent.click(screen.getByRole('button', { name: 'Editar Ana Souza' }))

  expect(screen.getByLabelText('Nome completo')).toHaveValue(ana.nomeCompleto)
  expect(screen.getByLabelText('E-mail')).toHaveValue(ana.email)
  expect(screen.getByLabelText('Telefone')).toHaveValue(ana.telefone)

  userEvent.clear(screen.getByLabelText('Nome completo'))
  userEvent.type(screen.getByLabelText('Nome completo'), '  Ana Silva  ')
  userEvent.clear(screen.getByLabelText('E-mail'))
  userEvent.type(screen.getByLabelText('E-mail'), 'ana.silva@example.com')
  userEvent.clear(screen.getByLabelText('Telefone'))
  userEvent.type(screen.getByLabelText('Telefone'), '(31) 97777-1111')

  expect(storeDeTeste.getState().contatos.itens).toEqual([ana, bruno])

  userEvent.click(screen.getByRole('button', { name: 'Salvar alterações' }))

  expect(screen.queryByRole('form')).not.toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Ana Silva' })).toBeInTheDocument()
  expect(
    screen.queryByRole('heading', { name: 'Ana Souza' })
  ).not.toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Bruno Lima' })).toBeInTheDocument()
  expect(screen.getByText('E-mail: ana.silva@example.com')).toBeInTheDocument()
  expect(screen.getByText('Telefone: (31) 97777-1111')).toBeInTheDocument()
  expect(screen.getByText('Contatos cadastrados: 2')).toBeInTheDocument()
  expect(storeDeTeste.getState().contatos.itens).toEqual([
    {
      id: 'ana-1',
      nomeCompleto: 'Ana Silva',
      email: 'ana.silva@example.com',
      telefone: '(31) 97777-1111'
    },
    bruno
  ])
})

test('cancela a edição e descarta as alterações do formulário', () => {
  const storeDeTeste = renderizarApp('/EditarContato/ana-1')

  userEvent.clear(screen.getByLabelText('Nome completo'))
  userEvent.type(screen.getByLabelText('Nome completo'), 'Rascunho')
  userEvent.clear(screen.getByLabelText('E-mail'))
  userEvent.clear(screen.getByLabelText('Telefone'))
  userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

  expect(screen.queryByRole('form')).not.toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Ana Souza' })).toBeInTheDocument()
  expect(storeDeTeste.getState().contatos.itens).toEqual([ana, bruno])

  userEvent.click(screen.getByRole('button', { name: 'Editar Ana Souza' }))

  expect(screen.getByLabelText('Nome completo')).toHaveValue(ana.nomeCompleto)
  expect(screen.getByLabelText('E-mail')).toHaveValue(ana.email)
  expect(screen.getByLabelText('Telefone')).toHaveValue(ana.telefone)
})

test('mantém a edição aberta e preserva os dados quando o nome só contém espaços', () => {
  const storeDeTeste = renderizarApp('/EditarContato/ana-1')

  userEvent.clear(screen.getByLabelText('Nome completo'))
  userEvent.type(screen.getByLabelText('Nome completo'), '   ')
  userEvent.click(screen.getByRole('button', { name: 'Salvar alterações' }))

  expect(
    screen.getByRole('form', { name: 'Edição de contato' })
  ).toBeInTheDocument()
  expect(screen.getByRole('alert')).toHaveTextContent(
    'Preencha todos os campos com informações válidas.'
  )
  expect(storeDeTeste.getState().contatos.itens).toEqual([ana, bruno])
})

test('retorna à lista quando o ID da rota não corresponde a um contato', () => {
  const storeDeTeste = renderizarApp('/EditarContato/id-inexistente')

  expect(screen.queryByRole('form')).not.toBeInTheDocument()
  expect(
    screen.getByRole('region', { name: 'Contatos cadastrados' })
  ).toBeInTheDocument()
  expect(screen.getByText('Contatos cadastrados: 2')).toBeInTheDocument()
  expect(storeDeTeste.getState().contatos.itens).toEqual([ana, bruno])
})

