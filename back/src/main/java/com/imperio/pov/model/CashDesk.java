package com.imperio.pov.model;

import com.imperio.pov.controller.dto.CashDeskDto;
import com.imperio.pov.controller.dto.CashOperationDto;
import com.imperio.pov.controller.dto.SaleDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CashDesk implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(nullable = false)
    private Admin operator;

    @NotNull
    @Column(nullable = false)
    private LocalDateTime open;

    @Column
    private LocalDateTime closed;

    public CashDesk(Admin operator) {
        this.operator = operator;
        this.open = LocalDateTime.now();
    }

    public CashDeskDto mapperToDto(List<SaleDto> sales, List<CashOperationDto> operations) {
        return new CashDeskDto(this, sales, operations);
    }

    public CashDeskDto mapperToDto() {
        return new CashDeskDto(this);
    }
}
