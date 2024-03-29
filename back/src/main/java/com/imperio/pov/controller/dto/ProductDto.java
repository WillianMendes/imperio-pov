package com.imperio.pov.controller.dto;

import com.imperio.pov.model.Product;
import com.imperio.pov.model.enums.Measurement;
import lombok.AllArgsConstructor;
import lombok.Data;

import javax.validation.constraints.Null;
import java.io.Serializable;
import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class ProductDto implements Serializable {

    @Null
    private Long code;
    private String name;
    private BigDecimal priceCost;
    private BigDecimal priceSell;
    private Integer quantity;
    private Measurement measurement;
    private Boolean isOnDemand;

    public Product mapperToModel() {
        return new Product(this.code, this.name, this.priceCost, this.priceSell, this.quantity, this.measurement, this.isOnDemand);
    }

}
