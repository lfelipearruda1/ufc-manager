package com.ufc.persistence.entity.luta;

import com.ufc.persistence.entity.cinturao.Cinturao;
import com.ufc.persistence.entity.lutador.Lutador;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "possui")
public class Possui {

    @Id
    private Long idLuta;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId
    @JoinColumn(name = "id_luta")
    private Luta luta;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_lutador_desafiante", nullable = false)
    private Lutador desafiante;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_lutador_desafiado", nullable = false)
    private Lutador desafiado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cinturao")
    private Cinturao cinturao;

    public Possui() {}

    public Long getIdLuta() {
        return idLuta;
    }

    public void setIdLuta(Long idLuta) {
        this.idLuta = idLuta;
    }

    public Luta getLuta() {
        return luta;
    }

    public void setLuta(Luta luta) {
        this.luta = luta;
    }

    public Lutador getDesafiante() {
        return desafiante;
    }

    public void setDesafiante(Lutador desafiante) {
        this.desafiante = desafiante;
    }

    public Lutador getDesafiado() {
        return desafiado;
    }

    public void setDesafiado(Lutador desafiado) {
        this.desafiado = desafiado;
    }

    public Cinturao getCinturao() {
        return cinturao;
    }

    public void setCinturao(Cinturao cinturao) {
        this.cinturao = cinturao;
    }
}
