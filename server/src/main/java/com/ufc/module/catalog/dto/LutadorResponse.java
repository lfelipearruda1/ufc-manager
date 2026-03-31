package com.ufc.module.catalog.dto;

public record LutadorResponse(
        long id,
        String nome,
        double peso,
        String apelido,
        String cartel,
        String nacionalidade,
        long idDivisao,
        String nomeDivisao) {}
