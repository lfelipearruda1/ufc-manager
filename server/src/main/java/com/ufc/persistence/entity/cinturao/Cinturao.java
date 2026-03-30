package com.ufc.persistence.entity.cinturao;

import com.ufc.persistence.entity.divisao.Divisao;
import com.ufc.persistence.entity.lutador.Lutador;
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
@Table(name = "cinturao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Cinturao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cinturao")
    private Long idCinturao;

    @Column(name = "tipo_cinturao", nullable = false, length = 100)
    private String tipoCinturao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_lutador")
    private Lutador lutador;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_divisao", nullable = false)
    private Divisao divisao;
}
