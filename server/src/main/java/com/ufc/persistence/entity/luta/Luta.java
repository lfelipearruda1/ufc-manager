package com.ufc.persistence.entity.luta;

import com.ufc.persistence.entity.evento.CardPpv;
import com.ufc.persistence.entity.evento.FightCard;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "luta")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Luta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_luta")
    private Long idLuta;

    @Column(nullable = false, length = 100)
    private String metodo;

    @Column(nullable = false, length = 100)
    private String resultado;

    @Column(name = "quant_rounds", nullable = false)
    private Integer quantRounds;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_card")
    private FightCard card;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_card_ppv")
    private CardPpv cardPpv;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_visibilidade", nullable = false)
    private VisibilidadeLuta visibilidade;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_juiz", nullable = false)
    private Juiz juiz;

    @OneToOne(mappedBy = "luta", fetch = FetchType.LAZY)
    private Possui possui;
}
