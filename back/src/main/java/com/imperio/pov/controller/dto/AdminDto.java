package com.imperio.pov.controller.dto;

import com.imperio.pov.model.Admin;
import com.imperio.pov.model.enums.LevelAdmin;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.io.Serializable;

@Data
public class AdminDto implements Serializable {

    @NotBlank
    private Long id;

    @NotBlank
    private String fullName;

    @Email
    private String email;

    @Min(value = 8)
    private String password;

    @NotBlank
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
