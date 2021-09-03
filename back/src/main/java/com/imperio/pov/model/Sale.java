package com.imperio.pov.model;

import com.imperio.pov.controller.dto.SaleDto;
import com.imperio.pov.model.enums.PaymentMethod;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.ReadOnlyProperty;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Sale implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ToString.Exclude
    @NotNull
    @OneToMany
    @Column
    private List<ItemSale> items;

    @NotNull
    @Column(nullable = false)
    private BigDecimal totalValue;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private PaymentMethod paymentMethod;

    @NotNull
    @ReadOnlyProperty
    @Column(nullable = false, updatable = false)
    private LocalDateTime created;

    @ManyToOne
    @JoinColumn
    private CashDesk cashDesk;

    public Sale(List<ItemSale> items, PaymentMethod paymentMethod, CashDesk cashDesk) {
        BigDecimal totalItemsValue = new BigDecimal(0);
        for (ItemSale item: items) totalItemsValue = totalItemsValue.add(item.getTotalValue());

        this.items = items;
        this.totalValue = totalItemsValue;
        this.paymentMethod = paymentMethod;
        this.created = LocalDateTime.now();
        this.cashDesk = cashDesk;
    }

    public SaleDto mapperToDto() {
        return new SaleDto(this.id, this.items, this.totalValue, this.paymentMethod, this.created);
    }
}
