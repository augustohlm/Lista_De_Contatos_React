import styled from 'styled-components'

export const Secao = styled.section`
  margin-top: 32px;
`

export const Contador = styled.p`
  color: #4b5563;
  font-weight: 600;
`
export const Lista = styled.ul`
  display: grid;
  gap: 16px;
  margin-top: 16px;
  list-style: none;
`
export const MensagemVazia = styled.p`
  margin-top: 16px;
  color: #4b5563;
`
export const Cabecalho = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
`

export const BotaoAdicionar = styled.button`
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
