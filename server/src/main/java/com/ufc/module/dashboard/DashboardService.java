package com.ufc.module.dashboard;

import com.ufc.module.dashboard.dto.DashboardResponse;
import com.ufc.module.dashboard.dto.NomeQuantidadeItem;
import com.ufc.persistence.CardPpvRepository;
import com.ufc.persistence.CardRepository;
import com.ufc.persistence.DivisaoRepository;
import com.ufc.persistence.LutadorRepository;
import com.ufc.persistence.LutaRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DashboardService {

    private final LutadorRepository lutadorRepository;
    private final DivisaoRepository divisaoRepository;
    private final CardRepository cardRepository;
    private final CardPpvRepository cardPpvRepository;
    private final LutaRepository lutaRepository;

    public DashboardService(
            LutadorRepository lutadorRepository,
            DivisaoRepository divisaoRepository,
            CardRepository cardRepository,
            CardPpvRepository cardPpvRepository,
            LutaRepository lutaRepository) {
        this.lutadorRepository = lutadorRepository;
        this.divisaoRepository = divisaoRepository;
        this.cardRepository = cardRepository;
        this.cardPpvRepository = cardPpvRepository;
        this.lutaRepository = lutaRepository;
    }

    @Transactional(readOnly = true)
    public DashboardResponse resumo() {
        List<NomeQuantidadeItem> porDiv = new ArrayList<>();
        for (Object[] row : lutadorRepository.countLutadoresGroupedByDivisaoNome()) {
            porDiv.add(nomeQuantidadeFromRow(row));
        }
        return new DashboardResponse(
                lutadorRepository.count(),
                divisaoRepository.count(),
                cardRepository.count(),
                cardPpvRepository.count(),
                lutaRepository.count(),
                lutaRepository.countByCardIsNotNull(),
                lutaRepository.countByCardPpvIsNotNull(),
                porDiv);
    }

    private static NomeQuantidadeItem nomeQuantidadeFromRow(Object[] row) {
        String nome = (String) row[0];
        long quantidade = ((Number) row[1]).longValue();
        return new NomeQuantidadeItem(nome, quantidade);
    }
}
