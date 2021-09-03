package com.imperio.pov.service;

import com.imperio.pov.controller.dto.CashOperationDto;
import com.imperio.pov.model.CashDesk;
import com.imperio.pov.model.CashOperation;
import com.imperio.pov.repository.CashOperationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CashOperationService {

    private final CashOperationRepository repository;

    @Autowired
    public CashOperationService(CashOperationRepository repository) {
        this.repository = repository;
    }

    public List<CashOperationDto> listOperationsByCashDesk(CashDesk cashDesk) {
        return repository.getAllByCashDesk(cashDesk).stream().map(CashOperation::mapperToDto).collect(Collectors.toList());
    }

    public CashOperation save(CashOperation cashOperation) {
        return repository.save(cashOperation);
    }

}
