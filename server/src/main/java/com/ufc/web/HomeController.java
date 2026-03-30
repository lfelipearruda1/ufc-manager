package com.ufc.web;

import com.ufc.module.home.HomeSummaryService;
import com.ufc.module.home.dto.HomeSummaryResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/home")
public class HomeController {

    private final HomeSummaryService homeSummaryService;

    public HomeController(HomeSummaryService homeSummaryService) {
        this.homeSummaryService = homeSummaryService;
    }

    @GetMapping("/summary")
    public HomeSummaryResponse summary() {
        return homeSummaryService.buildSummary();
    }
}
