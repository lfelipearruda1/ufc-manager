package com.ufc.module.catalog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record LutadorCreateRequest(
        @NotBlank String nome,
        @NotNull Double peso,
        @NotBlank String apelido,
        @NotBlank String cartel,
        @NotBlank String nacionalidade,
        @NotNull Long idDivisao) {}
