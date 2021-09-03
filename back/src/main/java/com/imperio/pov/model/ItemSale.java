package com.imperio.pov.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class ItemSale implements Serializable {

    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(nullable = false)
    private Product product;

    @NotNull
    @Column(nullable = false)
    private Integer quantity;

    @NotNull
    @Column(nullable = false)
    private BigDecimal unitaryValue;

    @org.springframework.data.annotation.Transient
    private BigDecimal totalValue;

    public ItemSale(Product product, Integer quantity) {
        this.product = product;
        this.quantity = quantity;
        this.unitaryValue = product.getPriceSell();
        this.totalValue = getTotalValue();
    }

    public BigDecimal getTotalValue() {
        return unitaryValue.multiply(new BigDecimal(quantity));
    }
}
