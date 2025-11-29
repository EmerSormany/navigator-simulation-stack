# 🌐 Simulador de Navegador com Pilha (Stack)
Este projeto é uma aplicação web desenvolvida em <b>Node.js</b> que simula o comportamento de navegação de um browser (histórico, voltar e avançar). O objetivo principal é demonstrar a aplicação prática da estrutura de dados <b>Pilha (Stack)</b>.

O sistema utiliza a <b>Google Custom Search API</b> para realizar buscas reais e exibir resultados, gerenciando o fluxo de navegação através de duas pilhas distintas.

# 🚀 Funcionalidades
* Busca Real: Integração com API do Google para buscar termos na web.

* Navegação Histórica:

  * <b>Voltar (`Pop` na Pilha de Histórico):</b> Retorna à página anterior.

  * <b>Avançar (`Push` na Pilha de Histórico):</b> Refaz a navegação para uma página visitada anteriormente.

* <b>Algoritmo de Limpeza:</b> Ao realizar uma nova busca, o histórico "futuro" (pilha de avanço) é limpo, simulando fielmente um navegador real.

* <b>Interface Visual:</b> Renderização dinâmica com EJS, exibindo status dos botões (habilitado/desabilitado).

# 🛠️ Tecnologias Utilizadas
* <b>Node.js:</b> Ambiente de execução.

* </b>Express:</b> Framework para servidor web e rotas.

* <b>Axios:</b> Cliente HTTP para consumir a API do Google.

* <b>EJS:</b> Template engine para renderizar o HTML.

* <b>Estrutura de Dados:</b> Implementação manual de uma classe `HistoricalStack` usando lista encadeada (nós).
  
<hr>

# 🧠 Como Funciona (Lógica das Pilhas)
O coração do projeto reside no arquivo `src/utils/stack.js`. Utilizamos duas instâncias da classe `HistoricalStack` para gerenciar a navegação:

1. `goBack` <b>(Pilha de Histórico):</b> Armazena as páginas visitadas.

2. `goForward` <b>(Pilha de Avanço):</b> Armazena temporariamente páginas que foram removidas ao clicar em "Voltar".

### O Fluxo de Dados
* <b>Nova Busca (`/search`):</b>

  1. O termo é buscado na API.

  2. O resultado é empilhado em `goBack`.

  3. A pilha `goForward` é <b>limpa</b> (`clear()`), pois uma nova linha do tempo foi criada.

* <b>Voltar</b> (`/back`):

  1. O topo é removido de `goBack` (`pop()`).

  2. Esse item é empilhado em `goForward` (`push()`).

* Avançar (`/forward`):

  1. O topo é removido de goForward (pop()).

  2. Esse item retorna para o topo de goBack (push()).
<hr>

# 📦 Instalação e Configuração

<b>Pré-requisitos</b>
* Node.js instalado.

* Uma chave de API do Google (Custom Search JSON API) e um Search Engine ID (CX).

<b>Passo a Passo</b>
1. <b>Clone o repositório:</b>

``` 
git clone https://github.com/EmerSormany/navigator-simulation-stack.git
cd navigator-simulation-stack
```

2. Instale as dependências:
```
npm install
```
3. <b>Configuração de Variáveis de Ambiente:</b> Crie um arquivo `.env` na raiz do projeto e adicione suas credenciais do Google:

```
GOOGLE_API_KEY=sua_chave_api_aqui
CX=seu_search_engine_id_aqui
```
<i>(O arquivo `src/controllers/controllers.js` utiliza estas variáveis para montar a URL de busca)</i>

4. <b>Modo Simulação (Opcional):</b> Se não quiser usar a API do Google agora, você pode usar o modo "Simulador" embutido no código.

   4.1. Abra `src/controllers/controllers.js`.

   4.2. Comente o bloco `try/catch` dentro do método `search`.

   4.3. Descomente as linhas que usam a função `googleSearchSimulator`.

# ▶️ Executando o Projeto
Para iniciar o servidor:
```
node src/index.js
```
O servidor iniciará em `http://localhost:3000`.

<hr>

# 📂 Estrutura de Pastas

```
src/
├── controllers/
│   └── controllers.js    # Lógica de controle e regras de negócio
├── routes/
│   └── routes.js         # Definição das rotas (GET/POST)
├── template/
│   └── index.ejs         # Interface gráfica (Frontend)
├── utils/
│   └── stack.js          # Implementação da estrutura de dados Pilha
└── index.js              # Ponto de entrada da aplicação
```

Desenvolvido como parte da disciplina de Estrutura de Dados.
