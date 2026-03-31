package com.ufc.module.agenda.dto;

import java.util.List;

public record EventoDetalheResponse(
        String tipo,
        long id,
        String titulo,
        String cidade,
        String pais,
        String dataEvento,
        int quantLutas,
        List<LutaLinhaResponse> lutas) {}
