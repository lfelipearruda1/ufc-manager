package com.ufc.persistence.entity.lutador;

import com.ufc.persistence.entity.divisao.Divisao;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "lutador")
public class Lutador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_lutador")
    private Long idLutador;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(nullable = false)
    private Double peso;

    @Column(nullable = false, length = 100)
    private String apelido;

    @Column(nullable = false, length = 15)
    private String cartel;

    @Column(nullable = false, length = 100)
    private String nacionalidade;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_divisao", nullable = false)
    private Divisao divisao;

    public Lutador() {}

    public Long getIdLutador() {
        return idLutador;
    }

    public void setIdLutador(Long idLutador) {
        this.idLutador = idLutador;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Double getPeso() {
        return peso;
    }

    public void setPeso(Double peso) {
        this.peso = peso;
    }

    public String getApelido() {
        return apelido;
    }

    public void setApelido(String apelido) {
        this.apelido = apelido;
    }

    public String getCartel() {
        return cartel;
    }

    public void setCartel(String cartel) {
        this.cartel = cartel;
    }

    public String getNacionalidade() {
        return nacionalidade;
    }

    public void setNacionalidade(String nacionalidade) {
        this.nacionalidade = nacionalidade;
    }

    public Divisao getDivisao() {
        return divisao;
    }

    public void setDivisao(Divisao divisao) {
        this.divisao = divisao;
    }
}
