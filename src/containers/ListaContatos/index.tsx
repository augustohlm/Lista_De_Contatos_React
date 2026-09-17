import CardContato from '../../components/CardContato'
import { useAppSelector } from '../../store/hooks'
import { Secao, Contador, MensagemVazia, Lista } from './styles'

function ListaContatos() {
  const contatos = useAppSelector((state) => state.contatos.itens)
  const totalContatos = contatos.length

  return (
    <Secao aria-label="Contatos cadastrados">
      <Contador>Contatos cadastrados: {totalContatos}</Contador>
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
