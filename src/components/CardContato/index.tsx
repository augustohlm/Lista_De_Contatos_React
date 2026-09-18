import type { Contato } from '../../types/Contato'
import { Card, Nome, Informacao, BotaoRemover, BotaoEditar } from './styles'

type Props = {
  contato: Contato
  onRemover: () => void
  onEditar: () => void
}

function CardContato({ contato, onRemover, onEditar }: Props) {
  return (
    <Card>
      <Nome>{contato.nomeCompleto}</Nome>
      <Informacao>E-mail: {contato.email}</Informacao>
      <Informacao>Telefone: {contato.telefone}</Informacao>

      <BotaoEditar
        type="button"
        onClick={onEditar}
        aria-label={`Editar ${contato.nomeCompleto}`}
      >
        Editar
      </BotaoEditar>

      <BotaoRemover
        type="button"
        onClick={onRemover}
        aria-label={`Remover ${contato.nomeCompleto}`}
      >
        Remover
      </BotaoRemover>
    </Card>
  )
}

export default CardContato
