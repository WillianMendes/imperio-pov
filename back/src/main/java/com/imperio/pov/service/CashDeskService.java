package com.imperio.pov.service;

import com.imperio.pov.controller.dto.*;
import com.imperio.pov.controller.exception.CashDeskException;
import com.imperio.pov.controller.exception.ResourceNotFoundException;
import com.imperio.pov.model.Admin;
import com.imperio.pov.model.CashDesk;
import com.imperio.pov.model.CashOperation;
import com.imperio.pov.repository.CashDeskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CashDeskService {

    private final CashDeskRepository repository;
    private final AdminService adminService;
    private final CashOperationService operationService;
    private final SalesService salesService;

    @Autowired
    public CashDeskService(
            CashDeskRepository repository, AdminService adminService, CashOperationService operationService, SalesService salesService
    ) {
        this.repository = repository;
        this.adminService = adminService;
        this.operationService = operationService;
        this.salesService = salesService;
    }

    public CashDeskDto getCashDeskOpened(AdminDto dto) {
        AdminDto adminDto = adminService.authentication(dto.getEmail(), dto.getPasswordEncoded());
        Admin admin = adminDto.mapperToModel();

        if (!isCashDeskOpenedWithOperator(admin)) {
            throw new ResourceNotFoundException("Nenhum caixa ativo foi encontrado em seu nome.");
        }

        CashDesk cashDesk = repository.findAllByOperatorAndClosed(admin, null).get(0);
        List<SaleDto> sales = salesService.listSalesByCashDesk(cashDesk);
        List<CashOperationDto> operations = operationService.listOperationsByCashDesk(cashDesk);

        return new CashDeskDto(cashDesk, sales, operations);
    }

    public CashDesk openCashDesk(OpenCashDeskDto data) {
        AdminDto adminDto = adminService.authentication(data.getOperator().getEmail(), data.getOperator().getPasswordEncoded());
        Admin admin = adminDto.mapperToModel();

        if (isCashDeskOpenedWithOperator(admin)) {
            throw new CashDeskException("Já existe um caixa ativo em seu nome.");
        }

        CashDesk cashDesk = repository.save(new CashDesk(admin));

        CashOperation cashOperation = data.getInitialOperation();
        cashOperation.setCashDesk(cashDesk);
        operationService.save(cashOperation);

        return cashDesk;
    }

    public boolean isCashDeskOpenedWithOperator(Admin operator) {
        return !repository.findAllByOperatorAndClosed(operator, null).isEmpty();
    }

    public void closedCashDesk(Long id) {

    }

}
