package com.imperio.pov.controller;

import com.imperio.pov.controller.dto.AdminDto;
import com.imperio.pov.controller.dto.CashDeskDto;
import com.imperio.pov.controller.dto.OpenCashDeskDto;
import com.imperio.pov.model.CashDesk;
import com.imperio.pov.model.Login;
import com.imperio.pov.service.CashDeskService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/cash-desk")
public class CashDeskController {

    private final CashDeskService service;

    public CashDeskController(CashDeskService service) {
        this.service = service;
    }

    @PostMapping(value = "/")
    @ResponseStatus(HttpStatus.OK)
    public CashDeskDto findCashDeskOpen(@Valid @RequestBody AdminDto adminDto) {
        return service.getCashDeskOpened(adminDto);
    }

    @PostMapping(value = "/open")
    @ResponseStatus(HttpStatus.CREATED)
    public CashDesk createCashDesk(@Valid @RequestBody OpenCashDeskDto data) {
        return service.openCashDesk(data);
    }

}
