package com.imperio.pov.controller.dto;

import com.imperio.pov.model.enums.CashTypeOperation;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class CashOperationDto implements Serializable {

    private Long id;
    private String description;
    private BigDecimal value;
    private CashTypeOperation operation;

}
