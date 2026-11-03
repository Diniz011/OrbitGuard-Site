INSERT INTO usuario (id, email, senha, perfil)
    VALUES (1, 'admin@orbitguard.com', 'admin123', 'ADMINISTRADOR');
INSERT INTO USUARIO (id, email, senha, perfil)
    VALUES (2, 'user@orbitguard.com', 'user123', 'USUARIO');

INSERT INTO regiao (id, nome, estado) VALUES (1, 'Manaus', 'AM');
INSERT INTO regiao (id, nome, estado) VALUES (2, 'Pantanal', 'MS');
INSERT INTO regiao (id, nome, estado) VALUES (3, 'Cerrado - Brasilia', 'DF');
INSERT INTO regiao (id, nome, estado) VALUES (4, 'Caatinga - Petrolina', 'PE');
INSERT INTO regiao (id, nome, estado) VALUES (5, 'Vale do Paraiba', 'SP');

INSERT INTO monitoramento (id, regiao_id, temperatura, umidade, chuva, data_monitoramento)
    VALUES (1, 1, 32.4, 78, 64, TO_DATE('2026-05-28', 'YYYY-MM-DD'));
INSERT INTO monitoramento (id, regiao_id, temperatura, umidade, chuva, data_monitoramento)
    VALUES (2, 2, 36.1, 41, 12, TO_DATE('2026-05-29', 'YYYY-MM-DD'));
INSERT INTO monitoramento (id, regiao_id, temperatura, umidade, chuva, data_monitoramento)
    VALUES (3, 3, 29.8, 34, 8, TO_DATE('2026-05-30', 'YYYY-MM-DD'));
INSERT INTO monitoramento (id, regiao_id, temperatura, umidade, chuva, data_monitoramento)
    VALUES (4, 4, 38.7, 19, 3, TO_DATE('2026-05-30', 'YYYY-MM-DD'));
INSERT INTO monitoramento (id, regiao_id, temperatura, umidade, chuva, data_monitoramento)
    VALUES (5, 5, 24.5, 64, 41, TO_DATE('2026-05-31', 'YYYY-MM-DD'));
INSERT INTO monitoramento (id, regiao_id, temperatura, umidade, chuva, data_monitoramento)
    VALUES (6, 1, 33.1, 76, 59, TO_DATE('2026-06-03', 'YYYY-MM-DD'));
INSERT INTO monitoramento (id, regiao_id, temperatura, umidade, chuva, data_monitoramento)
    VALUES (7, 2, 37.9, 33, 14, TO_DATE('2026-06-03', 'YYYY-MM-DD'));
INSERT INTO monitoramento (id, regiao_id, temperatura, umidade, chuva, data_monitoramento)
    VALUES (8, 3, 28.4, 38, 5, TO_DATE('2026-06-04', 'YYYY-MM-DD'));

INSERT INTO alerta (id, regiao_id, monitoramento_id, nivel, descricao, status, data_alerta)
    VALUES (1, 1, 1, 'BAIXO', 'Condicoes ambientais dentro dos parametros esperados.', 'Resolvido', TO_DATE('2026-05-28', 'YYYY-MM-DD'));
INSERT INTO alerta (id, regiao_id, monitoramento_id, nivel, descricao, status, data_alerta)
    VALUES (2, 2, 2, 'ALTO', 'Risco elevado detectado nas leituras ambientais da regiao.', 'Ativo', TO_DATE('2026-05-29', 'YYYY-MM-DD'));
INSERT INTO alerta (id, regiao_id, monitoramento_id, nivel, descricao, status, data_alerta)
    VALUES (3, 3, 3, 'SECA', 'Baixa precipitacao registrada, condicao de seca em monitoramento.', 'Em analise', TO_DATE('2026-05-30', 'YYYY-MM-DD'));
INSERT INTO alerta (id, regiao_id, monitoramento_id, nivel, descricao, status, data_alerta)
    VALUES (4, 4, 4, 'ALTO', 'Risco elevado detectado nas leituras ambientais da regiao.', 'Ativo', TO_DATE('2026-05-30', 'YYYY-MM-DD'));
