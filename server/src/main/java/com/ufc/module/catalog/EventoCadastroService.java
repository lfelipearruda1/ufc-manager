package com.ufc.module.catalog;

import com.ufc.module.catalog.dto.FightNightCreateRequest;
import com.ufc.module.catalog.dto.PpvCreateRequest;
import com.ufc.persistence.CardPpvRepository;
import com.ufc.persistence.CardRepository;
import com.ufc.persistence.entity.evento.CardPpv;
import com.ufc.persistence.entity.evento.FightCard;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class EventoCadastroService {

    private final CardRepository cardRepository;
    private final CardPpvRepository cardPpvRepository;

    public EventoCadastroService(CardRepository cardRepository, CardPpvRepository cardPpvRepository) {
        this.cardRepository = cardRepository;
        this.cardPpvRepository = cardPpvRepository;
    }

    @Transactional
    public long criarFightNight(FightNightCreateRequest req) {
        FightCard c = new FightCard();
        c.setCidade(req.cidade().trim());
        c.setPais(req.pais().trim());
        c.setDataEvento(req.dataEvento());
        c.setQuantLutas(req.quantLutas());
        return cardRepository.save(c).getIdCard();
    }

    @Transactional
    public long criarPpv(PpvCreateRequest req) {
        CardPpv p = new CardPpv();
        p.setNumEdicao(req.numEdicao());
        p.setPrecoPpv(req.precoPpv());
        p.setReceitaTotal(req.receitaTotal());
        p.setQuantPagantes(req.quantPagantes());
        p.setCidade(req.cidade().trim());
        p.setPais(req.pais().trim());
        p.setDataEvento(req.dataEvento());
        p.setQuantLutas(req.quantLutas());
        return cardPpvRepository.save(p).getIdCardPpv();
    }
}
