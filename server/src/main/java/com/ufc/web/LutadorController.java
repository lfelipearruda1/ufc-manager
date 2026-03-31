package com.ufc.web;

import com.ufc.module.catalog.LutadorCatalogService;
import com.ufc.module.catalog.dto.LutadorCreateRequest;
import com.ufc.module.catalog.dto.LutadorResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/lutadores")
public class LutadorController {

    private final LutadorCatalogService lutadorCatalogService;

    public LutadorController(LutadorCatalogService lutadorCatalogService) {
        this.lutadorCatalogService = lutadorCatalogService;
    }

    @GetMapping
    public List<LutadorResponse> listar(@RequestParam(required = false) Long divisaoId) {
        return lutadorCatalogService.listar(divisaoId);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public LutadorResponse criar(@Valid @RequestBody LutadorCreateRequest body) {
        return lutadorCatalogService.criar(body);
    }
}
