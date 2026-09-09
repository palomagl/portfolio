# PROGRESSO — Redesign do portfólio

Acompanhamento da migração para o novo design (imagem de referência).
Ordem das seções: header fixo · hero · projetos · trajetória · como eu construo · tecnologias · sobre · footer.

---

## Status por fase

| Fase | Escopo | Status |
| --- | --- | --- |
| 0 | Fundação (tokens, tema, fontes, utilitários, hook de reveal) | ✅ feito |
| 1 | Header + Hero | ✅ feito |
| 2 | Projetos (carrossel) | ✅ feito |
| 3 | Trajetória (timeline) | ✅ feito |
| 4 | Como eu construo (5 etapas) | ✅ feito |
| 5 | Tecnologias (grafo orbital + "também trabalho com") | ⬜ a fazer |
| 6 | Sobre (versão curta) + Footer novo | ⬜ a fazer |
| 7 | Passada final (responsivo, a11y, polimento, limpeza, code-split) | ⬜ a fazer |

**Estado atual da página:** hero + projetos + trajetória + como eu construo já estão no novo design.
Abaixo disso ainda renderizam as seções **antigas** (`StackSection`, `AboutSection`, `ContactSection`),
que serão substituídas nas fases 5–6. A nav já aponta para as âncoras novas
(`#tecnologias` e `#sobre` só passam a rolar para algo quando as fases 5–6 existirem).

---

## O que já foi feito

### Fase 0 — Fundação
- `src/index.css`: paleta do design em tokens HSL (fundo `#08080C`, card `#111016`,
  hairline `rgba(255,255,255,.07)`, gradiente `#C4B5FD → #E879C7`). Modo claro reajustado com contraste.
  Utilitários: `.container-page` (1200px), `.section-divider`, `.border-hairline`, `.eyebrow`,
  `.reveal` / `.reveal-armed` / `.is-visible`, `.hero-rise`, `.blink`, `.font-hand`.
- `tailwind.config.ts`: fonte sans → **Inter**; `font-hand` → Caveat; cor `section-alt`.
- `index.html`: script inline aplica o tema antes do 1º paint (sem flash). Ordem: `?theme=` na URL →
  `localStorage` → `prefers-color-scheme`.
- `src/hooks/useTheme.ts`: tema claro/escuro persistido em `localStorage`.
- `src/hooks/useReveal.ts`: revelação no scroll via IntersectionObserver (fade + 15px).
  Visível por padrão; só "arma" a animação quando há IO e sem `prefers-reduced-motion`.
  Rede de segurança de 3s. Aceita `?reveal=off` para desligar (QA/print).
- `src/components/ThemeToggle.tsx`: reescrito (ícone lua/sol, `aria-label`, `aria-pressed`).

### Fase 1 — Header + Hero
- `Navbar.tsx`: logo `</>` + "Paloma Lorenzon"; nav Início · Projetos · Trajetória · Tecnologias · Sobre · Contato;
  PT/EN + tema + pill "GitHub"; menu mobile.
- `HeroSection.tsx`: 2 colunas. Esquerda: eyebrow, H1 "Paloma" + "Lorenzon" (gradiente), subtítulo,
  parágrafo, botões "Ver projetos" / "GitHub", ícones sociais (GitHub, LinkedIn, e-mail).
  Direita: foto com máscara radial (placeholder até `public/paloma.jpg` existir), card de terminal
  (`> build/create/improve/repeat_`), glifo `</>`, manuscrito "ideias / código / projetos / realidade"
  (4 palavras empilhadas), doodles (seta + estrela), legenda com linha + ponto.
  Entrada em CSS puro (`.hero-rise`), não depende de JS, respeita `prefers-reduced-motion`.
- `LanguageContext.tsx`: chaves de nav/hero atualizadas; `hero.role` e `hero.tagline` = texto da imagem (PT+EN).

### Fase 2 — Projetos
- `ProjectsSection.tsx`: carrossel com `embla-carousel-react`. Header (eyebrow, título em 2 linhas,
  descrição), link "Ver todos os projetos" (→ `github.com/palomagl?tab=repositories`), setas prev/next.
- Card: imagem 16:10 (placeholder `<Nome />` se o print não existir), badge de status no canto da imagem
  (`Em desenvolvimento` / `Projeto de curso`), título, descrição (2 linhas), tags, e rodapé com
  "Ver site" / "Código" — cada botão some se o link estiver vazio.
- Dados em `src/data/projects.ts` (11 projetos, 4 grupos). Ordem do carrossel = ordem dos grupos:
  destaques → aplicados → em desenvolvimento → acadêmicos.

### Fase 3 — Trajetória
- `JourneySection.tsx`: coluna esquerda fixa (título, descrição, "Ver detalhes no LinkedIn") +
  timeline de 4 nós. Horizontal no desktop, vertical no mobile. Ícone em quadrado com gradiente por etapa
  (laranja / violeta / azul / verde), conector entre os nós.
- Dados em `src/data/journey.ts`.

### Fase 4 — Como eu construo
- `ProcessSection.tsx`: mesmo layout esquerda/direita. 5 etapas (Entender o problema → Estruturar →
  Construir → Revisar → Publicar), círculo com ícone + número, título e descrição curta, **sem bullets**.
  Horizontal no desktop, vertical no mobile.
- Dados em `src/data/process.ts`.

