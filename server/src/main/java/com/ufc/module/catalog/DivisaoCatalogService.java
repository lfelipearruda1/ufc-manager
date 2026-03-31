package com.ufc.module.catalog;

import com.ufc.module.catalog.dto.DivisaoCreateRequest;
import com.ufc.module.catalog.dto.DivisaoResponse;
import com.ufc.persistence.DivisaoRepository;
import com.ufc.persistence.entity.divisao.Divisao;
import java.util.List;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DivisaoCatalogService {

    private final DivisaoRepository divisaoRepository;

    public DivisaoCatalogService(DivisaoRepository divisaoRepository) {
        this.divisaoRepository = divisaoRepository;
    }

    @Transactional(readOnly = true)
    public List<DivisaoResponse> listar() {
        return divisaoRepository.findAllByOrderByNomeDivisaoAsc().stream().map(this::toResponse).toList();
    }

    @Transactional
    public DivisaoResponse criar(DivisaoCreateRequest req) {
        Divisao d = new Divisao();
        d.setNomeDivisao(req.nomeDivisao().trim());
        d.setPesoMin(req.pesoMin());
        d.setPesoMax(req.pesoMax());
        return toResponse(divisaoRepository.save(d));
    }

    private DivisaoResponse toResponse(Divisao d) {
        return new DivisaoResponse(
                d.getIdDivisao(), d.getNomeDivisao(), d.getPesoMin(), d.getPesoMax());
    }
}
