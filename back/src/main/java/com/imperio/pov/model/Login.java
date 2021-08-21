package com.imperio.pov.model;

import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Data
public class Login {

    @NotBlank
    @Email
    private String email;

    @Length(min = 8)
    private String password;

}
