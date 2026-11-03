/* ============================================================
   OrbitGuard - data.js
   Dados estáticos simulando o banco de dados (espelho do SQL/Java)
   Persistência leve em sessionStorage para refletir alterações
   feitas durante a sessão (ADMINISTRADOR).
   ============================================================ */

const SEED_USUARIOS = [
  { id: 1, email: 'admin@orbitguard.com', senha: 'admin123', perfil: 'ADMINISTRADOR' },
  { id: 2, email: 'user@orbitguard.com',  senha: 'user123',  perfil: 'USUARIO' }
];

const SEED_REGIOES = [
  { id: 1, nome: 'Amazônia Central', estado: 'AM' },
  { id: 2, nome: 'Pantanal Sul',     estado: 'MS' },
  { id: 3, nome: 'Cerrado Goiano',   estado: 'GO' },
  { id: 4, nome: 'Litoral Nordeste', estado: 'BA' },
  { id: 5, nome: 'Serra Gaúcha',     estado: 'RS' }
];

const SEED_MONITORAMENTOS = [
  { id: 1, regiao_id: 1, temperatura: 38.5, umidade: 25, chuva: 2,  data_monitoramento: '2026-05-01' },
  { id: 2, regiao_id: 2, temperatura: 34.0, umidade: 40, chuva: 15, data_monitoramento: '2026-05-01' },
  { id: 3, regiao_id: 3, temperatura: 36.2, umidade: 28, chuva: 0,  data_monitoramento: '2026-05-02' },
  { id: 4, regiao_id: 4, temperatura: 30.0, umidade: 65, chuva: 50, data_monitoramento: '2026-05-02' },
  { id: 5, regiao_id: 5, temperatura: 22.0, umidade: 70, chuva: 30, data_monitoramento: '2026-05-03' },
  { id: 6, regiao_id: 1, temperatura: 39.0, umidade: 22, chuva: 0,  data_monitoramento: '2026-05-10' },
  { id: 7, regiao_id: 3, temperatura: 37.0, umidade: 26, chuva: 1,  data_monitoramento: '2026-05-15' },
  { id: 8, regiao_id: 2, temperatura: 33.5, umidade: 42, chuva: 10, data_monitoramento: '2026-05-20' }
];

const SEED_ALERTAS = [
  { id: 1,  regiao_id: 1, monitoramento_id: 1,    nivel: 'ALTO',  descricao: 'Temperatura crítica e umidade muito baixa na Amazônia Central', status: 'ATIVO',     data_alerta: '2026-05-01' },
  { id: 2,  regiao_id: 3, monitoramento_id: 3,    nivel: 'ALTO',  descricao: 'Risco de incêndio no Cerrado Goiano - seca severa',           status: 'ATIVO',     data_alerta: '2026-05-02' },
  { id: 3,  regiao_id: 2, monitoramento_id: 2,    nivel: 'MEDIO', descricao: 'Temperatura elevada no Pantanal Sul',                          status: 'ATIVO',     data_alerta: '2026-05-01' },
  { id: 4,  regiao_id: 4, monitoramento_id: 4,    nivel: 'BAIXO', descricao: 'Condições normais no Litoral Nordeste',                        status: 'RESOLVIDO', data_alerta: '2026-05-02' },
  { id: 5,  regiao_id: 5, monitoramento_id: 5,    nivel: 'BAIXO', descricao: 'Serra Gaúcha com clima estável',                               status: 'RESOLVIDO', data_alerta: '2026-05-03' },
  { id: 6,  regiao_id: 1, monitoramento_id: 6,    nivel: 'ALTO',  descricao: 'Situação crítica mantida - Amazônia Central',                  status: 'ATIVO',     data_alerta: '2026-05-10' },
  { id: 7,  regiao_id: 3, monitoramento_id: 7,    nivel: 'ALTO',  descricao: 'Persistência de seca extrema no Cerrado',                      status: 'ATIVO',     data_alerta: '2026-05-15' },
  { id: 8,  regiao_id: 2, monitoramento_id: 8,    nivel: 'MEDIO', descricao: 'Monitoramento contínuo - Pantanal',                            status: 'ATIVO',     data_alerta: '2026-05-20' },
  { id: 9,  regiao_id: 1, monitoramento_id: null, nivel: 'ALTO',  descricao: 'Alerta preventivo - previsão de queimadas',                    status: 'ATIVO',     data_alerta: '2026-05-25' },
  { id: 10, regiao_id: 4, monitoramento_id: null, nivel: 'MEDIO', descricao: 'Previsão de chuvas intensas no litoral',                       status: 'ATIVO',     data_alerta: '2026-05-28' }
];

