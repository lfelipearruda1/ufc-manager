-- Desafiante / desafiado / cinturão opcional; PK = id_luta (1:1 com luta).
CREATE TABLE possui (
    id_luta               BIGINT NOT NULL PRIMARY KEY,
    id_lutador_desafiante BIGINT NOT NULL,
    id_lutador_desafiado  BIGINT NOT NULL,
    id_cinturao           BIGINT,
    CONSTRAINT fk_possui_luta
        FOREIGN KEY (id_luta) REFERENCES luta (id_luta),
    CONSTRAINT fk_possui_desafiante
        FOREIGN KEY (id_lutador_desafiante) REFERENCES lutador (id_lutador),
    CONSTRAINT fk_possui_desafiado
        FOREIGN KEY (id_lutador_desafiado) REFERENCES lutador (id_lutador),
    CONSTRAINT fk_possui_cinturao
        FOREIGN KEY (id_cinturao) REFERENCES cinturao (id_cinturao)
);
