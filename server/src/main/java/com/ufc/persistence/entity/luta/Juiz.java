package com.ufc.persistence.entity.luta;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "juiz")
public class Juiz {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_juiz")
    private Long idJuiz;

    @Column(name = "nome_juiz", nullable = false, length = 100)
    private String nomeJuiz;

    public Juiz() {}

    public Long getIdJuiz() {
        return idJuiz;
    }

    public void setIdJuiz(Long idJuiz) {
        this.idJuiz = idJuiz;
    }

    public String getNomeJuiz() {
        return nomeJuiz;
    }

    public void setNomeJuiz(String nomeJuiz) {
        this.nomeJuiz = nomeJuiz;
    }
}
