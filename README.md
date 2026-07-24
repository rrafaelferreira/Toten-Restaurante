# 🍔 Toten Restaurante - Sistema de Autoatendimento

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Context API](https://img.shields.io/badge/Context_API-61DAFB?style=for-the-badge&logo=react-router&logoColor=black)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

Uma aplicação web interativa e moderna desenvolvida para **totens de autoatendimento em restaurantes**. O sistema foi concebido para oferecer uma experiência fluida, ágil e intuitiva ao cliente final, guiando-o desde a tela de abertura até a seleção de produtos no cardápio, personalização do pedido, autenticação e finalização do pagamento.

---

> 💡 **Nota do Desenvolvedor & Jornada de Aprendizado:**
> Este projeto representa um marco importante no meu desenvolvimento profissional: foi a minha **primeira experiência construindo uma aplicação em React**! 
> 
> Utilizei o apoio de **Inteligência Artificial** como uma ferramenta de mentoria, suporte e aceleração de aprendizado. O objetivo principal deste projeto foi explorar novas tecnologias na prática, entender conceitos fundamentais do frontend moderno (como componentização, estados, rotas e consumo de APIs) e criar uma solução real para autoatendimento.
> 
> *Obs: Este arquivo README também foi gerado com o auxílio de IA para estruturar, organizar e documentar a arquitetura da aplicação com clareza.*

---

## 👥 Colaboradores & Divisão do Projeto

O desenvolvimento do sistema foi realizado de forma colaborativa, dividindo as responsabilidades da arquitetura da seguinte maneira:

* **Front-end / Interface do Usuário:** Desenvolvido por mim, focando na criação dos componentes em React, gerenciamento do estado global do carrinho, experiência do usuário (UX/UI), responsividade para o totem e integração com as rotas.
* **Back-end / API & Servidor:** Desenvolvido pelo **[Natan Santana](https://github.com/NatanSantana)**, responsável por toda a infraestrutura do servidor, persistência de dados de usuários e pedidos, autenticação de segurança e regras de negócio da API (hospedada no Render).

---

## 🗺️ Fluxo de Telas (Rotas)

A aplicação conta com um fluxo dinâmico de rotas gerenciado via `react-router-dom`:

* **` / ` (Home):** Tela de boas-vindas (*splash screen*) criada para atrair a atenção do cliente e iniciar a interação no totem.
* **` /order-type ` (OrderType):** Etapa de decisão para o cliente escolher o tipo de consumo (Ex: "Comer no Local" ou "Para Levar").
* **` /menu ` (Menu):** O coração da aplicação. Conta com carrossel dinâmico por categorias, catálogo de produtos, modais interativos e acesso ao perﬁl.
* **` /cart ` (ShoppingCart):** Tela dedicada ao resumo da compra, permitindo revisar itens, ajustar quantidades e conferir os valores.
* **` /login ` (Logins):** Interface de acesso para clientes cadastrados efetuarem autenticação no sistema.
* **` /register ` (Registers):** Formulário de novos usuários com validação estrita de e-mail e integração com o backend.
* **` /payment ` (Payment):** Etapa final de processamento do pedido e escolha das opções de pagamento.

---

## ✨ Destaques do Projeto

- 🛒 **Gerenciamento de Estado Global:** Utilização da `CartContext` API do React para sincronizar itens do carrinho em tempo real entre todas as telas e componentes sem necessidade de bibliotecas externas pesadas.
- 🎡 **Carrossel do Cardápio (`CarouselStructure`):** Componente interativo que permite trocar dinamicamente as categorias de produtos (Hambúrgueres, Acompanhamentos, Bebidas) mantendo a fluidez visual.
- 🍱 **Grid Modular de Produtos (`ProductsSection` & `ProductCard`):** Exibição de itens com imagem, preços e botões de ação com rápida resposta ao toque.
- 🔒 **Validação de Formulários:** Sistema de verificação no cadastro limitando e-mails a domínios de provedores reais (`@gmail.com`, `@outlook.com`, etc.).
- 🎨 **Design Imersivo (*Dark Theme* & *Glassmorphism*):** Visual contemporâneo com transparências e desfoque (*blur*), projetado para telas grandes de totens e otimizado para navegação mobile.

---

## 🛠️ Tecnologias Utilizadas

* **[React](https://reactjs.org/)** - Biblioteca JavaScript para construção da interface de usuário.
* **[React Router DOM](https://reactrouter.com/)** - Gerenciamento de navegação e rotas SPA.
* **[Context API](https://react.dev/reference/react/useContext)** - Gerenciamento descentralizado do estado do carrinho.
* **CSS3 Modular** - Estilização moderna e responsiva customizada.
* **AI-Assisted Development** - Uso de IA como ferramenta de suporte no aprendizado, resolução de bugs de CSS e estruturação da documentação.

---

## 📁 Estrutura de Pastas

```text
src/
├── assets/                  # Recursos visuais (imagens de fundo, ícones e assets)
├── components/              # Componentes genéricos e reutilizáveis
│   ├── button/              # Botões de ação e componentes reutilizáveis
│   ├── carousel/            # Estrutura e animações do carrossel do cardápio
│   ├── formularios/         # Componentes das telas/modais de Login e Cadastro
│   └── ProductSection/      # Grid de exibição de produtos e cards individuais
├── data/                    # Estrutura de dados local/mock para o cardápio
├── pages/                   # Páginas principais ligadas ao roteador
│   ├── Cart/                # Tela do Carrinho de Compras
│   ├── Home/                # Tela Inicial (Splash Screen)
│   ├── Menu/                # Tela Principal do Cardápio
│   ├── OrderType/           # Tela de Seleção (Para Levar / Comer no Local)
│   └── Payments/            # Tela de Pagamento
├── Shop/                    # Contexto Global do Carrinho (CartContext)
├── App.jsx                  # Declaração das Rotas e Provedores do React
├── App.css                  # Estilos e regras globais da aplicação
└── main.jsx                 # Ponto de entrada e renderização do React