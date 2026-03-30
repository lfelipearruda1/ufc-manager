package com.ufc.module.home.dto;

public record UltimoEventoResumo(
        String tipo,
        long id,
        String cidade,
        String pais,
        String dataEvento) {}
