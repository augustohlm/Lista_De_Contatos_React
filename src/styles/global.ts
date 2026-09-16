import { createGlobalStyle } from 'styled-components'

const EstiloGlobal = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, sans-serif;
    background-color: #f3f4f6;
    color:#111827;
    line-height: 1.5;
  }

  button, input {
    font: inherit;
  }
`
export default EstiloGlobal
