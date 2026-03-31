package com.ufc.web;

import com.ufc.module.agenda.AgendaService;
import com.ufc.module.agenda.dto.EventoDetalheResponse;
import com.ufc.module.agenda.dto.ProximoEventoResponse;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/agenda")
public class AgendaController {

    private final AgendaService agendaService;

    public AgendaController(AgendaService agendaService) {
        this.agendaService = agendaService;
    }

    @GetMapping("/proximos")
    public List<ProximoEventoResponse> proximos() {
        return agendaService.listarProximos();
    }

    @GetMapping("/eventos/{tipo}/{id}")
    public ResponseEntity<EventoDetalheResponse> detalhe(@PathVariable String tipo, @PathVariable long id) {
        return agendaService.detalhe(tipo, id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
}
