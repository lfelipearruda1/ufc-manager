-- N:N entre Card PPV e cinturões disputados no evento.
CREATE TABLE card_ppv_cinturao (
    id_card_ppv BIGINT NOT NULL,
    id_cinturao BIGINT NOT NULL,
    PRIMARY KEY (id_card_ppv, id_cinturao),
    CONSTRAINT fk_cppv_cinturao_card_ppv
        FOREIGN KEY (id_card_ppv) REFERENCES card_ppv (id_card_ppv),
    CONSTRAINT fk_cppv_cinturao_cinturao
        FOREIGN KEY (id_cinturao) REFERENCES cinturao (id_cinturao)
);