### Infra de dados criada
- `src/data/site.ts` — identidade e links (GitHub, LinkedIn, e-mail, foto).
- `src/data/projects.ts`, `src/data/technologies.tsx`, `src/data/journey.ts`, `src/data/process.ts`.
- Dependência nova: `react-icons` (logos de tecnologia).

---

## O que falta

### Fases de código
- **Fase 5 — Tecnologias:** grafo orbital (centro `</>` + 8 satélites: React, TypeScript, Tailwind,
  Node.js, Supabase, PostgreSQL, Git, Python) com linhas ligando ao centro; vira grade no mobile.
  Bloco "Também trabalho com" abaixo. Card "Projetos que usam essas tecnologias" gerado a partir de
  `projects.ts`, cada item rolando até `#projeto-<slug>`. **Remover `StackSection`.** Dados já em
  `src/data/technologies.tsx`.
- **Fase 6 — Sobre + Footer:** encolher `AboutSection` para uma seção curta com âncora `#sobre` (reaproveitar
  os 2 parágrafos do `LanguageContext`). Footer novo em 3 colunas ("Sempre em evolução." / "Vamos conversar?"
  com GitHub·LinkedIn·Email / manuscrito "obrigada por visitar!") + barra inferior (© + "Feito com ♥").
  Âncora `#contato` aponta para o footer. **Remover `ContactSection`.**
- **Fase 7 — Polimento:**
  - Respiro vertical do hero em telas altas ainda um pouco grande.
  - Conectores da timeline e do processo estão discretos demais; a referência tem setinha na ponta.
  - Alinhar "Ver todos os projetos" ao topo do cabeçalho da seção.
  - Revisão de responsivo (mobile de verdade) e acessibilidade (foco, `alt`, `aria`).
  - `prefers-reduced-motion` ponta a ponta.
  - Code-split: bundle passou de ~470 KB para ~505 KB (react-icons + seções). Avaliar `manualChunks`.
  - Remover código morto: `ProfileSection.tsx` (já fora do Index), `StackSection`/`AboutSection`/
    `ContactSection` após substituição, chaves de i18n órfãs (`stack.*`, `profile.*`, `projects.barber.desc` etc.).
  - Trocar prints antigos soltos em `public/` pelos de `public/projects/`.
  - `CustomCursor` e `ParticleBackground`: decidir se ficam.

### Pendências de conteúdo (da Paloma)
- [ ] Foto do hero → `public/paloma.jpg` (retrato ~900×1100).
- [ ] Prints de capa dos projetos → `public/projects/<slug>.png` (1280×800). Slugs:
      `doe-mais-rs`, `iphone-17-concept`, `baly-sabores`, `nath-lorenzon-beauty`, `df-marmores`,
      `nexa-ia`, `studymaps`, `hotel-system`, `jogo-da-forca`
      (`barbershop` e `personal-dashboard` já copiados dos prints antigos).
- [ ] URL live do iPhone 17 Concept.
- [ ] URL live do NEXA IA (quando publicar).
- [ ] Descrição do DF Mármores (`projects.ts`, hoje vazia → card mostra "Descrição em breve").
- [ ] Repositório do DF Mármores é privado → botão "Código" escondido até tornar público.
- [ ] Favicon do Baly Sabores.
- [ ] `og-image.png` em `public/` (o `index.html` referencia e não existe).

---

## Decisões tomadas

- **Stack mantida:** Vite + React + TS + Tailwind + shadcn/framer-motion. Nada reescrito do zero.
- **Fonte:** troca de Space Grotesk → **Inter** (pedido do design). Mono continua JetBrains Mono;
  manuscrito é Caveat.
- **Tema:** dark é o design principal, mas o 1º load respeita `prefers-color-scheme`. Preferência
  persiste em `localStorage`. Query params `?theme=dark|light` e `?reveal=off` são auxiliares de QA/print.
- **Animação de entrada:** hero em CSS puro (à prova de falha de JS); demais seções via
  `useReveal` (IO) com fallback de 3s e visível por padrão. Tudo respeita `prefers-reduced-motion`.
- **Projetos:** 11 projetos, 4 grupos, dados em `src/data/projects.ts`. Carrossel único ordenado por grupo,
  sem cabeçalho por grupo — o badge no card comunica "Em desenvolvimento" / "Projeto de curso".
  Botão de link some quando o link está vazio; card acadêmico não tem "Ver site".
- **`Task Manager` e `Portfolio Template` removidos** (eram placeholder).
- **`ProfileSection` (soft skills) removida.** `StackSection` (níveis por skill) será removida na Fase 5.
- **Tecnologias:** grafo com React, TypeScript, Tailwind, Node.js, Supabase, PostgreSQL, Git, Python
  (stack real confirmada pelos repos). Sem autoavaliação de nível. Secundárias num bloco "Também trabalho com".
- **Trajetória:** cortados "vender doces na escola" e "freelance de motoboy" — não somam sinal num
  portfólio de dev. Se entrarem, é numa frase da seção Sobre, não na timeline.
- **i18n:** PT/EN mantido. Conteúdo novo entra nos dois; pendências marcadas `TODO:EN`.
- **Ícones de tecnologia:** dependência `react-icons` adicionada (logos de marca, tree-shakeable).
- **Placeholders de imagem:** caminhos já definidos (`/paloma.jpg`, `/projects/<slug>.png`); o card
  detecta `onError` e mostra um placeholder. Basta soltar o arquivo em `public/` depois.

---

_Última atualização: fases 0–4 concluídas._
