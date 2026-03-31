package com.ufc.module.catalog.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DivisaoCreateRequest(
        @NotBlank(message = "nomeDivisao é obrigatório") String nomeDivisao,
        @NotNull Double pesoMin,
        @NotNull Double pesoMax) {}
