package com.ufc.module.home;

import com.ufc.module.home.dto.HomeSummaryResponse;
import com.ufc.module.home.dto.UltimoEventoResumo;
import com.ufc.persistence.entity.evento.CardPpv;
import com.ufc.persistence.entity.evento.FightCard;
import com.ufc.persistence.CardPpvRepository;
import com.ufc.persistence.CardRepository;
import com.ufc.persistence.LutadorRepository;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class HomeSummaryService {

    private final LutadorRepository lutadorRepository;
    private final CardRepository cardRepository;
    private final CardPpvRepository cardPpvRepository;

    public HomeSummaryService(
            LutadorRepository lutadorRepository,
            CardRepository cardRepository,
            CardPpvRepository cardPpvRepository) {
        this.lutadorRepository = lutadorRepository;
        this.cardRepository = cardRepository;
        this.cardPpvRepository = cardPpvRepository;
    }

    @Transactional(readOnly = true)
    public HomeSummaryResponse buildSummary() {
        long totalLutadores = lutadorRepository.count();
        long totalCards = cardRepository.count();
        long totalCardsPpv = cardPpvRepository.count();

        return new HomeSummaryResponse(
                true,
                totalLutadores,
                totalCards,
                totalCardsPpv,
                resolverUltimoEvento());
    }

    private UltimoEventoResumo resolverUltimoEvento() {
        Optional<FightCard> card = cardRepository.findFirstByOrderByDataEventoDesc();
        Optional<CardPpv> ppv = cardPpvRepository.findFirstByOrderByDataEventoDesc();

        if (card.isEmpty() && ppv.isEmpty()) {
            return null;
        }
        if (card.isEmpty()) {
            return mapearPpv(ppv.get());
        }
        if (ppv.isEmpty()) {
            return mapearCard(card.get());
        }

        FightCard c = card.get();
        CardPpv p = ppv.get();
        if (c.getDataEvento().isAfter(p.getDataEvento())) {
            return mapearCard(c);
        }
        if (p.getDataEvento().isAfter(c.getDataEvento())) {
            return mapearPpv(p);
        }
        return mapearCard(c);
    }

    private static UltimoEventoResumo mapearCard(FightCard c) {
        return new UltimoEventoResumo(
                "CARD",
                c.getIdCard(),
                c.getCidade(),
                c.getPais(),
                c.getDataEvento().toString());
    }

    private static UltimoEventoResumo mapearPpv(CardPpv p) {
        return new UltimoEventoResumo(
                "PPV",
                p.getIdCardPpv(),
                p.getCidade(),
                p.getPais(),
                p.getDataEvento().toString());
    }
}
