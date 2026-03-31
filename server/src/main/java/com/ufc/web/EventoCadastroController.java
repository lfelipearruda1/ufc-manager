package com.ufc.web;

import com.ufc.module.catalog.EventoCadastroService;
import com.ufc.module.catalog.dto.FightNightCreateRequest;
import com.ufc.module.catalog.dto.PpvCreateRequest;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/eventos")
public class EventoCadastroController {

    private final EventoCadastroService eventoCadastroService;

    public EventoCadastroController(EventoCadastroService eventoCadastroService) {
        this.eventoCadastroService = eventoCadastroService;
    }

    @PostMapping("/fight-night")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> criarFightNight(@Valid @RequestBody FightNightCreateRequest body) {
        long id = eventoCadastroService.criarFightNight(body);
        return Map.of("idCard", id, "tipo", "CARD");
    }

    @PostMapping("/ppv")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> criarPpv(@Valid @RequestBody PpvCreateRequest body) {
        long id = eventoCadastroService.criarPpv(body);
        return Map.of("idCardPpv", id, "tipo", "PPV");
    }
}
