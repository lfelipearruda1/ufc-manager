package com.ufc.module.home.dto;

public record HomeSummaryResponse(
        boolean apiOnline,
        long totalLutadores,
        long totalCards,
        long totalCardsPpv,
        UltimoEventoResumo ultimoEvento) {}
