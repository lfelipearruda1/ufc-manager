package com.ufc.web;

import com.ufc.module.catalog.DivisaoCatalogService;
import com.ufc.module.catalog.dto.DivisaoCreateRequest;
import com.ufc.module.catalog.dto.DivisaoResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/divisoes")
public class DivisaoController {

    private final DivisaoCatalogService divisaoCatalogService;

    public DivisaoController(DivisaoCatalogService divisaoCatalogService) {
        this.divisaoCatalogService = divisaoCatalogService;
    }

    @GetMapping
    public List<DivisaoResponse> listar() {
        return divisaoCatalogService.listar();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public DivisaoResponse criar(@Valid @RequestBody DivisaoCreateRequest body) {
        return divisaoCatalogService.criar(body);
    }
}
