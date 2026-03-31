package com.ufc.persistence.entity.luta;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "visibilidade_luta")
public class VisibilidadeLuta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_visibilidade")
    private Long idVisibilidade;

    @Column(nullable = false, length = 100)
    private String visibilidade;

    public VisibilidadeLuta() {}

    public Long getIdVisibilidade() {
        return idVisibilidade;
    }

    public void setIdVisibilidade(Long idVisibilidade) {
        this.idVisibilidade = idVisibilidade;
    }

    public String getVisibilidade() {
        return visibilidade;
    }

    public void setVisibilidade(String visibilidade) {
        this.visibilidade = visibilidade;
    }
}
