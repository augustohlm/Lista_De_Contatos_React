import styled from 'styled-components'

export const Formulario = styled.form`
  display: grid;
  gap: 16px;
  margin-top: 32px;
  padding: 24px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;

  h2 {
    font-size: 22px;
  }
`

export const Grupo = styled.label`
  display: grid;
  gap: 6px;
  font-weight: 600;
`

export const Campo = styled.input`
  width: 100%;
  min-width: 0;
  padding: 10px 12px;
  border: 1px solid #9ca3af;
  border-radius: 6px;

  &:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
`

export const Botao = styled.button`
  padding: 12px 16px;
  border: 0;
  border-radius: 6px;
  background-color: #2563eb;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #1d4ed8;
  }

  &:focus-visible {
    outline: 2px solid #2563eb;
    outline-offset: 2px;
  }
`
export const MensagemErro = styled.p`
  color: #b91c1c;
`
export const Acoes = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`

export const BotaoCancelar = styled(Botao)`
  background-color: #e5e7eb;
  color: #111827;

  &:hover {
    background-color: #d1d5db;
  }
`
