package com.ufc.module.catalog;

import com.ufc.module.catalog.dto.LutadorCreateRequest;
import com.ufc.module.catalog.dto.LutadorResponse;
import com.ufc.persistence.DivisaoRepository;
import com.ufc.persistence.LutadorRepository;
import com.ufc.persistence.entity.divisao.Divisao;
import com.ufc.persistence.entity.lutador.Lutador;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class LutadorCatalogService {

    private final LutadorRepository lutadorRepository;
    private final DivisaoRepository divisaoRepository;

    public LutadorCatalogService(LutadorRepository lutadorRepository, DivisaoRepository divisaoRepository) {
        this.lutadorRepository = lutadorRepository;
        this.divisaoRepository = divisaoRepository;
    }

    @Transactional(readOnly = true)
    public List<LutadorResponse> listar(Long idDivisao) {
        List<Lutador> lista =
                idDivisao == null
                        ? lutadorRepository.findAllByOrderByNomeAsc()
                        : lutadorRepository.findByDivisao_IdDivisaoOrderByNomeAsc(idDivisao);
        return lista.stream().map(this::toResponse).toList();
    }

    @Transactional
    public LutadorResponse criar(LutadorCreateRequest req) {
        Divisao div = divisaoRepository
                .findById(req.idDivisao())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Divisão não encontrada: " + req.idDivisao()));
        Lutador l = new Lutador();
        l.setNome(req.nome().trim());
        l.setPeso(req.peso());
        l.setApelido(req.apelido().trim());
        l.setCartel(req.cartel().trim());
        l.setNacionalidade(req.nacionalidade().trim());
        l.setDivisao(div);
        return toResponse(lutadorRepository.save(l));
    }

    private LutadorResponse toResponse(Lutador l) {
        return new LutadorResponse(
                l.getIdLutador(),
                l.getNome(),
                l.getPeso(),
                l.getApelido(),
                l.getCartel(),
                l.getNacionalidade(),
                l.getDivisao().getIdDivisao(),
                l.getDivisao().getNomeDivisao());
    }
}
