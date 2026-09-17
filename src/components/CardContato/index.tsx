import type { Contato } from '../../types/Contato'
import { Card, Nome, Informacao } from './styles'

type Props = {
  contato: Contato
}

function CardContato({ contato }: Props) {
  return (
    <Card>
      <Nome>{contato.nomeCompleto}</Nome>
      <Informacao>E-mail: {contato.email}</Informacao>
      <Informacao>Telefone: {contato.telefone}</Informacao>
    </Card>
  )
}

export default CardContato
