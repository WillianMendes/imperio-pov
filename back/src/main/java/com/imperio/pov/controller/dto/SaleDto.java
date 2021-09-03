package com.imperio.pov.controller.dto;

import com.imperio.pov.model.ItemSale;
import com.imperio.pov.model.enums.PaymentMethod;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class SaleDto implements Serializable {

    private Long id;
    private List<ItemSale> items;
    private BigDecimal totalValue;
    private PaymentMethod paymentMethod;
    private LocalDateTime created;

}
