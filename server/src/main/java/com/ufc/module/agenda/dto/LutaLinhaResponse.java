package com.ufc.module.agenda.dto;

public record LutaLinhaResponse(
        long idLuta,
        int ordemNoCard,
        String lutadorDesafiante,
        String lutadorDesafiado,
        String divisao,
        boolean cinturaoEmJogo,
        String tipoCinturao) {}
