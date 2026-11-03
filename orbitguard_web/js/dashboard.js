/* ============================================================
   OrbitGuard - dashboard.js
   ============================================================ */
(function () {
  if (!initPaginaInterna('dashboard')) return;

  const usuario = Auth.getUsuario();
  const isAdmin = Auth.isAdmin();
  if (isAdmin) document.body.classList.add('is-admin');

  // Saudação personalizada por perfil
  const title = document.getElementById('welcomeTitle');
  const sub = document.getElementById('welcomeSub');
  if (isAdmin) {
    title.textContent = 'Painel do Administrador';
    sub.textContent = 'Controle total da estação: monitoramento, alertas, eventos e regiões.';
  } else {
    title.textContent = 'Painel de Acompanhamento';
    sub.textContent = 'Visão consolidada (somente leitura) do estado ambiental do território.';
  }

  const regioes = DB.regioes;
  const monitoramentos = DB.monitoramentos;
  const alertas = DB.alertas;
  const eventos = DB.eventos;

  const alertasAtivos = alertas.filter(a => a.status === 'ATIVO');

  // ---------- Cards de resumo ----------
  const cards = [
    { icon: 'layers',   value: regioes.length,        label: 'Regiões Monitoradas', accent: 'cyan' },
    { icon: 'bell',     value: alertasAtivos.length,   label: 'Alertas Ativos',      accent: 'red' },
    { icon: 'radio',    value: monitoramentos.length,  label: 'Leituras de Sensor',  accent: 'green' },
    { icon: 'calendar', value: eventos.length,         label: 'Eventos Registrados', accent: 'purple' }
  ];
  document.getElementById('summaryGrid').innerHTML = cards.map(c => `
    <div class="stat-card accent-${c.accent}">
      <div class="stat-icon">${icon(c.icon)}</div>
      <div class="stat-value">${c.value}</div>
      <div class="stat-label">${c.label}</div>
    </div>`).join('');

  // ---------- Última leitura por região ----------
  function ultimaLeitura(regiaoId) {
    const leituras = monitoramentos
      .filter(m => m.regiao_id === regiaoId)
      .sort((a, b) => b.data_monitoramento.localeCompare(a.data_monitoramento));
    return leituras[0] || null;
  }

  // ---------- Gráfico de temperaturas (CSS bars) ----------
  const tempData = regioes.map(r => {
    const l = ultimaLeitura(r.id);
    return { nome: r.nome, estado: r.estado, temp: l ? l.temperatura : 0 };
  });
  const maxTemp = Math.max(...tempData.map(d => d.temp), 40);
  document.getElementById('tempChart').innerHTML = tempData.map(d => {
    const h = Math.round((d.temp / maxTemp) * 100);
    const cls = d.temp > 35 ? 'hot' : (d.temp >= 30 ? 'warm' : 'cool');
    const short = d.nome.split(' ')[0];
    return `
      <div class="bar-col">
        <div class="bar ${cls}" style="height:0%" data-h="${h}">
          <span class="bar-val">${d.temp}°</span>
        </div>
        <div class="bar-label">${short}<br>${d.estado}</div>
      </div>`;
  }).join('');
  // anima as barras
  requestAnimationFrame(() => {
    document.querySelectorAll('#tempChart .bar').forEach(b => {
      b.style.height = b.dataset.h + '%';
    });
  });

  // ---------- Distribuição de risco ----------
  const riscoCount = { ALTO: 0, MEDIO: 0, BAIXO: 0 };
  alertasAtivos.forEach(a => { riscoCount[a.nivel] = (riscoCount[a.nivel] || 0) + 1; });
  document.getElementById('riskSummary').innerHTML = `
    <div class="risk-meter alto"><div class="num">${riscoCount.ALTO}</div>
      <span class="badge badge-red"><span class="led"></span>ALTO</span></div>
    <div class="risk-meter medio"><div class="num">${riscoCount.MEDIO}</div>
      <span class="badge badge-yellow"><span class="led"></span>MÉDIO</span></div>
    <div class="risk-meter baixo"><div class="num">${riscoCount.BAIXO}</div>
      <span class="badge badge-green"><span class="led"></span>BAIXO</span></div>
  `;

  // ---------- Status das regiões ----------
  const badgeNivel = (nivel) => {
    const cor = NIVEL_COR[nivel] || 'gray';
    const txt = nivel === 'MEDIO' ? 'MÉDIO' : nivel;
    return `<span class="badge badge-${cor}"><span class="led"></span>${txt}</span>`;
  };

  document.getElementById('regionStatusBody').innerHTML = regioes.map(r => {
    const l = ultimaLeitura(r.id);
    const nivel = l ? calcularNivelRisco(l.temperatura, l.umidade) : 'BAIXO';
    const ativos = alertasAtivos.filter(a => a.regiao_id === r.id).length;
    const tempCls = l && l.temperatura > 35 ? 'danger-cell' : (l && l.temperatura >= 30 ? 'warn-cell' : '');
    const umidCls = l && l.umidade < 30 ? 'danger-cell' : (l && l.umidade < 50 ? 'warn-cell' : '');
    return `
      <tr>
        <td><strong>${r.nome}</strong></td>
        <td class="mono">${r.estado}</td>
        <td class="mono ${tempCls}">${l ? l.temperatura + '°C' : '—'}</td>
        <td class="mono ${umidCls}">${l ? l.umidade + '%' : '—'}</td>
        <td class="mono">${l ? l.chuva + 'mm' : '—'}</td>
        <td>${badgeNivel(nivel)}</td>
        <td class="mono">${ativos > 0 ? `<span style="color:var(--red)">● ${ativos}</span>` : '<span class="text-dim">0</span>'}</td>
      </tr>`;
  }).join('');

  renderFooter();
})();
