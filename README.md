# IA Node Cart — Front-end

> Front-end de exemplo para um carrinho de compras e chat, construído com Next.js. Feito acompanhando as aulas da RocketSeat.

## Descrição

Aplicação de interface que demonstra um fluxo simples de e-commerce com listagem de produtos, carrinho e um chat/assistente. Projeto organizado com o roteamento `app` do Next.js (app router), componentes reutilizáveis, integração via `axios` e pequenas utilidades em `lib`.

## Funcionalidades

- Listagem de produtos (rota `products`).
- Página de carrinho com resumo dos itens adicionados (`cart`).
- Chat/assistente com componentes de mensagem (`ChatMessage.tsx`) e barra lateral de conversas (`ConversationSidebar.tsx`).
- Componentes de interface reutilizáveis em `components/ui` (botões, inputs, card, badge, dropdown, etc.).
- Integração HTTP via `axios` em `app/api/axios.ts`.
- Estilização com Tailwind CSS e suporte a temas com `next-themes`.

## Regras / Comportamento

- Adicionar produtos ao carrinho a partir da listagem.
- Atualizar quantidades e remover itens diretamente na página do carrinho.
- O chat exibe mensagens usando o componente `ChatMessage` e organiza conversas na `ConversationSidebar`.
- A aplicação é focada em demonstrar interface e experiência do usuário (UI/UX); validações e persistência podem depender de um backend.

## Estrutura de pastas (resumo)

- `app/` — Roteamento e páginas do Next.js
  - `globals.css` — estilos globais
  - `layout.tsx`, `page.tsx` — layout e página principal
  - `sidebar.tsx` — barra lateral da aplicação
  - `api/axios.ts` — instância do Axios
  - `cart/` — página do carrinho (`page.tsx`)
  - `products/` — página de listagem de produtos (`page.tsx`)
  - `types/` — tipos TypeScript (`cart.ts`, `chat.ts`, `product.ts`)
- `components/` — componentes React reutilizáveis
  - `ChatMessage.tsx`, `ConversationSidebar.tsx` — componentes do chat
  - `ui/` — primitives e componentes de UI (botões, inputs, card, dropdown, badge, etc.)
- `lib/` — utilitários (ex.: `utils.ts`)
- `public/` — arquivos estáticos

Observação: a estrutura completa está na raiz do projeto.

## Dependências principais

- `next`, `react`, `react-dom` — framework e runtime
- `axios` — requisições HTTP
- `tailwindcss` — estilos
- Bibliotecas auxiliares de UI: `@radix-ui`, `lucide-react`, `sonner`, `swr`

Consulte `package.json` para a lista completa de dependências.

## Como executar (desenvolvimento)

Pré-requisitos:
- Node.js (recomenda-se versão LTS)
- pnpm (recomendado, há `pnpm-lock.yaml`) ou npm/yarn

Com `pnpm`:

```bash
pnpm install
pnpm dev
```

O comando `dev` inicia o Next.js em modo de desenvolvimento. Neste projeto a porta configurada é a `3001` (script `dev: "next dev -p 3001").

Com `npm`:

```bash
npm install
npm run dev
```

Build e execução em produção:

```bash
pnpm build
pnpm start
```

ou com `npm run build` seguido de `npm run start`.

Abra http://localhost:3001 no navegador para ver a aplicação.

## Observações de desenvolvimento

- Lint: `pnpm run lint` (ou `npm run lint`).
- Tipagem: o projeto usa TypeScript; verifique `tsconfig.json` para configurações.
- Para integrar com um backend, ajuste a `baseURL` em `app/api/axios.ts`.

## Créditos

Projeto criado acompanhando as aulas da RocketSeat — conteúdos e estrutura foram inspirados pelas aulas assistidas durante o desenvolvimento.

## Próximos passos sugeridos

- Integrar um backend real para persistência do carrinho e conversas.
- Adicionar testes unitários e de integração.
- Melhorar acessibilidade e cobertura de responsividade.

---

Se desejar, posso também:

- Adicionar badges (build, lint) ao topo do `README.md`.
- Gerar instruções de implantação (Vercel, Netlify) passo a passo.

---

## Sobre este projeto

Este projeto foi criado com Next.js. Abaixo estão instruções e links úteis para continuar o desenvolvimento.

## Para começar

Execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
pnpm dev
# ou
yarn dev
```

Abra http://localhost:3001 no navegador para ver o resultado.

Você pode editar a página principal em `app/page.tsx`; o Next.js atualizará automaticamente durante o desenvolvimento.

