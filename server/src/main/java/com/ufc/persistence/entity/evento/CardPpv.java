package com.ufc.persistence.entity.evento;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.time.LocalDate;

@Entity
@Table(name = "card_ppv")
public class CardPpv {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_card_ppv")
    private Long idCardPpv;

    @Column(name = "num_edicao", nullable = false)
    private Integer numEdicao;

    @Column(name = "preco_ppv", nullable = false)
    private Double precoPpv;

    @Column(name = "receita_total", nullable = false)
    private Double receitaTotal;

    @Column(name = "quant_pagantes", nullable = false)
    private Integer quantPagantes;

    @Column(nullable = false, length = 100)
    private String cidade;

    @Column(nullable = false, length = 100)
    private String pais;

    @Column(name = "data_evento", nullable = false)
    private LocalDate dataEvento;

    @Column(name = "quant_lutas", nullable = false)
    private Integer quantLutas;

    protected CardPpv() {}

    public Long getIdCardPpv() {
        return idCardPpv;
    }

    public void setIdCardPpv(Long idCardPpv) {
        this.idCardPpv = idCardPpv;
    }

    public Integer getNumEdicao() {
        return numEdicao;
    }

    public void setNumEdicao(Integer numEdicao) {
        this.numEdicao = numEdicao;
    }

    public Double getPrecoPpv() {
        return precoPpv;
    }

    public void setPrecoPpv(Double precoPpv) {
        this.precoPpv = precoPpv;
    }

    public Double getReceitaTotal() {
        return receitaTotal;
    }

    public void setReceitaTotal(Double receitaTotal) {
        this.receitaTotal = receitaTotal;
    }

    public Integer getQuantPagantes() {
        return quantPagantes;
    }

    public void setQuantPagantes(Integer quantPagantes) {
        this.quantPagantes = quantPagantes;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    public LocalDate getDataEvento() {
        return dataEvento;
    }

    public void setDataEvento(LocalDate dataEvento) {
        this.dataEvento = dataEvento;
    }

    public Integer getQuantLutas() {
        return quantLutas;
    }

    public void setQuantLutas(Integer quantLutas) {
        this.quantLutas = quantLutas;
    }
}
