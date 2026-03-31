--  Projeto BD - Sistema de Gestão do UFC (UFC Manager)
--  Membros: Luca Ribeiro Albuquerque, Luiz Felipe Arruda, João Cláudio, Gabriel Belo

--  CRIAÇÃO DAS TABELAS

CREATE TABLE Divisao (
    id_divisao    BIGINT          NOT NULL,
    nome_divisao  VARCHAR(100) NOT NULL,
    peso_max      DOUBLE PRECISION NOT NULL,
    peso_min      DOUBLE PRECISION NOT NULL,
    CONSTRAINT pk_divisao        PRIMARY KEY (id_divisao),
    CONSTRAINT uq_divisao_nome   UNIQUE (nome_divisao),
    CONSTRAINT chk_divisao_pesos CHECK (peso_min < peso_max)
);

CREATE TABLE Lutador (
    id_lutador    BIGINT          NOT NULL,
    apelido       VARCHAR(100) NOT NULL,
    nome          VARCHAR(100) NOT NULL,
    peso          DOUBLE PRECISION NOT NULL,
    cartel        VARCHAR(15)  NOT NULL,
    nacionalidade VARCHAR(100) NOT NULL,
    id_divisao    INT          NOT NULL,
    CONSTRAINT pk_lutador        PRIMARY KEY (id_lutador),
    CONSTRAINT fk_lutador_div    FOREIGN KEY (id_divisao) REFERENCES Divisao(id_divisao),
    CONSTRAINT uq_lutador_nome   UNIQUE (nome),
    CONSTRAINT uq_lutador_apelido UNIQUE (apelido),
    CONSTRAINT chk_lutador_peso  CHECK (peso > 0)
);

CREATE TABLE Treinador (
    id_treinador  BIGINT          NOT NULL,
    nome          VARCHAR(100) NOT NULL,
    especialidade VARCHAR(100) NOT NULL,
    id_lutador    INT          NOT NULL,
    CONSTRAINT pk_treinador          PRIMARY KEY (id_treinador),
    CONSTRAINT fk_treinador_lutador  FOREIGN KEY (id_lutador) REFERENCES Lutador(id_lutador)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT chk_treinador_especialidade CHECK (
        especialidade IN ('Wrestling', 'Grappling', 'Striking')
    )
);

CREATE TABLE Cinturao (
    id_cinturao   BIGINT          NOT NULL,
    tipo_cinturao VARCHAR(100) NOT NULL,
    id_lutador    INT          NULL,
    id_divisao    INT          NOT NULL,
    CONSTRAINT pk_cinturao       PRIMARY KEY (id_cinturao),
    CONSTRAINT fk_cinturao_lut   FOREIGN KEY (id_lutador)  REFERENCES Lutador(id_lutador),
    CONSTRAINT fk_cinturao_div   FOREIGN KEY (id_divisao)  REFERENCES Divisao(id_divisao)
        ON DELETE CASCADE,
    CONSTRAINT chk_cinturao_tipo CHECK (
        tipo_cinturao IN ('Interino', 'Regular', 'BMF')
    )
);

CREATE TABLE VisibilidadeLuta (
    id_visibilidade BIGINT          NOT NULL,
    visibilidade    VARCHAR(100) NOT NULL,
    CONSTRAINT pk_visibilidade   PRIMARY KEY (id_visibilidade),
    CONSTRAINT uq_visibilidade   UNIQUE (visibilidade),
    CONSTRAINT chk_visibilidade  CHECK (
        visibilidade IN ('Preliminar', 'Co-main', 'Main')
    )
);

CREATE TABLE Card (
    id_card     BIGINT          NOT NULL,
    cidade      VARCHAR(100) NOT NULL,
    data_evento        DATE  NOT NULL,
    pais        VARCHAR(100) NOT NULL,
    quant_lutas INT          NOT NULL,
    CONSTRAINT pk_card PRIMARY KEY (id_card)
);

CREATE TABLE Card_PPV (
    id_card        BIGINT              NOT NULL,
    num_edicao     INT              NOT NULL,
    preco_ppv      DOUBLE PRECISION NOT NULL,
    receita_total        DOUBLE PRECISION NOT NULL,
    quant_pagantes INT              NOT NULL,
    cidade         VARCHAR(100)     NOT NULL,
    data_evento           DATE      NOT NULL,
    pais           VARCHAR(100)     NOT NULL,
    quant_lutas    INT              NOT NULL,
    id_cinturao    INT              NOT NULL,
    CONSTRAINT pk_card_ppv    PRIMARY KEY (id_card),
    CONSTRAINT fk_card_ppv    FOREIGN KEY (id_card)     REFERENCES Card(id_card)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_cinturao    FOREIGN KEY (id_cinturao) REFERENCES Cinturao(id_cinturao),
    CONSTRAINT uq_ppv_edicao  UNIQUE (num_edicao),
    CONSTRAINT chk_ppv_preco  CHECK (preco_ppv >= 0),
    CONSTRAINT chk_ppv_receita CHECK (receita_total >= 0)
);

CREATE TABLE Luta (
    id_luta       INT          NOT NULL,
    metodo        VARCHAR(100) NOT NULL,
    resultado     VARCHAR(100) NOT NULL,
    quant_rounds  INT          NOT NULL,
    id_desafiante INT          NOT NULL,
    id_desafiado  INT          NOT NULL,
    id_card       INT          NOT NULL,
    id_visibilidade INT        NOT NULL,
    CONSTRAINT pk_luta          PRIMARY KEY (id_luta),
    CONSTRAINT fk_desafiante    FOREIGN KEY (id_desafiante)   REFERENCES Lutador(id_lutador)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_desafiado     FOREIGN KEY (id_desafiado)    REFERENCES Lutador(id_lutador)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_luta_card     FOREIGN KEY (id_card)         REFERENCES Card(id_card)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_visibilidade  FOREIGN KEY (id_visibilidade) REFERENCES VisibilidadeLuta(id_visibilidade)
        ON UPDATE CASCADE,
    CONSTRAINT chk_luta_rounds  CHECK (quant_rounds BETWEEN 1 AND 5),
    CONSTRAINT chk_luta_metodo  CHECK (
        metodo IN ('Nocaute', 'Nocaute técnico', 'Finalização',
                   'Decisão Unânime', 'Decisão Dividida')
    ),
    CONSTRAINT chk_diferentes   CHECK (id_desafiante != id_desafiado)
);
