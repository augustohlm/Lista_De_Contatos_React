import { Navigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { DadosContato } from '../../types/Contato'
import { editar } from '../../store/contatosSlice'
import FormularioContato from '../../components/FormularioContato'

type Props = {
  onVoltar: () => void
}

function EdicaoContato({ onVoltar }: Props) {
  const { id } = useParams<{ id: string }>()
  const dispatch = useAppDispatch()

  const contato = useAppSelector((state) =>
    state.contatos.itens.find((item) => item.id === id)
  )

  function salvarEdicao(dados: DadosContato) {
    if (!contato) return
    dispatch(editar({ ...dados, id: contato.id }))
    onVoltar()
  }
  if (!contato) {
    return <Navigate to="/" replace />
  }
  return (
    <FormularioContato
      key={contato.id}
      dadosIniciais={contato}
      onSalvar={salvarEdicao}
      onCancelar={onVoltar}
    />
  )
}

export default EdicaoContato
