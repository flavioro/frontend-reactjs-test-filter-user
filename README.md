# Teste Front-End | SevenApps

A aplicação React.js contém os componentes Home e UserList, e o serviço user. 

Components:
  - Home: Página inicial
  - UserList: Componente responsável por renderizar lista de usuários com barra de busca para filtro por nome e idade.

Services:
  - user: Abstrai requisições referentes a entidade usuário.

Libraries usadas:
  - axios - http client para realizar as requisições
  - react-bootstrap - react components com estilos bootstrap
  - lodash - debounce para melhor performance do filtro de usuários
  - react-virtualized - react component para renderização eficiente de grandes listas
  - styled-components - lib que facilita a escrita de estilos no component (js)


## Instalação

Instalação:

`npm install`  

Iniciar Server:

`npm start`  

App:

`localhost:3000/`