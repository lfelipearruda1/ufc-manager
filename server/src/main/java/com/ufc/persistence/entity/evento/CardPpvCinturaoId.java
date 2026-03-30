package com.ufc.persistence.entity.evento;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardPpvCinturaoId implements Serializable {

    @Column(name = "id_card_ppv", nullable = false)
    private Long idCardPpv;

    @Column(name = "id_cinturao", nullable = false)
    private Long idCinturao;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CardPpvCinturaoId that = (CardPpvCinturaoId) o;
        return Objects.equals(idCardPpv, that.idCardPpv) && Objects.equals(idCinturao, that.idCinturao);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idCardPpv, idCinturao);
    }
}
