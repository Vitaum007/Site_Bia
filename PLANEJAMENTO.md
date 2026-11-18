# Site Bia Carone — Especificação de Estrutura, Arquitetura e Plano de Implementação (Fase 1 Concluída)

## 1. Decisões Estruturais Aprovadas
- **Modelo de Arquitetura:** **Híbrido**
  - **Home (`/[lang]`):** One-Page Editorial fluida com as seções principais (`#inicio`, `#sobre`, `#atendimento`, `#midia-destaque`, `#textos-destaque`, `#contato`).
  - **Na Mídia & Press Kit (`/[lang]/midia`):** Página dedicada com acervo completo de participações na TV, vídeos do YouTube, temas de palestras e Press Kit para imprensa/produtores.
  - **Textos & Reflexões (`/[lang]/textos` e `/[lang]/textos/[slug]`):** Hub de artigos/reflexões desacoplado de datas rígidas (para não parecer um blog desatualizado se ela postar esporadicamente).
- **Idiomas (i18n):** Português (`/pt`) e Inglês (`/en`) com seletor persistente no cabeçalho.
- **Stack Técnica:** **React / Next.js (App Router + TypeScript)** com componentes modulares e dicionários de conteúdo desacoplados (facilitando inserir o conteúdo definitivo depois).

---

## 2. Identidade Visual Extraída ([Key Visual - Bia Carone.pdf](file:///c:/Users/Vitor%20Candido/Documents/Site_bia/Key%20Visual%20-%20Bia%20Carone.pdf))

### Essência e Diretrizes da Marca
- **Adjetivos Oficiais:** Leve · Descontraída · Transparente · Criativa.
- **Público e Tom:** Estudada para transmitir profissionalismo, dinamismo, acolhimento, leveza e criatividade. Foco em **adolescentes, pais de adolescentes** e adultos (em português e inglês), além de produtores de TV e contratantes de palestras.
- **Textura e Fotografia:** Fotos reais, textura sutil de granulado (*grain/noise*) e uso equilibrado da paleta sem perder a sobriedade clínica.

### Paleta de Cores Oficial (Tokens CSS)
| Token | Cor | HEX | RGB | Conceito no Key Visual |
|---|---|---|---|---|
| `--color-primary` | Azul Profundo | `#334B89` | `51, 75, 137` | Verdade, estabilidade e seriedade |
| `--color-secondary` | Azul Sereno | `#6593C4` | `101, 147, 196` | Confiança, proteção, paz e calma |
| `--color-accent` | Rosa Malva | `#E3B7CE` | `227, 183, 206` | Amor, gentileza e carinho |
| `--color-bg` | Off-White Quente | `#EFEBE8` | `239, 235, 232` | Equilíbrio, tranquilidade, delicadeza e simplicidade |
| `--color-surface` | Creme Suave | `#F8F5F0` | `248, 245, 240` | Superfícies de cards e destaque |
| `--color-text` | Grafite Escuro | `#282828` | `40, 40, 40` | Leitura principal de alto contraste |

### Tipografia Oficial
- **Principal (Títulos e Frases de Impacto):** `Playfair Display` (Regular, Medium, Medium Italic — via `next/font/google`).
- **Secundária (Corpo, Menus, Botões):** `Gotham` (Book, Medium, Bold, Black — com fallback/web font geométrica limpa via `next/font/google` enquanto os arquivos `.woff2` da Gotham não forem adicionados).

---

## 3. Mapa Estrutural de Rotas e Seções (Wireframe Arquitetural)

### Rota 1: `/[lang]` — One-Page Principal
1. **`Navbar` (Cabeçalho Fixo Minimalista)**
   - Identidade *Bia Carone* + CRP
   - Âncoras: `Sobre` (`#sobre`), `Atendimento` (`#atendimento`), `Na Mídia` (`#midia`), `Textos` (`#textos`), `Contato` (`#contato`)
   - Links diretos para `/[lang]/midia` e `/[lang]/textos`
   - Seletor de idioma `PT | EN` + Botão CTA (`Agendar sessão` / `Book a session`)
2. **`HeroSection` (`#inicio`)**
   - Coluna Esquerda: Eyebrow (Psicóloga Clínica · Atendimento em PT & EN), Headline editorial em `Playfair Display`, Subheadline de posicionamento de valor, CTA Primária (Agendar Primeira Sessão) + CTA Secundária (Palestras & Imprensa).
   - Coluna Direita: Moldura editorial para foto da Bia + selo discreto de credibilidade ("Participações em TV, Palestras e Psicoterapia").
