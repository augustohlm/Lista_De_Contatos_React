import CardContato from '../../components/CardContato'
import { useAppSelector } from '../../store/hooks'
import {
  Secao,
  Contador,
  MensagemVazia,
  Lista,
  Cabecalho,
  BotaoAdicionar
} from './styles'

type Props = {
  onAdicionar: () => void
}

function ListaContatos({ onAdicionar }: Props) {
  const contatos = useAppSelector((state) => state.contatos.itens)
  const totalContatos = contatos.length

  return (
    <Secao aria-label="Contatos cadastrados">
      <Cabecalho>
        <Contador>Contatos cadastrados: {totalContatos}</Contador>
        <BotaoAdicionar type="button" onClick={onAdicionar}>
          Adicionar contato
        </BotaoAdicionar>
      </Cabecalho>
      {totalContatos === 0 ? (
        <MensagemVazia>Nenhum contato cadastrado.</MensagemVazia>
      ) : (
        <Lista aria-label="Lista de contatos">
          {contatos.map((contato) => (
            <CardContato key={contato.id} contato={contato} />
          ))}
        </Lista>
      )}
    </Secao>
  )
}

export default ListaContatos
