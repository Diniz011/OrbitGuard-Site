/* ============================================================
   OrbitGuard - alertas.js
   ============================================================ */
(function () {
  if (!initPaginaInterna('alertas')) return;
  const isAdmin = Auth.isAdmin();
  if (isAdmin) document.body.classList.add('is-admin');

  let filtroNivel = 'ALL';
  let filtroStatus = 'ALL';
  let filtroRegiao = 'ALL';

  // Popular filtro de região
  const regiaoSel = document.getElementById('regiaoFilter');
  DB.regioes.forEach(r => {
    const o = document.createElement('option');
    o.value = r.id; o.textContent = `${r.nome} (${r.estado})`;
    regiaoSel.appendChild(o);
  });

  const nivelLabel = (n) => n === 'MEDIO' ? 'MÉDIO' : n;

  function renderSummary() {
    const alertas = DB.alertas;
    const ativos = alertas.filter(a => a.status === 'ATIVO');
    const cards = [
      { icon: 'bell',          value: ativos.length, label: 'Ativos', accent: 'red' },
      { icon: 'alertTriangle', value: alertas.filter(a => a.nivel === 'ALTO' && a.status === 'ATIVO').length, label: 'Nível Alto Ativo', accent: 'red' },
      { icon: 'alertCircle',   value: alertas.filter(a => a.nivel === 'MEDIO' && a.status === 'ATIVO').length, label: 'Nível Médio Ativo', accent: 'orange' },
      { icon: 'checkCircle',   value: alertas.filter(a => a.status === 'RESOLVIDO').length, label: 'Resolvidos', accent: 'green' }
    ];
    document.getElementById('alertSummary').innerHTML = cards.map(c => `
      <div class="stat-card accent-${c.accent}">
        <div class="stat-icon">${icon(c.icon)}</div>
        <div class="stat-value">${c.value}</div>
        <div class="stat-label">${c.label}</div>
      </div>`).join('');
  }

  function renderAlertas() {
    const grid = document.getElementById('alertGrid');
    let lista = DB.alertas.slice();

    if (filtroNivel !== 'ALL') lista = lista.filter(a => a.nivel === filtroNivel);
    if (filtroStatus !== 'ALL') lista = lista.filter(a => a.status === filtroStatus);
    if (filtroRegiao !== 'ALL') lista = lista.filter(a => a.regiao_id === Number(filtroRegiao));

    lista.sort((a, b) => b.data_alerta.localeCompare(a.data_alerta));

    if (lista.length === 0) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">
        <div class="ico">${icon('inbox')}</div><p>Nenhum alerta encontrado com os filtros atuais.</p></div>`;
      return;
    }

    grid.innerHTML = lista.map(a => {
      const cor = NIVEL_COR[a.nivel];
      const mon = getMonitoramentoById(a.monitoramento_id);
      const monInfo = mon
        ? `<span class="icon-text">${icon('radio')}${mon.temperatura}°C · ${mon.umidade}% · ${mon.chuva}mm</span>`
        : `<span class="icon-text">${icon('radio')}Alerta preventivo (sem leitura)</span>`;
      const podeResolver = isAdmin && a.status === 'ATIVO';
      return `
        <div class="alert-card lvl-${a.nivel}">
          <div class="ac-head">
            <span class="badge badge-${cor}"><span class="led"></span>${nivelLabel(a.nivel)}</span>
            <span class="badge status-${a.status}">${a.status}</span>
          </div>
          <div class="ac-region"><span class="icon-text">${icon('mapPin')}${getRegiaoNome(a.regiao_id)}</span></div>
          <div class="ac-desc">${a.descricao}</div>
          <div class="ac-meta">
            <span class="icon-text">${icon('calendar')}${formatarData(a.data_alerta)}</span>
            ${monInfo}
            <span>#${String(a.id).padStart(3,'0')}</span>
          </div>
          <div class="ac-foot">
            ${podeResolver
              ? `<button class="btn btn-success btn-sm" data-resolve="${a.id}"><span class="icon-text">${icon('check')}Resolver alerta</span></button>`
              : (a.status === 'RESOLVIDO' ? `<span class="text-dim icon-text" style="font-size:0.82rem;">${icon('check')}Resolvido</span>` : '')}
            ${!isAdmin && a.status === 'ATIVO' ? '<span class="text-dim" style="font-size:0.8rem;">Somente leitura</span>' : ''}
          </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('[data-resolve]').forEach(btn => {
      btn.addEventListener('click', () => resolverAlerta(Number(btn.dataset.resolve)));
    });
  }

  function resolverAlerta(id) {
    const alertas = DB.alertas;
    const a = alertas.find(x => x.id === id);
    if (!a) return;
    a.status = 'RESOLVIDO';
    DB.saveAlertas(alertas);
    showToast(`Alerta #${String(id).padStart(3,'0')} marcado como RESOLVIDO.`, 'success');
    renderSummary();
    renderAlertas();
  }

  // Eventos de filtro
  document.getElementById('nivelChips').addEventListener('click', (e) => {
    if (!e.target.classList.contains('chip')) return;
    document.querySelectorAll('#nivelChips .chip').forEach(c => c.classList.remove('active'));
    e.target.classList.add('active');
    filtroNivel = e.target.dataset.nivel;
    renderAlertas();
  });
  document.getElementById('statusChips').addEventListener('click', (e) => {
    if (!e.target.classList.contains('chip')) return;
    document.querySelectorAll('#statusChips .chip').forEach(c => c.classList.remove('active'));
    e.target.classList.add('active');
    filtroStatus = e.target.dataset.status;
    renderAlertas();
  });
  regiaoSel.addEventListener('change', () => { filtroRegiao = regiaoSel.value; renderAlertas(); });

  renderSummary();
  renderAlertas();
  renderFooter();
})();
