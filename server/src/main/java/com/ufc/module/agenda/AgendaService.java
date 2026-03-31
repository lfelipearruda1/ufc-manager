package com.ufc.module.agenda;

import com.ufc.module.agenda.dto.EventoDetalheResponse;
import com.ufc.module.agenda.dto.LutaLinhaResponse;
import com.ufc.module.agenda.dto.ProximoEventoResponse;
import com.ufc.persistence.CardPpvRepository;
import com.ufc.persistence.CardRepository;
import com.ufc.persistence.PossuiRepository;
import com.ufc.persistence.entity.evento.CardPpv;
import com.ufc.persistence.entity.evento.FightCard;
import com.ufc.persistence.entity.luta.Possui;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AgendaService {

    private static final String TITULO_FIGHT_NIGHT_PREFIX = "Fight Night · ";
    private static final String TITULO_PPV_PREFIX = "UFC ";

    private final CardRepository cardRepository;
    private final CardPpvRepository cardPpvRepository;
    private final PossuiRepository possuiRepository;

    public AgendaService(
            CardRepository cardRepository,
            CardPpvRepository cardPpvRepository,
            PossuiRepository possuiRepository) {
        this.cardRepository = cardRepository;
        this.cardPpvRepository = cardPpvRepository;
        this.possuiRepository = possuiRepository;
    }

    @Transactional(readOnly = true)
    public List<ProximoEventoResponse> listarProximos() {
        LocalDate hoje = LocalDate.now();
        List<ProximoEventoResponse> lista = new ArrayList<>();

        for (FightCard c : cardRepository.findByDataEventoGreaterThanEqualOrderByDataEventoAsc(hoje)) {
            lista.add(mapearProximoCard(c));
        }
        for (CardPpv p : cardPpvRepository.findByDataEventoGreaterThanEqualOrderByDataEventoAsc(hoje)) {
            lista.add(mapearProximoPpv(p));
        }

        lista.sort(Comparator.comparing(ProximoEventoResponse::dataEvento).thenComparing(ProximoEventoResponse::titulo));
        return lista;
    }

    @Transactional(readOnly = true)
    public Optional<EventoDetalheResponse> detalhe(String tipoRaw, long id) {
        String tipo = tipoRaw == null ? "" : tipoRaw.trim().toLowerCase();
        return switch (tipo) {
            case "card" -> cardRepository.findById(id).map(c -> montarDetalheCard(c, possuiRepository.findDetalhesPorCard(id)));
            case "ppv" -> cardPpvRepository.findById(id).map(p -> montarDetalhePpv(p, possuiRepository.findDetalhesPorPpv(id)));
            default -> Optional.empty();
        };
    }

    private static ProximoEventoResponse mapearProximoCard(FightCard c) {
        return new ProximoEventoResponse(
                "CARD",
                c.getIdCard(),
                TITULO_FIGHT_NIGHT_PREFIX + c.getCidade(),
                c.getCidade(),
                c.getPais(),
                c.getDataEvento().toString(),
                c.getQuantLutas());
    }

    private static ProximoEventoResponse mapearProximoPpv(CardPpv p) {
        return new ProximoEventoResponse(
                "PPV",
                p.getIdCardPpv(),
                TITULO_PPV_PREFIX + p.getNumEdicao(),
                p.getCidade(),
                p.getPais(),
                p.getDataEvento().toString(),
                p.getQuantLutas());
    }

    private static EventoDetalheResponse montarDetalheCard(FightCard c, List<Possui> possuis) {
        return new EventoDetalheResponse(
                "CARD",
                c.getIdCard(),
                TITULO_FIGHT_NIGHT_PREFIX + c.getCidade(),
                c.getCidade(),
                c.getPais(),
                c.getDataEvento().toString(),
                c.getQuantLutas(),
                mapearLutas(possuis));
    }

    private static EventoDetalheResponse montarDetalhePpv(CardPpv p, List<Possui> possuis) {
        return new EventoDetalheResponse(
                "PPV",
                p.getIdCardPpv(),
                TITULO_PPV_PREFIX + p.getNumEdicao(),
                p.getCidade(),
                p.getPais(),
                p.getDataEvento().toString(),
                p.getQuantLutas(),
                mapearLutas(possuis));
    }

    private static List<LutaLinhaResponse> mapearLutas(List<Possui> possuis) {
        int ordem = 1;
        List<LutaLinhaResponse> lutas = new ArrayList<>();
        for (Possui p : possuis) {
            boolean belt = p.getCinturao() != null;
            String tipoCint = belt ? p.getCinturao().getTipoCinturao() : null;
            lutas.add(new LutaLinhaResponse(
                    p.getLuta().getIdLuta(),
                    ordem++,
                    p.getDesafiante().getNome(),
                    p.getDesafiado().getNome(),
                    p.getDesafiante().getDivisao().getNomeDivisao(),
                    belt,
                    tipoCint));
        }
        return lutas;
    }
}
