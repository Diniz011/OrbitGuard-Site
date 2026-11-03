/* ============================================================
   OrbitGuard - eventos.js
   ============================================================ */
(function () {
  if (!initPaginaInterna('eventos')) return;
  const isAdmin = Auth.isAdmin();
  if (isAdmin) document.body.classList.add('is-admin');

  let filtroTipo = 'ALL';
  let filtroRegiao = 'ALL';

  const nivelLabel = (n) => n === 'MEDIO' ? 'MÉDIO' : n;
  const badgeNivel = (nivel) => `<span class="badge badge-${NIVEL_COR[nivel]}"><span class="led"></span>${nivelLabel(nivel)}</span>`;

  // Popular selects de região
  const regiaoFilter = document.getElementById('regiaoFilter');
  const fRegiao = document.getElementById('f_regiao');
  DB.regioes.forEach(r => {
    const label = `${r.nome} (${r.estado})`;
    regiaoFilter.insertAdjacentHTML('beforeend', `<option value="${r.id}">${label}</option>`);
    fRegiao.insertAdjacentHTML('beforeend', `<option value="${r.id}">${label}</option>`);
  });

  function render() {
    let lista = DB.eventos.slice();
    if (filtroTipo !== 'ALL') lista = lista.filter(e => e.tipo === filtroTipo);
    if (filtroRegiao !== 'ALL') lista = lista.filter(e => e.regiao_id === Number(filtroRegiao));
    lista.sort((a, b) => b.data_evento.localeCompare(a.data_evento));

    const grid = document.getElementById('eventoGrid');
    if (lista.length === 0) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;"><div class="ico">${icon('inbox')}</div><p>Nenhum evento encontrado.</p></div>`;
      return;
    }
    grid.innerHTML = lista.map(e => `
      <div class="entity-card" style="cursor:default;">
        <div class="ec-top">
          <div>
            <div class="ec-name"><span class="icon-text">${icon(TIPO_EVENTO_ICONE[e.tipo] || 'calendar')}${e.tipo}</span></div>
            <div class="ec-state"><span class="icon-text">${icon('mapPin')}${getRegiaoNome(e.regiao_id)}</span></div>
          </div>
          ${badgeNivel(e.nivel)}
        </div>
        <p class="text-dim" style="font-size:0.9rem; margin:0.5rem 0 0.8rem;">${e.descricao}</p>
        <div class="ac-meta"><span class="icon-text">${icon('calendar')}${formatarData(e.data_evento)}</span><span>#${String(e.id).padStart(3,'0')}</span></div>
      </div>`).join('');
  }

  // Filtros
  document.getElementById('tipoChips').addEventListener('click', (e) => {
    if (!e.target.classList.contains('chip')) return;
    document.querySelectorAll('#tipoChips .chip').forEach(c => c.classList.remove('active'));
    e.target.classList.add('active');
    filtroTipo = e.target.dataset.tipo;
    render();
  });
  regiaoFilter.addEventListener('change', () => { filtroRegiao = regiaoFilter.value; render(); });

  /* ---------- Novo evento (admin) ---------- */
  if (isAdmin) {
    const modal = document.getElementById('modal');
    const form = document.getElementById('eventoForm');
    document.getElementById('btnNovo').addEventListener('click', () => {
      form.reset();
      document.getElementById('f_data').value = new Date().toISOString().slice(0, 10);
      modal.classList.add('open');
    });
    document.getElementById('modalClose').addEventListener('click', () => modal.classList.remove('open'));
    document.getElementById('modalCancel').addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('open'); });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const eventos = DB.eventos;
      const novoId = DB.nextId(eventos);
      eventos.push({
        id: novoId,
        regiao_id: Number(fRegiao.value),
        tipo: document.getElementById('f_tipo').value,
        nivel: document.getElementById('f_nivel').value,
        data_evento: document.getElementById('f_data').value,
        descricao: document.getElementById('f_desc').value.trim()
      });
      DB.saveEventos(eventos);
      modal.classList.remove('open');
      showToast(`Evento #${String(novoId).padStart(3,'0')} registrado com sucesso.`, 'success');
      render();
    });
  }

  render();
  renderFooter();
})();
