# Portfólio — Fabiano Raiser

Página única de Fabiano Raiser, desenvolvedor backend e arquitetura de soluções em Joinville. O site reúne a atuação, o [Curler](https://github.com/FabianoRaiser/curler-cli) e as participações na Codecon.

A ideia é mostrar o trabalho sem um framework pesado. A página é uma só, o texto fica em arquivos de dados e o visual é CSS puro.

## O que aparece

A navegação acompanha a rolagem e marca a seção visível.

- **Sobre** apresenta o foco em API e arquitetura, a formação e as ferramentas do dia a dia
- **Projetos** destaca o Curler, com o repositório e a documentação
- **Vídeos** é um carrossel das participações no canal da Codecon, da mais recente para a mais antiga
- **Atuação** lista os cargos, do mais recente ao estágio
- **Contato** tem e-mail, telefone e as redes

Quem já usou o Curler pode achar o prompt familiar, no fim da página.

## Stack

- [Vite](https://vite.dev/) para o servidor de desenvolvimento e o build
- [React](https://react.dev/) 19
- TypeScript em modo estrito
- CSS próprio, sem Tailwind nem biblioteca de componentes
- Literata e Outfit, carregadas do Google Fonts

## Desenvolvimento

Requer Node.js.

```bash
npm install
npm run dev
```

O endereço local aparece no terminal, em geral `http://127.0.0.1:5173`.

| Comando | O que faz |
| --- | --- |
| `npm run dev` | Sobe o site com recarregamento |
| `npm run build` | Checa os tipos e gera `dist` |
| `npm run preview` | Serve o build de `dist` |

Para publicar, o conteúdo de `dist` é o site estático.

## Onde editar

O texto da página não está espalhado pelos componentes. Cada assunto tem um arquivo em `src/data`:

- `perfil.ts` — nome, cargo, cidade e links
- `atuacao.ts` — cargos
- `projetos.ts` — projetos em destaque
- `videos.ts` — vídeos da Codecon, em ordem da mais nova para a mais antiga

`src/components` monta as seções. `src/styles.css` concentra o CSS.
