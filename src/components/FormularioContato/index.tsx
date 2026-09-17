import { useState } from 'react'
import type { FormEvent } from 'react'

import type { DadosContato } from '../../types/Contato'
import {
  Formulario,
  Grupo,
  Campo,
  Botao,
  MensagemErro,
  Acoes,
  BotaoCancelar
} from './styles'

type Props = {
  onSalvar: (dados: DadosContato) => void
  onCancelar: () => void
}

function FormularioContato({ onSalvar, onCancelar }: Props) {
  const [nomeCompleto, setNomeCompleto] = useState('')
  const [email, setEmail] = useState('')
  const [telefone, setTelefone] = useState('')
  const [erro, setErro] = useState('')

  function enviarFormulario(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault()

    const dados: DadosContato = {
      nomeCompleto: nomeCompleto.trim(),
      email: email.trim(),
      telefone: telefone.trim()
    }

    if (!dados.nomeCompleto || !dados.email || !dados.telefone) {
      setErro('Preencha todos os campos com informações válidas.')
      return
    }
    onSalvar(dados)
  }

  return (
    <Formulario onSubmit={enviarFormulario} aria-label="Cadastro de contato">
      <h2>Novo contato</h2>
      <Grupo>
        Nome completo
        <Campo
          name="nomeCompleto"
          type="text"
          autoComplete="name"
          value={nomeCompleto}
          onChange={(evento) => setNomeCompleto(evento.target.value)}
          required
        />
      </Grupo>
      <Grupo>
        E-mail
        <Campo
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(evento) => setEmail(evento.target.value)}
          required
        />
      </Grupo>
      <Grupo>
        Telefone
        <Campo
          name="telefone"
          type="tel"
          autoComplete="tel"
          value={telefone}
          onChange={(evento) => setTelefone(evento.target.value)}
          required
        />
      </Grupo>
      {erro && <MensagemErro role="alert">{erro}</MensagemErro>}

      <Acoes>
        <Botao type="submit">Salvar contato</Botao>
        <BotaoCancelar type="button" onClick={onCancelar}>
          Cancelar
        </BotaoCancelar>
      </Acoes>
    </Formulario>
  )
}

export default FormularioContato
