import type { Contato } from '../types/Contato'

export const CHAVE_CONTATOS = 'lista-de-contatos:contatos:v1'

function ehContato(valor: unknown): valor is Contato {
  if (typeof valor !== 'object' || valor === null) return false

  const contato = valor as Record<string, unknown>

  return (
    typeof contato.id === 'string' &&
    contato.id.trim() !== '' &&
    typeof contato.nomeCompleto === 'string' &&
    typeof contato.email === 'string' &&
    typeof contato.telefone === 'string'
  )
}

export function carregarContatos(): Contato[] {
  try {
    const texto = localStorage.getItem(CHAVE_CONTATOS)
    if (!texto) return []

    const dados: unknown = JSON.parse(texto)

    if (!Array.isArray(dados) || !dados.every(ehContato)) return []
    return dados
  } catch {
    return []
  }
}

export function salvarContatos(contatos: Contato[]): void {
  try {
    localStorage.setItem(CHAVE_CONTATOS, JSON.stringify(contatos))
  } catch {
    console.warn(
      'Não foi possível salvar os contatos neste navegador. As alterações estão apenas na memória.'
    )
  }
}
