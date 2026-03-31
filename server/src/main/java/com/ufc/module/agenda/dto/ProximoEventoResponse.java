package com.ufc.module.agenda.dto;

public record ProximoEventoResponse(
        String tipo, long id, String titulo, String cidade, String pais, String dataEvento, int quantLutas) {}
