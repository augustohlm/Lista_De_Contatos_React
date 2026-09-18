import { Container, Titulo, Descricao } from './App.styles'
import CadastroContato from './containers/CadastroContato'
import EdicaoContato from './containers/EdicaoContato'
import ListaContatos from './containers/ListaContatos'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'

function App() {
  const navigate = useNavigate()
  return (
    <Container>
      <Titulo>Lista de contatos</Titulo>
      <Descricao>Cadastre e organize seus contatos em um só lugar.</Descricao>
      <Routes>
        <Route
          path="/"
          element={
            <ListaContatos
              onAdicionar={() => navigate('/AdicionarContato')}
              onEditar={(id) => navigate(`/EditarContato/${id}`)}
            />
          }
        />
        <Route
          path="AdicionarContato"
          element={<CadastroContato onVoltar={() => navigate('/')} />}
        />

        <Route
          path="/EditarContato/:id"
          element={<EdicaoContato onVoltar={() => navigate('/')} />}
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Container>
  )
}

export default App
