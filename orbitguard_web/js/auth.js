/* ============================================================
   OrbitGuard - auth.js
   Autenticação e gerenciamento de sessão (sessionStorage)
   ============================================================ */

const Auth = {
  SESSION_KEY: 'og_sessao',

  // Tenta autenticar com email + senha
  login(email, senha) {
    const u = DB.usuarios.find(
      x => x.email.toLowerCase() === String(email).toLowerCase().trim() && x.senha === senha
    );
    if (u) {
      const sessao = { id: u.id, email: u.email, perfil: u.perfil };
      sessionStorage.setItem(this.SESSION_KEY, JSON.stringify(sessao));
      return sessao;
    }
    return null;
  },

  logout() {
    sessionStorage.removeItem(this.SESSION_KEY);
    window.location.href = 'login.html';
  },

  getUsuario() {
    try {
      const raw = sessionStorage.getItem(this.SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  isLogado() {
    return this.getUsuario() !== null;
  },

  isAdmin() {
    const u = this.getUsuario();
    return u && u.perfil === 'ADMINISTRADOR';
  },

  // Protege uma página: redireciona para login se não autenticado
  requireAuth() {
    if (!this.isLogado()) {
      window.location.href = 'login.html';
      return false;
    }
    return true;
  }
};

/* ============================================================
   Componentes de UI compartilhados (header / footer)
   Injetados em todas as páginas internas.
   ============================================================ */
function renderHeader(activePage) {
  const u = Auth.getUsuario();
  const isAdmin = Auth.isAdmin();
  const links = [
    { href: 'dashboard.html',     label: 'Dashboard',     key: 'dashboard' },
    { href: 'monitoramento.html', label: 'Monitoramento', key: 'monitoramento' },
    { href: 'alertas.html',       label: 'Alertas',       key: 'alertas' },
    { href: 'eventos.html',       label: 'Eventos',       key: 'eventos' },
    { href: 'regioes.html',       label: 'Regiões',       key: 'regioes' }
  ];

  const navItems = links.map(l =>
    `<a href="${l.href}" class="nav-link ${l.key === activePage ? 'active' : ''}">${l.label}</a>`
  ).join('');

  const perfilBadge = u
    ? `<span class="perfil-badge ${isAdmin ? 'admin' : 'user'}">${u.perfil}</span>`
    : '';

  const headerHTML = `
    <header class="site-header">
      <div class="header-inner">
        <a href="dashboard.html" class="brand">
          <span class="brand-icon">${icon('satellite')}</span>
          <span class="brand-text">Orbit<span class="brand-accent">Guard</span></span>
        </a>
        <button class="nav-toggle" id="navToggle" aria-label="Abrir menu de navegação">${icon('menu')}</button>
        <nav class="main-nav" id="mainNav">
          ${navItems}
          <div class="nav-user">
            ${perfilBadge}
            <span class="nav-email">${u ? u.email : ''}</span>
            <button class="btn btn-ghost btn-sm icon-text" onclick="Auth.logout()">${icon('logOut')}Sair</button>
          </div>
        </nav>
      </div>
    </header>`;

  document.body.insertAdjacentHTML('afterbegin', headerHTML);

  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => nav.classList.toggle('open'));
  }
}

function renderFooter() {
  const footerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <div class="footer-brand">${icon('satellite')} OrbitGuard</div>
        <p class="footer-text">
          Sistema de Monitoramento Ambiental por Satélite &middot;
          Global Solution 2026 &middot; FIAP
        </p>
        <p class="footer-sub">
          ODS 2 · 8 · 9 · 11 · 13 — Protótipo acadêmico em HTML5, CSS3 e JavaScript puro.
        </p>
      </div>
    </footer>`;
  document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Toast de feedback global
function showToast(msg, type = 'success') {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.className = 'toast ' + type;
  requestAnimationFrame(() => t.classList.add('show'));
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3200);
}

// Inicializa estrutura padrão das páginas internas protegidas
function initPaginaInterna(activePage) {
  if (!Auth.requireAuth()) return false;
  renderHeader(activePage);
  return true;
}
