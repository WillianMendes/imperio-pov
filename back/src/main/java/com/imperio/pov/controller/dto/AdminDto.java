package com.imperio.pov.controller.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.imperio.pov.model.Admin;
import com.imperio.pov.model.enums.LevelAdmin;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import org.springframework.data.annotation.ReadOnlyProperty;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
public class AdminDto implements Serializable {

    @ReadOnlyProperty
    private Long id;

    @NotBlank(message = "O campo nome é obrigatório.")
    private String fullName;

    @NotBlank(message = "O campo e-mail é obrigatório.")
    @Email(message = "O e-mail informado é inválido.")
    private String email;

    @JsonIgnore()
    @Length(min = 8, message = "A senha deve ter mais de 8 caracteres.")
    private String password;

    @NotNull(message = "O campo level é obrigatório.")
    @Enumerated(EnumType.STRING)
    private LevelAdmin level;

    public Admin mapperToModel() {
        Admin model = new Admin();
        model.setId(this.id);
        model.setFullName(this.fullName);
        model.setEmail(this.email);
        model.setPassword(this.password);
        model.setLevel(this.level);
        return model;
    }

}
