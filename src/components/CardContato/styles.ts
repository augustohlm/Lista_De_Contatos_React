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
