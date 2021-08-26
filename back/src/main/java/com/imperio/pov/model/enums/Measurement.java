package com.imperio.pov.model.enums;

public enum Measurement {

    M2("Metros Quadrados"),
    M3("Metros Cubicos"),
    M("Metros"),
    KG("Quilos"),
    UN("Unidades");

    private final String name;

    Measurement(String name) {
        this.name = name;
    }
}
