/* ============================================================
   OrbitGuard - regioes.js
   ============================================================ */
(function () {
  if (!initPaginaInterna('regioes')) return;
  const isAdmin = Auth.isAdmin();
  if (isAdmin) document.body.classList.add('is-admin');

  const nivelLabel = (n) => n === 'MEDIO' ? 'MÉDIO' : n;
  const badgeNivel = (nivel) => `<span class="badge badge-${NIVEL_COR[nivel]}"><span class="led"></span>${nivelLabel(nivel)}</span>`;

  function ultimaLeitura(regiaoId) {
    const l = DB.monitoramentos.filter(m => m.regiao_id === regiaoId)
      .sort((a, b) => b.data_monitoramento.localeCompare(a.data_monitoramento));
    return l[0] || null;
  }

  function render() {
    const grid = document.getElementById('regiaoGrid');
    grid.innerHTML = DB.regioes.map(r => {
      const mons = DB.monitoramentos.filter(m => m.regiao_id === r.id).length;
      const alts = DB.alertas.filter(a => a.regiao_id === r.id && a.status === 'ATIVO').length;
      const evts = DB.eventos.filter(e => e.regiao_id === r.id).length;
      const l = ultimaLeitura(r.id);
      const nivel = l ? calcularNivelRisco(l.temperatura, l.umidade) : 'BAIXO';
      return `
        <div class="entity-card" data-id="${r.id}">
          <div class="ec-top">
            <div>
              <div class="ec-name">${r.nome}</div>
              <div class="ec-state"><span class="icon-text">${icon('mapPin')}${r.estado}</span></div>
            </div>
            ${badgeNivel(nivel)}
          </div>
          <div class="ec-stats">
            <div class="ec-stat"><div class="num" style="color:var(--green)">${mons}</div><div class="lbl">Leituras</div></div>
            <div class="ec-stat"><div class="num" style="color:var(--red)">${alts}</div><div class="lbl">Alertas</div></div>
            <div class="ec-stat"><div class="num" style="color:var(--purple)">${evts}</div><div class="lbl">Eventos</div></div>
          </div>
        </div>`;
    }).join('');

    grid.querySelectorAll('.entity-card').forEach(c => {
      c.addEventListener('click', () => abrirDetalhe(Number(c.dataset.id)));
    });
  }

  /* ---------- Detalhes ---------- */
  const detailModal = document.getElementById('detailModal');
  function abrirDetalhe(id) {
    const r = getRegiaoById(id);
    if (!r) return;
    document.getElementById('detailTitle').textContent = `${r.nome} · ${r.estado}`;

    const mons = DB.monitoramentos.filter(m => m.regiao_id === id)
      .sort((a, b) => b.data_monitoramento.localeCompare(a.data_monitoramento));
    const alts = DB.alertas.filter(a => a.regiao_id === id)
      .sort((a, b) => b.data_alerta.localeCompare(a.data_alerta));
    const evts = DB.eventos.filter(e => e.regiao_id === id)
      .sort((a, b) => b.data_evento.localeCompare(a.data_evento));

    const monHTML = mons.length ? mons.map(m => {
      const nivel = calcularNivelRisco(m.temperatura, m.umidade);
      return `<div class="mini-item">
        <div class="mi-main"><span>${m.temperatura}°C · ${m.umidade}% · ${m.chuva}mm</span>
        <span class="mi-sub">${formatarData(m.data_monitoramento)}</span></div>
        ${badgeNivel(nivel)}</div>`;
    }).join('') : '<p class="text-dim" style="font-size:0.85rem;">Sem leituras.</p>';

    const altHTML = alts.length ? alts.map(a => `
      <div class="mini-item">
        <div class="mi-main"><span>${a.descricao}</span>
        <span class="mi-sub">${formatarData(a.data_alerta)} · ${a.status}</span></div>
        ${badgeNivel(a.nivel)}</div>`).join('') : '<p class="text-dim" style="font-size:0.85rem;">Sem alertas.</p>';

    const evtHTML = evts.length ? evts.map(e => `
      <div class="mini-item">
        <div class="mi-main"><span class="icon-text">${icon(TIPO_EVENTO_ICONE[e.tipo] || 'calendar')}${e.tipo} — ${e.descricao}</span>
        <span class="mi-sub">${formatarData(e.data_evento)}</span></div>
        ${badgeNivel(e.nivel)}</div>`).join('') : '<p class="text-dim" style="font-size:0.85rem;">Sem eventos.</p>';

    document.getElementById('detailBody').innerHTML = `
      <div class="detail-section"><h4><span class="icon-text">${icon('radio')}Monitoramentos (${mons.length})</span></h4><div class="mini-list">${monHTML}</div></div>
      <div class="detail-section"><h4><span class="icon-text">${icon('bell')}Alertas (${alts.length})</span></h4><div class="mini-list">${altHTML}</div></div>
      <div class="detail-section"><h4><span class="icon-text">${icon('calendar')}Eventos (${evts.length})</span></h4><div class="mini-list">${evtHTML}</div></div>
    `;
    detailModal.classList.add('open');
  }
  document.getElementById('detailClose').addEventListener('click', () => detailModal.classList.remove('open'));
  detailModal.addEventListener('click', (e) => { if (e.target === detailModal) detailModal.classList.remove('open'); });

  /* ---------- Nova região (admin) ---------- */
  if (isAdmin) {
    const addModal = document.getElementById('addModal');
    const form = document.getElementById('regiaoForm');
    document.getElementById('btnNova').addEventListener('click', () => { form.reset(); addModal.classList.add('open'); });
    document.getElementById('addClose').addEventListener('click', () => addModal.classList.remove('open'));
    document.getElementById('addCancel').addEventListener('click', () => addModal.classList.remove('open'));
    addModal.addEventListener('click', (e) => { if (e.target === addModal) addModal.classList.remove('open'); });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nome = document.getElementById('f_nome').value.trim();
      const estado = document.getElementById('f_estado').value.trim().toUpperCase();
      const regioes = DB.regioes;
      const novoId = DB.nextId(regioes);
      regioes.push({ id: novoId, nome, estado });
      DB.saveRegioes(regioes);
      addModal.classList.remove('open');
      showToast(`Região "${nome}" cadastrada com sucesso.`, 'success');
      render();
    });
  }

  render();
  renderFooter();
})();
