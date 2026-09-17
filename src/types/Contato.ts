export type Contato = {
  id: string
  nomeCompleto: string
  email: string
  telefone: string
}

export type DadosContato = Omit<Contato, 'id'>
