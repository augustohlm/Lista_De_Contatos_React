import FormularioContato from '../../components/FormularioContato'
import { adicionar } from '../../store/contatosSlice'
import { useAppDispatch } from '../../store/hooks'
import { DadosContato } from '../../types/Contato'

type Props = {
  onVoltar: () => void
}

function CadastroContato({ onVoltar }: Props) {
  const dispatch = useAppDispatch()

  function cadastrarContato(dados: DadosContato) {
    dispatch(adicionar(dados))
    onVoltar()
  }

  return <FormularioContato onSalvar={cadastrarContato} onCancelar={onVoltar} />
}
export default CadastroContato
