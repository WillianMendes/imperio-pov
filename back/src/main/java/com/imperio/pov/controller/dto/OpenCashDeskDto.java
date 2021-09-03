package com.imperio.pov.controller.dto;

import com.imperio.pov.model.CashOperation;
import lombok.Data;

import java.io.Serializable;

@Data
public class OpenCashDeskDto implements Serializable {

    private AdminDto operator;
    private CashOperation initialOperation;

}
