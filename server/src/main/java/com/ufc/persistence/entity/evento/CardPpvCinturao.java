package com.ufc.persistence.entity.evento;

import com.ufc.persistence.entity.cinturao.Cinturao;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "card_ppv_cinturao")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardPpvCinturao {

    @EmbeddedId
    private CardPpvCinturaoId id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId("idCardPpv")
    @JoinColumn(name = "id_card_ppv", nullable = false)
    private CardPpv cardPpv;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId("idCinturao")
    @JoinColumn(name = "id_cinturao", nullable = false)
    private Cinturao cinturao;
}
