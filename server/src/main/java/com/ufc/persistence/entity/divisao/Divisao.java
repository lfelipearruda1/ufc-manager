package com.ufc.persistence.entity.divisao;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "divisao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
}