3. **`MediaStrip` (Faixa de Autoridade)**
   - Faixa sutil logo abaixo do Hero destacando presença em TV, canal do YouTube e palestras, criando percepção imediata de valor.
4. **`AboutSection` (`#sobre`)**
   - Estrutura para a história da Bia, abordagem clínica, foco em adolescentes, orientação a pais e adultos, e credenciais (CRP / atendimento bilíngue).
5. **`ServicesSection` (`#atendimento`)**
   - Explicação clara da proposta terapêutica e dos **3 formatos de sessão** pedidos por ela:
     - **Atendimento Pontual / Orientação** (demandas focadas, orientação parental, momentos específicos)
     - **Acompanhamento Semanal** (processo psicoterapêutico contínuo)
     - **Acompanhamento Quinzenal** (manutenção e acompanhamento de fase)
   - Bloco "Como funciona a primeira sessão" + CTA de agendamento.
6. **`MediaHighlightSection` (`#midia`)**
   - Vitrine enxuta na Home: 1 vídeo principal em destaque (TV/YouTube) + 2 ou 3 participações selecionadas + botão **"Ver todas as participações e Press Kit →"** levando para `/[lang]/midia`.
7. **`ArticlesHighlightSection` (`#textos`)**
   - Vitrine enxuta com até 2 ou 3 reflexões/textos em destaque + botão **"Ler todos os textos →"** levando para `/[lang]/textos`.
8. **`ContactSection` (`#contato`) & `Footer`**
   - Divisão estrutural clara entre as duas frentes:
     - **Frente Clínica (Pacientes):** Botão para agendar sessão (WhatsApp / Link externo) + informações sobre atendimento online e presencial.
     - **Frente Institucional (TV, Palestras e Parcerias):** Canal dedicado para convites de imprensa, eventos e escolas + links para Instagram e YouTube.
   - Rodapé com CRP, aviso ético (CFV/CFP e CVV 188) e alternador de idioma.

---

### Rota 2: `/[lang]/midia` — Página Exclusiva "Na Mídia, YouTube & Palestras"
1. **Header da Página:** Posicionamento da Bia como fonte para imprensa, TV e palestrante.
2. **Bloco TV & Imprensa:** Grid categorizado de participações na televisão, entrevistas e matérias.
3. **Bloco Canal no YouTube:** Seção dedicada para centralizar os vídeos do canal dela.
4. **Bloco Temas de Palestras & Parcerias:** Cards estruturais com os temas que ela aborda em eventos/escolas (adolescência, relação pais e filhos, saúde emocional).
5. **Mini Press Kit & CTA de Imprensa:** Bio oficial curta para apresentadores/jornalistas + botão de contato direto para assessoria/convites.

---

### Rota 3: `/[lang]/textos` e `/[lang]/textos/[slug]` — Hub de Reflexões
1. **Listagem Limpa (`/[lang]/textos`):** Cards editoriais com título, tema e tempo de leitura (sem destacar datas antigas caso ela fique meses sem postar, protegendo a percepção de site ativo).
2. **Leitura do Texto (`/[lang]/textos/[slug]`):** Layout de leitura focado em tipografia (`Playfair Display` + corpo confortável), assinatura da Bia ao final e CTA suave para conhecer o atendimento.

---

## 4. Arquitetura de Pastas do Esqueleto (Next.js App Router)

```text
src/
 ├── app/
 │    ├── [lang]/
 │    │    ├── layout.tsx          # Layout raiz com fontes, Navbar, Footer e textura grain
 │    │    ├── page.tsx            # Home (One-Page Editorial)
 │    │    ├── midia/
 │    │    │    └── page.tsx       # Página exclusiva Na Mídia, YouTube & Press Kit
 │    │    └── textos/
 │    │         ├── page.tsx       # Listagem de Textos/Reflexões
 │    │         └── [slug]/
 │    │              └── page.tsx  # Página de leitura de cada texto
 │    ├── globals.css              # Design tokens do Key Visual (#334B89, #6593C4, #E3B7CE, #EFEBE8)
 │    └── page.tsx                 # Redirect automático para /pt
 ├── components/
 │    ├── layout/
 │    │    ├── Navbar.tsx
 │    │    ├── Footer.tsx
 │    │    └── LanguageSwitcher.tsx
 │    └── sections/
 │         ├── HeroSection.tsx
 │         ├── MediaStrip.tsx
 │         ├── AboutSection.tsx
 │         ├── ServicesSection.tsx
 │         ├── MediaHighlightSection.tsx
 │         ├── ArticlesHighlightSection.tsx
 │         └── ContactSection.tsx
 └── content/
      ├── dictionaries/
      │    ├── pt.ts               # Estrutura de textos da interface em Português (placeholders organizados)
      │    └── en.ts               # Estrutura de textos da interface em Inglês (placeholders organizados)
      ├── media.ts                 # Dados estruturados de TV, YouTube e Palestras
      └── articles.ts              # Dados estruturados dos textos/reflexões
```
*Vantagem dessa arquitetura:* Toda a estrutura visual e de navegação fica 100% pronta e navegável agora, e quando formos trabalhar no **conteúdo**, basta preencher os arquivos dentro de `src/content/` sem precisar refazer o layout.


