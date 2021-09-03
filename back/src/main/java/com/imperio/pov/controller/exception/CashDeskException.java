package com.imperio.pov.controller.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class CashDeskException extends RuntimeException {

    public CashDeskException(String message) {
        super(message);
    }

    public CashDeskException(String message, Error error) {
        super(message, error);
    }
}
