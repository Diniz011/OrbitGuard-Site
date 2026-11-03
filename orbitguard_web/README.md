# OrbitGuard — Protótipo Web

Sistema de **monitoramento ambiental por satélite** para regiões brasileiras.
A plataforma acompanha temperatura, umidade e precipitação para gerar alertas
de risco relacionados a secas, enchentes e incêndios. A identidade visual segue
o conceito de **central de operações / sensoriamento remoto**.

> **Global Solution 2026 — FIAP** · ODS 2, 8, 9, 11 e 13

## Tecnologia

Construído **exclusivamente** com tecnologias web nativas, sem frameworks ou
etapa de build:

- **HTML5** — marcação semântica
- **CSS3** — estilização sem dependências externas
- **JavaScript (vanilla)** — sem bibliotecas, sem npm, sem build

Os dados (espelho do back-end Java/SQL) são simulados em arrays estáticos no
arquivo `js/data.js`. As alterações realizadas pelo perfil ADMINISTRADOR
persistem durante a sessão por meio de `sessionStorage`. A iconografia da
interface é fornecida por ícones vetoriais (SVG) definidos em `js/icons.js`.

## Páginas

| Página | Descrição |
|--------|-----------|
| `index.html` | Página de apresentação: visão geral, capacidades e ODS |
| `login.html` | Autenticação com validação de usuários estáticos |
| `dashboard.html` | Painel de controle: métricas, gráficos e status das regiões |
| `monitoramento.html` | Leituras de sensores, cadastro (admin) e alerta automático |
| `alertas.html` | Gestão de alertas com filtros e resolução (admin) |
| `regioes.html` | Regiões monitoradas, detalhes e cadastro (admin) |
| `eventos.html` | Histórico de eventos climáticos e cadastro (admin) |

## Usuários de teste

| Perfil | E-mail | Senha |
|--------|--------|-------|
| ADMINISTRADOR | `admin@orbitguard.com` | `admin123` |
| USUARIO | `user@orbitguard.com` | `user123` |

- **ADMINISTRADOR**: pode criar e resolver registros (leituras, alertas, regiões e eventos).
- **USUARIO**: acesso somente leitura.
- Todas as páginas, exceto `index.html` e `login.html`, exigem autenticação.

## Regra de classificação de risco

```
temperatura > 35 °C  OU  umidade < 30 %  -> ALTO   (vermelho)
temperatura > 30 °C  OU  umidade < 50 %  -> MEDIO  (amarelo)
caso contrário                            -> BAIXO  (verde)
```

Leituras classificadas como **ALTO** geram um **alerta automático**.

## Como executar

A aplicação pode ser aberta diretamente a partir de `index.html`. Para evitar
restrições de origem (CORS), recomenda-se servir os arquivos por um servidor
HTTP local:

```bash
cd orbitguard_web
python3 -m http.server 8080
# Acesse http://localhost:8080
```

## Estrutura do projeto

```
orbitguard_web/
├── index.html  login.html  dashboard.html
├── alertas.html  monitoramento.html  regioes.html  eventos.html
├── css/
│   └── style.css
└── js/
    ├── icons.js   data.js   auth.js   dashboard.js
    ├── alertas.js monitoramento.js
    └── regioes.js eventos.js
```
