package com.imperio.pov.model.enums;

public enum PaymentMethod {

    CREDIT_CARD("Cartão de Crédito"),
    DEBIT_CARD("Cartão de Debito"),
    CASH("Dinheiro");

    private final String name;

    PaymentMethod(String name) {
        this.name = name;
    }
}
