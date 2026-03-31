package com.ufc.module.catalog.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public record PpvCreateRequest(
        @NotNull @Min(1) Integer numEdicao,
        @NotNull Double precoPpv,
        @NotNull Double receitaTotal,
        @NotNull @Min(0) Integer quantPagantes,
        @NotBlank String cidade,
        @NotBlank String pais,
        @NotNull LocalDate dataEvento,
        @NotNull @Min(1) Integer quantLutas) {}