const SEED_EVENTOS = [
  { id: 1, regiao_id: 1, tipo: 'INCENDIO',     nivel: 'ALTO',  data_evento: '2026-04-15', descricao: 'Foco de incêndio detectado via satélite na Amazônia Central' },
  { id: 2, regiao_id: 2, tipo: 'INUNDACAO',    nivel: 'MEDIO', data_evento: '2026-03-20', descricao: 'Alagamento parcial em área ribeirinha do Pantanal' },
  { id: 3, regiao_id: 3, tipo: 'SECA',         nivel: 'ALTO',  data_evento: '2026-05-01', descricao: 'Seca prolongada afetando o Cerrado Goiano' },
  { id: 4, regiao_id: 4, tipo: 'TEMPESTADE',   nivel: 'MEDIO', data_evento: '2026-02-10', descricao: 'Tempestade tropical no litoral baiano' },
  { id: 5, regiao_id: 5, tipo: 'DESLIZAMENTO', nivel: 'BAIXO', data_evento: '2026-01-05', descricao: 'Pequeno deslizamento em encosta na Serra Gaúcha' }
];

/* ============================================================
   Camada de "estado" - usa sessionStorage para que as
   alterações do ADMINISTRADOR persistam durante a navegação.
   ============================================================ */
const DB = {
  _load(key, seed) {
    try {
      const raw = sessionStorage.getItem(key);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore */ }
    sessionStorage.setItem(key, JSON.stringify(seed));
    return JSON.parse(JSON.stringify(seed));
  },
  _save(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  },

  get usuarios()        { return this._load('og_usuarios', SEED_USUARIOS); },
  get regioes()         { return this._load('og_regioes', SEED_REGIOES); },
  get monitoramentos()  { return this._load('og_monitoramentos', SEED_MONITORAMENTOS); },
  get alertas()         { return this._load('og_alertas', SEED_ALERTAS); },
  get eventos()         { return this._load('og_eventos', SEED_EVENTOS); },

  saveRegioes(v)        { this._save('og_regioes', v); },
  saveMonitoramentos(v) { this._save('og_monitoramentos', v); },
  saveAlertas(v)        { this._save('og_alertas', v); },
  saveEventos(v)        { this._save('og_eventos', v); },

  nextId(arr) {
    return arr.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  },

  resetAll() {
    ['og_usuarios','og_regioes','og_monitoramentos','og_alertas','og_eventos']
      .forEach(k => sessionStorage.removeItem(k));
  }
};

/* ============================================================
   Regras de negócio compartilhadas
   ============================================================ */

// Cálculo do nível de risco a partir de leitura de monitoramento
function calcularNivelRisco(temperatura, umidade) {
  if (temperatura > 35 || umidade < 30) return 'ALTO';
  if (temperatura > 30 || umidade < 50) return 'MEDIO';
  return 'BAIXO';
}

// Helpers de consulta
function getRegiaoById(id) {
  return DB.regioes.find(r => r.id === id) || null;
}
function getRegiaoNome(id) {
  const r = getRegiaoById(id);
  return r ? `${r.nome} (${r.estado})` : '—';
}
function getMonitoramentoById(id) {
  if (id === null || id === undefined) return null;
  return DB.monitoramentos.find(m => m.id === id) || null;
}

// Cores semáforo para níveis
const NIVEL_COR = {
  ALTO:  'red',
  MEDIO: 'yellow',
  BAIXO: 'green'
};

// Formatação de data BR
function formatarData(iso) {
  if (!iso) return '—';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

// Ícones por tipo de evento
const TIPO_EVENTO_ICONE = {
  INCENDIO:     'flame',
  INUNDACAO:    'waves',
  SECA:         'sun',
  TEMPESTADE:   'cloudLightning',
  DESLIZAMENTO: 'mountain'
};
