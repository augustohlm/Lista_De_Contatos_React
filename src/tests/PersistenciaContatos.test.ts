import { criarStore } from '../store'
import { adicionar, editar, remover } from '../store/contatosSlice'
import { CHAVE_CONTATOS } from '../services/armazenamento'

beforeEach(() => {
  localStorage.clear()
})

afterEach(() => {
  jest.restoreAllMocks()
  localStorage.clear()
})

test('começa com uma lista vazia quando não existem contatos salvos', () => {
  expect(criarStore().getState().contatos.itens).toEqual([])
})

test('recupera inclusões, edições e remoções ao recriar a store', () => {
  const primeiraStore = criarStore()
  const acaoAna = adicionar({
    nomeCompleto: 'Ana Souza',
    email: 'ana@example.com',
    telefone: '(11) 99999-1234'
  })
  const acaoBruno = adicionar({
    nomeCompleto: 'Bruno Lima',
    email: 'bruno@example.com',
    telefone: '(21) 98888-5678'
  })

  primeiraStore.dispatch(acaoAna)
  primeiraStore.dispatch(acaoBruno)

  const segundaStore = criarStore()
  expect(segundaStore.getState().contatos.itens).toEqual([
    acaoAna.payload,
    acaoBruno.payload
  ])

  const anaEditada = { ...acaoAna.payload, nomeCompleto: 'Ana Silva' }
  segundaStore.dispatch(editar(anaEditada))
  segundaStore.dispatch(remover(acaoBruno.payload.id))

  const terceiraStore = criarStore()
  expect(terceiraStore.getState().contatos.itens).toEqual([anaEditada])

  terceiraStore.dispatch(remover(acaoAna.payload.id))
  expect(criarStore().getState().contatos.itens).toEqual([])
  expect(localStorage.getItem(CHAVE_CONTATOS)).toBe('[]')
})

test('abre sem travar quando o texto salvo não é um JSON válido', () => {
  localStorage.setItem(CHAVE_CONTATOS, '{json quebrado')

  expect(criarStore().getState().contatos.itens).toEqual([])
})

test('ignora dados salvos com estrutura diferente de contatos', () => {
  localStorage.setItem(CHAVE_CONTATOS, JSON.stringify([{ id: 'incompleto' }]))

  expect(criarStore().getState().contatos.itens).toEqual([])
})

test('mantém a aplicação funcionando quando o navegador impede a gravação', () => {
  const aviso = jest.spyOn(console, 'warn').mockImplementation(() => undefined)
  jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('Gravação indisponível')
  })

  const storeDeTeste = criarStore()
  const acao = adicionar({
    nomeCompleto: 'Ana Souza',
    email: 'ana@example.com',
    telefone: '(11) 99999-1234'
  })

  expect(() => storeDeTeste.dispatch(acao)).not.toThrow()
  expect(storeDeTeste.getState().contatos.itens).toEqual([acao.payload])
  expect(aviso).toHaveBeenCalledWith(
    'Não foi possível salvar os contatos neste navegador. As alterações estão apenas na memória.'
  )
})
