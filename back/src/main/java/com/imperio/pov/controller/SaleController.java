package com.imperio.pov.controller;

import com.imperio.pov.controller.dto.SaleDto;
import com.imperio.pov.service.SalesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/sale")
public class SaleController {

    private final SalesService service;

    @Autowired
    public SaleController(SalesService service) {
        this.service = service;
    }

    @PostMapping(value = "/new-sale", params = "cashDeskId")
    @ResponseStatus(HttpStatus.CREATED)
    public SaleDto save(@Valid @RequestBody SaleDto sale, @RequestParam Long cashDeskId) {
        return service.register(sale, cashDeskId);
    }

}