---

## 5. Status da Esteira (`skill-orchestrator`)
- [x] **Fase 0 (Ideação & Extração de Insumos):** Extração completa da paleta (`#334B89`, `#6593C4`, `#E3B7CE`, `#EFEBE8`) e tipografia (`Playfair Display` + `Gotham`) do PDF `Key Visual - Bia Carone.pdf`.
- [x] **Fase 1 (Planejamento & Escopo Estrutural):** Definição da arquitetura Híbrida (`/pt` e `/en` One-Page + `/midia` + `/textos`) em React / Next.js.
- [x] **Fase 2 (Design & UX):** Direção de arte com `design-taste-frontend` e `frontend-design` em `src/app/globals.css`.
- [x] **Fase 3 e 4 (Arquitetura de Código & Construção do Esqueleto):** Implementação completa das rotas e componentes Next.js + suíte de testes de verificação estrutural (`tests/structure.test.mts` — 6/6 passando) + servidor de pré-visualização imediata (`preview-server.mjs`).
- [ ] **Fase 5 (Conteúdo Real — PRÓXIMA ETAPA):** Preenchimento dos textos definitivos, fotos, CRP, links de TV/YouTube e link de agendamento em `src/content/`.
- [ ] **Fase 6 (Auditoria Final):** Revisão de código, acessibilidade WCAG e performance.


---

## 6. Redesign Estratégico Aureon (Concluído)
- **Eliminação de Caixas e Cards Genéricos:** Adeus à estética SaaS/Dashboard com retângulos alternados e botões maciços.
- **Direção Editorial Autoral:** Inspiração em publicações culturais e revistas independentes com grid assimétrico, entrelinha ampla e respiro.
- **Hero Reimaginado:** Retrato editorial integrado com moldura e contorno suave em rosa malva, legenda editorial clássica e tipografia expressiva em `Playfair Display`.
- **Sobre Mim & Pilares:** Narrativa em prosa fluida com pilares organizados em colunas arejadas com números romanos e divisores sutis em vez de 3 cards brancos empilhados.
- **Atendimento sem Cara de Planos Comerciais:** Lista interativa editorial limpa à esquerda com indicador minimalista, painel de leitura aberto e arejado à direita, e linha do tempo de 3 passos sem cartões pesados.
- **Na Mídia como Arquivo Cultural:** Grid de arquivo/índice com hierarquia entre destaque principal e lista secundária.
- **Contato Acolhedor e Distinto:** Separação fluida entre prática clínica e presença pública/institucional.


---

## 7. Refatoração da Hero Section (Referência Visual Implementada)
- **Integração Fotográfica com Névoa Atmosférica:** Retrato editorial no quadrante direito integrado ao off-white `#EFEBE8` por meio de camadas difusas suaves (névoa azul clara e reflexo sutil em rosa malva, sem manchas saturadas e sem bordas duras).
- **Tipografia e Quebras Deliberadas:** Título em 4 linhas com *presença* em itálico e cor azul profundo `#334B89`.
- **Botões Pílula Refinados:** Botão primário azul profundo arredondado e botão secundário em contorno sutil com setas `→`.
- **Elementos Editoriais de Suporte:**
  - Linha orgânica contínua em rosa suave no canto inferior esquerdo.
  - Indicador central "DESCUBRA MAIS ↓" integrando o scroll diretamente à seção seguinte `#sobre`.
  - Marcadores verticais discretos à direita.
  - Card de identificação translúcido com borda lateral fina sobre a fotografia ("Bia Carone · Psicóloga Clínica · CRP 06/XXXXX").
