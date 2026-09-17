import contatosReducer, { adicionar } from '../store/contatosSlice'

test('adiciona contatos com IDs distintos e preserva o estado anterior', () => {
  const dadosAna = {
    nomeCompleto: 'Ana Souza',
    email: 'ana@example.com',
    telefone: '(11) 99999-1234'
  }

  const dadosBruno = {
    nomeCompleto: 'Bruno Lima',
    email: 'bruno@example.com',
    telefone: '(21) 98888-5678'
  }

  const acaoAna = adicionar(dadosAna)
  const estadoComAna = contatosReducer(undefined, acaoAna)

  const acaoBruno = adicionar(dadosBruno)
  const estadoComDois = contatosReducer(estadoComAna, acaoBruno)

  expect(estadoComAna.itens).toEqual([
    {
      ...dadosAna,
      id: acaoAna.payload.id
    }
  ])

  expect(estadoComDois.itens).toEqual([
    {
      ...dadosAna,
      id: acaoAna.payload.id
    },
    {
      ...dadosBruno,
      id: acaoBruno.payload.id
    }
  ])

  expect(acaoAna.payload.id).not.toBe('')
  expect(acaoBruno.payload.id).not.toBe('')
  expect(acaoAna.payload.id).not.toBe(acaoBruno.payload.id)
})
