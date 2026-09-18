import styled from 'styled-components'

export const Card = styled.li`
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  overflow-wrap: anywhere;
`

export const Nome = styled.h2`
  margin-bottom: 8px;
  font-size: 20px;
`

export const Informacao = styled.p`
  color: #4b5563;

  & + & {
    margin-top: 4px;
  }
`
export const BotaoRemover = styled.button`
  margin-top: 16px;
  padding: 8px 12px;
  border: 1px solid #b91c1c;
  border-radius: 6px;
  background-color: #ffffff;
  color: #b91c1c;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background-color: #fee2e2;
  }

  &:focus-visible {
    outline: 2px solid #b91c1c;
    outline-offset: 3px;
  }
`
export const BotaoEditar = styled(BotaoRemover)`
  margin-right: 8px;
  border-color: #2563eb;
  color: #2563eb;

  &:hover {
    background-color: #eff6ff;
  }

  &:focus-visible {
    outline-color: #2563eb;
  }
`
