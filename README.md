# Site Bia Carone — Psicóloga Clínica

Site institucional bilíngue (`pt` e `en`) desenvolvido com **Next.js 15 (App Router)**, **React 19** e **TypeScript**, com geração estática (SSG).

## Requisitos

- Node.js 20+
- npm

## Primeiros passos

1. Instale as dependências:
   ```bash
   npm install
   ```

2. *(Opcional)* Copie `.env.example` para `.env.local` caso queira sobrescrever a URL pública:
   ```bash
   cp .env.example .env.local
   ```

3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor local de desenvolvimento |
| `npm run build` | Gera o build estático de produção |
| `npm run start` | Sobe o servidor de produção após o build |
| `npm run lint` | Executa ESLint com regras de qualidade |
| `npm run lint:typed` | Executa ESLint com regras type-aware |
| `npm run typecheck` | Verifica tipagem TypeScript (`tsc --noEmit`) |
| `npm test` | Executa os testes estruturais (`tests/structure.test.mts`) |

## Estrutura do projeto

```text
src/
  app/
    [lang]/          # Rotas localizadas (/pt, /en, /pt/midia, /en/midia)
    globals.css      # Manifesto de imports CSS em ordem de cascata
    robots.ts        # Geração de robots.txt
    sitemap.ts       # Geração de sitemap.xml
  components/
    layout/          # Navbar, Footer, SmoothScroll, StatusPage
    sections/        # Hero, About, Services, MediaCarousel, TalksSection, Contact
  content/
    dictionaries/    # Dicionários PT e EN
    media.ts         # Itens de mídia (TV, YouTube, imprensa) e temas de palestras
    types.ts         # Contratos TypeScript de conteúdo
  lib/               # Helpers de site/SEO e logger
  styles/            # Folhas de estilo CSS modulares
public/              # Fontes locais e imagens
tests/               # Testes estruturais e de paridade i18n
```
