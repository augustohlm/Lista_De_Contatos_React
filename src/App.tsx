import { Container, Titulo, Descricao } from './App.styles'
import ListaContatos from './containers/ListaContatos'

function App() {
  return (
    <Container>
      <Titulo>Lista de contatos</Titulo>
      <Descricao>Cadastre e organize seus contatos em um só lugar.</Descricao>
      <ListaContatos />
    </Container>
  )
}

export default App
