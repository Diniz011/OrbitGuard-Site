DROP TABLE IF EXISTS alerta;
DROP TABLE IF EXISTS evento;
DROP TABLE IF EXISTS monitoramento;
DROP TABLE IF EXISTS regiao;
DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario (
    id      NUMBER          NOT NULL,
    email   VARCHAR2(150)   NOT NULL,
    senha   VARCHAR2(100)   NOT NULL,
    perfil  VARCHAR2(20)    NOT NULL,
    CONSTRAINT pk_usuario PRIMARY KEY (id),
    CONSTRAINT uq_usuario_email UNIQUE (email),
    CONSTRAINT ck_usuario_perfil CHECK (perfil IN ('ADMINISTRADOR', 'USUARIO'))
);

CREATE TABLE regiao (
    id      NUMBER          NOT NULL,
    nome    VARCHAR2(100)   NOT NULL,
    estado  VARCHAR2(2)     NOT NULL,
    CONSTRAINT pk_regiao PRIMARY KEY (id)
);

CREATE TABLE monitoramento (
    id                  NUMBER          NOT NULL,
    regiao_id           NUMBER          NOT NULL,
    temperatura         NUMBER(5,2)     NOT NULL,
    umidade             NUMBER(5,2)     NOT NULL,
    chuva               NUMBER(5,2)     NOT NULL,
    data_monitoramento  DATE            NOT NULL,
    CONSTRAINT pk_monitoramento PRIMARY KEY (id),
    CONSTRAINT fk_monitoramento_regiao FOREIGN KEY (regiao_id)
        REFERENCES REGIAO (id)
);

CREATE TABLE alerta (
    id                  NUMBER          NOT NULL,
    regiao_id           NUMBER          NOT NULL,
    monitoramento_id    NUMBER,
    nivel               VARCHAR2(10)    NOT NULL,
    descricao           VARCHAR2(255)   NOT NULL,
    status              VARCHAR2(20)    NOT NULL,
    data_alerta         DATE            NOT NULL,
    CONSTRAINT pk_alerta PRIMARY KEY (id),
    CONSTRAINT uq_alerta_monitoramento UNIQUE (monitoramento_id),
    CONSTRAINT fk_alerta_regiao FOREIGN KEY (regiao_id)
        REFERENCES REGIAO (id),
    CONSTRAINT fk_alerta_monitoramento FOREIGN KEY (monitoramento_id)
        REFERENCES MONITORAMENTO (id),
    CONSTRAINT ck_alerta_nivel CHECK (nivel IN ('ALTO', 'SECA', 'BAIXO')),
    CONSTRAINT ck_alerta_status CHECK (status IN ('Ativo', 'Em analise', 'Resolvido'))
);

CREATE TABLE evento (
    id          NUMBER          NOT NULL,
    regiao_id   NUMBER          NOT NULL,
    tipo        VARCHAR2(50)    NOT NULL,
    nivel       VARCHAR2(10)    NOT NULL,
    data_evento DATE            NOT NULL,
    descricao   VARCHAR2(255)   NOT NULL,
    CONSTRAINT pk_evento PRIMARY KEY (id),
    CONSTRAINT fk_evento_regiao FOREIGN KEY (regiao_id)
        REFERENCES REGIAO (id),
    CONSTRAINT ck_evento_nivel CHECK (nivel IN ('ALTO', 'SECA', 'BAIXO'))
);