INSERT INTO alerta (id, regiao_id, monitoramento_id, nivel, descricao, status, data_alerta)
    VALUES (5, 5, 5, 'BAIXO', 'Condicoes ambientais dentro dos parametros esperados.', 'Resolvido', TO_DATE('2026-05-31', 'YYYY-MM-DD'));
INSERT INTO alerta (id, regiao_id, monitoramento_id, nivel, descricao, status, data_alerta)
    VALUES (6, 1, 6, 'BAIXO', 'Condicoes ambientais dentro dos parametros esperados.', 'Resolvido', TO_DATE('2026-06-03', 'YYYY-MM-DD'));
INSERT INTO alerta (id, regiao_id, monitoramento_id, nivel, descricao, status, data_alerta)
    VALUES (7, 2, 7, 'ALTO', 'Risco elevado detectado nas leituras ambientais da regiao.', 'Ativo', TO_DATE('2026-06-03', 'YYYY-MM-DD'));
INSERT INTO alerta (id, regiao_id, monitoramento_id, nivel, descricao, status, data_alerta)
    VALUES (8, 3, 8, 'SECA', 'Baixa precipitacao registrada, condicao de seca em monitoramento.', 'Em analise', TO_DATE('2026-06-04', 'YYYY-MM-DD'));

INSERT INTO alerta (id, regiao_id, monitoramento_id, nivel, descricao, status, data_alerta)
    VALUES (9, 4, NULL, 'ALTO', 'Acompanhamento de seca na regiao de interesse.', 'Ativo', TO_DATE('2026-06-05', 'YYYY-MM-DD'));
INSERT INTO alerta (id, regiao_id, monitoramento_id, nivel, descricao, status, data_alerta)
    VALUES (10, 5, NULL, 'BAIXO', 'Monitorando possiveis tempestades no Vale do Paraiba.', 'Ativo', TO_DATE('2026-06-06', 'YYYY-MM-DD'));

INSERT INTO evento (id, regiao_id, tipo, nivel, data_evento, descricao)
    VALUES (1, 4, 'Seca', 'ALTO', TO_DATE('2026-06-04', 'YYYY-MM-DD'), 'Seca severa registrada na Caatinga com solo critico.');
INSERT INTO evento (id, regiao_id, tipo, nivel, data_evento, descricao)
    VALUES (2, 2, 'Calor extremo', 'ALTO', TO_DATE('2026-06-03', 'YYYY-MM-DD'), 'Onda de calor extremo sobre o Pantanal.');
INSERT INTO evento (id, regiao_id, tipo, nivel, data_evento, descricao)
    VALUES (3, 3, 'Seca', 'SECA', TO_DATE('2026-06-04', 'YYYY-MM-DD'), 'Periodo prolongado de baixa precipitacao no Cerrado.');
INSERT INTO evento (id, regiao_id, tipo, nivel, data_evento, descricao)
    VALUES (4, 5, 'Calor extremo', 'BAIXO', TO_DATE('2026-06-04', 'YYYY-MM-DD'), 'Elevacao moderada de temperatura no Vale do Paraiba.');
INSERT INTO evento (id, regiao_id, tipo, nivel, data_evento, descricao)
    VALUES (5, 1, 'Tempestade', 'BAIXO', TO_DATE('2026-06-03', 'YYYY-MM-DD'), 'Tempestade tropical de baixa intensidade em Manaus.');
INSERT INTO evento (id, regiao_id, tipo, nivel, data_evento, descricao)
    VALUES (6, 4, 'Calor extremo', 'ALTO', TO_DATE('2026-05-30', 'YYYY-MM-DD'), 'Temperatura recorde acompanhada de baixa umidade.');
INSERT INTO evento (id, regiao_id, tipo, nivel, data_evento, descricao)
    VALUES (7, 2, 'Incendio', 'SECA', TO_DATE('2026-05-29', 'YYYY-MM-DD'), 'Foco de incendio favorecido por estiagem no Pantanal.');
INSERT INTO evento (id, regiao_id, tipo, nivel, data_evento, descricao)
    VALUES (8, 3, 'Seca', 'SECA', TO_DATE('2026-05-30', 'YYYY-MM-DD'), 'Reservatorios em queda devido a estiagem no Cerrado.');

COMMIT;
