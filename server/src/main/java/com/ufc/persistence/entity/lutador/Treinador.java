package com.ufc.persistence.entity.lutador;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "treinador")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Treinador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_treinador")
    private Long idTreinador;

    @Column(name = "nome_treinador", nullable = false, length = 100)
    private String nomeTreinador;

    @Column(nullable = false, length = 100)
    private String especialidade;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_lutador", nullable = false, unique = true)
    private Lutador lutador;
}
