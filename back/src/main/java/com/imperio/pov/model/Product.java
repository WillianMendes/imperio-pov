package com.imperio.pov.model;

import com.imperio.pov.controller.dto.AdminDto;
import com.imperio.pov.controller.dto.ProductDto;
import com.imperio.pov.model.enums.Measurement;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.math.BigDecimal;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Product implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long code;

    @NotBlank(message = "O campo nome é obrigatório.")
    @Column(unique = true, nullable = false)
    private String name;

    @NotNull(message = "O campo preço de custo é obrigatório.")
    @Column(nullable = false)
    private BigDecimal priceCost;

    @NotNull(message = "O campo preço de venda é obrigatório.")
    @Column(nullable = false)
    private BigDecimal priceSell;

    @NotNull(message = "O campo estoque é obrigatório.")
    @Column(nullable = false)
    private Integer quantity;

    @NotNull(message = "O campo medida é obrigatório.")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Measurement measurement;

    @NotNull(message = "O campo sob demanda é obrigatório.")
    @Column(nullable = false)
    private Boolean isOnDemand;

    public ProductDto mapperToDto() {
        return new ProductDto(
            this.code, this.name, this.priceCost, this.priceSell, this.quantity, this.measurement, this.isOnDemand
        );
    }
}
