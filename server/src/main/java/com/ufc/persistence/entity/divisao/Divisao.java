package com.ufc.persistence.entity.divisao;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "divisao")
public class Divisao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_divisao")
    private Long idDivisao;

    @Column(name = "nome_divisao", nullable = false, length = 100)
    private String nomeDivisao;

    @Column(name = "peso_max", nullable = false)
    private Double pesoMax;

    @Column(name = "peso_min", nullable = false)
    private Double pesoMin;

    public Divisao() {}

    public Long getIdDivisao() {
        return idDivisao;
    }

    public void setIdDivisao(Long idDivisao) {
        this.idDivisao = idDivisao;
    }

    public String getNomeDivisao() {
        return nomeDivisao;
    }

    public void setNomeDivisao(String nomeDivisao) {
        this.nomeDivisao = nomeDivisao;
    }

    public Double getPesoMax() {
        return pesoMax;
    }

    public void setPesoMax(Double pesoMax) {
        this.pesoMax = pesoMax;
    }

    public Double getPesoMin() {
        return pesoMin;
    }

    public void setPesoMin(Double pesoMin) {
        this.pesoMin = pesoMin;
    }
}
