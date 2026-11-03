/* ============================================================
   OrbitGuard - monitoramento.js
   ============================================================ */
(function () {
  if (!initPaginaInterna('monitoramento')) return;
  const isAdmin = Auth.isAdmin();
  if (isAdmin) document.body.classList.add('is-admin');

  let filtroRegiao = 'ALL';

  // Popular selects de região
  const regiaoFilter = document.getElementById('regiaoFilter');
  const fRegiao = document.getElementById('f_regiao');
  DB.regioes.forEach(r => {
    const label = `${r.nome} (${r.estado})`;
    regiaoFilter.insertAdjacentHTML('beforeend', `<option value="${r.id}">${label}</option>`);
    fRegiao.insertAdjacentHTML('beforeend', `<option value="${r.id}">${label}</option>`);
  });

  const nivelLabel = (n) => n === 'MEDIO' ? 'MÉDIO' : n;
  const badgeNivel = (nivel) => {
    const cor = NIVEL_COR[nivel];
    return `<span class="badge badge-${cor}"><span class="led"></span>${nivelLabel(nivel)}</span>`;
  };

  function render() {
    let lista = DB.monitoramentos.slice();
    if (filtroRegiao !== 'ALL') lista = lista.filter(m => m.regiao_id === Number(filtroRegiao));
    lista.sort((a, b) => b.data_monitoramento.localeCompare(a.data_monitoramento) || b.id - a.id);

    const body = document.getElementById('monBody');
    if (lista.length === 0) {
      body.innerHTML = `<tr><td colspan="7"><div class="empty-state"><div class="ico">${icon('inbox')}</div><p>Nenhuma leitura para esta região.</p></div></td></tr>`;
      return;
    }
    body.innerHTML = lista.map(m => {
      const nivel = calcularNivelRisco(m.temperatura, m.umidade);
      const tempCls = m.temperatura > 35 ? 'danger-cell' : (m.temperatura >= 30 ? 'warn-cell' : '');
      const umidCls = m.umidade < 30 ? 'danger-cell' : (m.umidade < 50 ? 'warn-cell' : '');
      return `
        <tr>
          <td class="mono">#${String(m.id).padStart(3,'0')}</td>
          <td><strong>${getRegiaoNome(m.regiao_id)}</strong></td>
          <td class="mono ${tempCls}">${m.temperatura}°C</td>
          <td class="mono ${umidCls}">${m.umidade}%</td>
          <td class="mono">${m.chuva}mm</td>
          <td class="mono">${formatarData(m.data_monitoramento)}</td>
          <td>${badgeNivel(nivel)}</td>
        </tr>`;
    }).join('');
  }

  regiaoFilter.addEventListener('change', () => { filtroRegiao = regiaoFilter.value; render(); });

  /* ---------- Modal (admin) ---------- */
  const modal = document.getElementById('modal');
  const form = document.getElementById('monForm');
  const riskPreview = document.getElementById('riskPreview');

  function openModal() {
    form.reset();
    document.getElementById('f_data').value = new Date().toISOString().slice(0, 10);
    riskPreview.textContent = '';
    modal.classList.add('open');
  }
  function closeModal() { modal.classList.remove('open'); }

  if (isAdmin) {
    document.getElementById('btnNova').addEventListener('click', openModal);
    document.getElementById('modalClose').addEventListener('click', closeModal);
    document.getElementById('modalCancel').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

    function updatePreview() {
      const t = parseFloat(document.getElementById('f_temp').value);
      const u = parseFloat(document.getElementById('f_umid').value);
      if (isNaN(t) || isNaN(u)) { riskPreview.textContent = ''; return; }
      const nivel = calcularNivelRisco(t, u);
      const cor = nivel === 'ALTO' ? 'var(--red)' : nivel === 'MEDIO' ? 'var(--yellow)' : 'var(--green)';
      riskPreview.innerHTML = `Risco calculado: <strong style="color:${cor}">${nivelLabel(nivel)}</strong>` +
        (nivel === 'ALTO' ? ' — um alerta automático será gerado.' : '');
    }
    ['f_temp', 'f_umid'].forEach(id => document.getElementById(id).addEventListener('input', updatePreview));

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const regiaoId = Number(fRegiao.value);
      const temp = parseFloat(document.getElementById('f_temp').value);
      const umid = parseFloat(document.getElementById('f_umid').value);
      const chuva = parseFloat(document.getElementById('f_chuva').value);
      const data = document.getElementById('f_data').value;

      const monitoramentos = DB.monitoramentos;
      const novoId = DB.nextId(monitoramentos);
      const nivel = calcularNivelRisco(temp, umid);
      monitoramentos.push({
        id: novoId, regiao_id: regiaoId, temperatura: temp,
        umidade: umid, chuva: chuva, data_monitoramento: data
      });
      DB.saveMonitoramentos(monitoramentos);

      // Geração automática de alerta para nível ALTO
      let msg = `Leitura #${String(novoId).padStart(3,'0')} registrada (risco ${nivelLabel(nivel)}).`;
      if (nivel === 'ALTO') {
        const alertas = DB.alertas;
        const alertaId = DB.nextId(alertas);
        alertas.push({
          id: alertaId, regiao_id: regiaoId, monitoramento_id: novoId, nivel: 'ALTO',
          descricao: `Alerta automático: condições críticas detectadas em ${getRegiaoNome(regiaoId)} (${temp}°C / ${umid}%).`,
          status: 'ATIVO', data_alerta: data
        });
        DB.saveAlertas(alertas);
        msg += ` Alerta automático #${String(alertaId).padStart(3,'0')} gerado!`;
      }
      closeModal();
      showToast(msg, 'success');
      render();
    });
  }

  render();
  renderFooter();
})();
