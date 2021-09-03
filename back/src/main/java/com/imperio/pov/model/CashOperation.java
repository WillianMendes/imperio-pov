package com.imperio.pov.model;

import com.imperio.pov.controller.dto.CashOperationDto;
import com.imperio.pov.model.enums.CashTypeOperation;
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
public class CashOperation implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String description;

    @NotNull
    @Column(nullable = false)
    private BigDecimal value;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CashTypeOperation operation;

    @ManyToOne
    @JoinColumn(nullable = false)
    private CashDesk cashDesk;

    public CashOperation(String description, BigDecimal value, CashTypeOperation operation, CashDesk cashDesk) {
        this.description = description;
        this.value = value;
        this.operation = operation;
        this.cashDesk = cashDesk;
    }

    public CashOperationDto mapperToDto() {
        return new CashOperationDto(this.id, this.description, this.value, this.operation);
    }

}
