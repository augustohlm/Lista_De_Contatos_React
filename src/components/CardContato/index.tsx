import type { Contato } from '../../types/Contato'
import { Card, Nome, Informacao, BotaoRemover } from './styles'

type Props = {
  contato: Contato
  onRemover: () => void
}

function CardContato({ contato, onRemover }: Props) {
  return (
    <Card>
      <Nome>{contato.nomeCompleto}</Nome>
      <Informacao>E-mail: {contato.email}</Informacao>
      <Informacao>Telefone: {contato.telefone}</Informacao>

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
