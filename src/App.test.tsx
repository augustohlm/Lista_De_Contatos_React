import { render, screen } from '@testing-library/react'
import App from './App'

test('exibe o título da lista de contatos', () => {
  render(<App />)
  const titulo = screen.getByRole('heading', {
    name: 'Lista de contatos'
  })
  expect(titulo).toBeInTheDocument()
})
