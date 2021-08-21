package com.imperio.pov.controller.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_ACCEPTABLE)
public class FieldDuplicateEntryException extends RuntimeException {

    public FieldDuplicateEntryException(String message) {
        super(message);
    }

    public FieldDuplicateEntryException(String message, Error error) {
        super(message, error);
    }

}
