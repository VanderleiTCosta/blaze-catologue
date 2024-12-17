import styled, { createGlobalStyle } from 'styled-components';

// Estilo global
export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'MinhaFonte';
    src: url('../public/fonts/Agdasima-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  /* Estilos da Scrollbar */
  ::-webkit-scrollbar {
    width: 8px; /* Largura da scrollbar */
  }

  ::-webkit-scrollbar-track {
    background: #d3d3d3; /* Cor do fundo da scrollbar */
  }

  ::-webkit-scrollbar-thumb {
    background: red; /* Cor da parte de rolagem da scrollbar */
    border-radius: 4px; /* Arredondar as bordas da parte de rolagem */
  }

  ::-webkit-scrollbar-thumb:hover {
    background: darkred; /* Cor da parte de rolagem ao passar o mouse */
  }
`;

// Estilo para a aplicação
export const AppContainer = styled.div`
  text-align: center;
  background-color: black;
  font-family: 'MinhaFonte', sans-serif; /* Aplicar a fonte global no AppContainer */
`;