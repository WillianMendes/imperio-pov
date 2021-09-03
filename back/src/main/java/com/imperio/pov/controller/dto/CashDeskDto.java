package com.imperio.pov.controller.dto;

import com.imperio.pov.model.CashDesk;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class CashDeskDto {

    private Long id;
    private AdminDto operator;
    private LocalDateTime open;
    private LocalDateTime closed;
    private List<SaleDto> sales;
    private List<CashOperationDto> operations;

    public CashDeskDto(CashDesk cashDesk, List<SaleDto> sales, List<CashOperationDto> operations) {
        this.id = cashDesk.getId();
        this.operator = cashDesk.getOperator().mapperToDto();
        this.open = cashDesk.getOpen();
        this.closed = cashDesk.getClosed();
        this.sales = sales;
        this.operations = operations;
    }
}
