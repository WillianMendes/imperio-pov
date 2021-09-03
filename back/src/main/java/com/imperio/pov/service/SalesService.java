package com.imperio.pov.service;

import com.imperio.pov.controller.dto.SaleDto;
import com.imperio.pov.model.CashDesk;
import com.imperio.pov.model.Sale;
import com.imperio.pov.repository.SalesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class SalesService {

    private final SalesRepository repository;

    @Autowired
    public SalesService(SalesRepository repository) {
        this.repository = repository;
    }

    public List<SaleDto> listSalesByCashDesk(CashDesk cashDesk) {
        return repository.getAllByCashDesk(cashDesk).stream().map(Sale::mapperToDto).collect(Collectors.toList());
    }

}
