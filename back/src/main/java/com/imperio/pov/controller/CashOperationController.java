package com.imperio.pov.controller;

import com.imperio.pov.model.CashOperation;
import com.imperio.pov.service.CashOperationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/cash-desk/operation")
public class CashOperationController {

    @Autowired
    private CashOperationService service;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public void createOperation(@Valid @RequestBody CashOperation cashOperation) {
        System.out.println("CAI AQUI MANO LOUCO DOIDAO");
        service.save(cashOperation);
    }
}
