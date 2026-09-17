import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import App from '../App'
import contatosReducer from '../store/contatosSlice'

function renderizarApp() {
  const storeDeTeste = configureStore({
    reducer: { contatos: contatosReducer }
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

  return storeDeTeste
}

test('abre o cadastro, salva e retorna à lista', () => {
  const storeDeTeste = renderizarApp()

  expect(screen.queryByRole('form')).not.toBeInTheDocument()

  userEvent.click(screen.getByRole('button', { name: 'Adicionar contato' }))

  expect(
    screen.queryByRole('region', { name: 'Contatos cadastrados' })
  ).not.toBeInTheDocument()

  userEvent.type(screen.getByLabelText('Nome completo'), '  Ana Souza  ')
  userEvent.type(screen.getByLabelText('E-mail'), 'ana@example.com')
  userEvent.type(screen.getByLabelText('Telefone'), '(11) 99999-1234')
  userEvent.click(screen.getByRole('button', { name: 'Salvar contato' }))

  expect(screen.queryByRole('form')).not.toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Ana Souza' })).toBeInTheDocument()
  expect(screen.getByText('Contatos cadastrados: 1')).toBeInTheDocument()
  expect(storeDeTeste.getState().contatos.itens).toEqual([
    expect.objectContaining({
      nomeCompleto: 'Ana Souza',
      email: 'ana@example.com',
      telefone: '(11) 99999-1234'
    })
  ])

  userEvent.click(screen.getByRole('button', { name: 'Adicionar contato' }))
  expect(screen.getByLabelText('Nome completo')).toHaveValue('')
  expect(screen.getByLabelText('E-mail')).toHaveValue('')
  expect(screen.getByLabelText('Telefone')).toHaveValue('')

  userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))
  expect(screen.getByRole('heading', { name: 'Ana Souza' })).toBeInTheDocument()
  expect(storeDeTeste.getState().contatos.itens).toHaveLength(1)
})

test('cancela um cadastro incompleto e descarta o rascunho', () => {
  const storeDeTeste = renderizarApp()

  userEvent.click(screen.getByRole('button', { name: 'Adicionar contato' }))
  userEvent.type(screen.getByLabelText('Nome completo'), 'Rascunho')
  userEvent.click(screen.getByRole('button', { name: 'Cancelar' }))

  expect(screen.queryByRole('form')).not.toBeInTheDocument()
  expect(screen.getByText('Contatos cadastrados: 0')).toBeInTheDocument()
  expect(storeDeTeste.getState().contatos.itens).toEqual([])

  userEvent.click(screen.getByRole('button', { name: 'Adicionar contato' }))
  expect(screen.getByLabelText('Nome completo')).toHaveValue('')
})

test('mantém o cadastro aberto quando o nome contém apenas espaços', () => {
  const storeDeTeste = renderizarApp()

  userEvent.click(screen.getByRole('button', { name: 'Adicionar contato' }))
  userEvent.type(screen.getByLabelText('Nome completo'), '   ')
  userEvent.type(screen.getByLabelText('E-mail'), 'ana@example.com')
  userEvent.type(screen.getByLabelText('Telefone'), '(11) 99999-1234')
  userEvent.click(screen.getByRole('button', { name: 'Salvar contato' }))

  expect(
    screen.getByRole('form', { name: 'Cadastro de contato' })
  ).toBeInTheDocument()
  expect(screen.getByRole('alert')).toHaveTextContent(
    'Preencha todos os campos com informações válidas.'
  )
  expect(storeDeTeste.getState().contatos.itens).toEqual([])
})
