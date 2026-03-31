-- Índices auxiliares (FKs mais consultadas).
CREATE INDEX ix_lutador_id_divisao ON lutador (id_divisao);
CREATE INDEX ix_luta_id_card ON luta (id_card);
CREATE INDEX ix_luta_id_card_ppv ON luta (id_card_ppv);
CREATE INDEX ix_luta_id_juiz ON luta (id_juiz);
CREATE INDEX ix_luta_id_visibilidade ON luta (id_visibilidade);
CREATE INDEX ix_possui_desafiante ON possui (id_lutador_desafiante);
CREATE INDEX ix_possui_desafiado ON possui (id_lutador_desafiado);
