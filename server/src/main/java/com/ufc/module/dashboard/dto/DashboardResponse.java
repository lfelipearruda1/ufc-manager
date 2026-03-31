package com.ufc.module.dashboard.dto;

import java.util.List;

public record DashboardResponse(
        long totalLutadores,
        long totalDivisoes,
        long totalCards,
        long totalCardPpv,
        long totalLutas,
        long lutasEmFightNight,
        long lutasEmPpv,
        List<NomeQuantidadeItem> lutadoresPorDivisao) {}
