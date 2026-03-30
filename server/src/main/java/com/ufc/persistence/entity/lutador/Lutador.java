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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "lutador")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
}
