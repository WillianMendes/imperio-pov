package com.imperio.pov.controller.dto;

import com.imperio.pov.model.Admin;
import com.imperio.pov.model.enums.LevelAdmin;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serializable;

@Data
@AllArgsConstructor
public class AdminDto implements Serializable {

    private Long id;
    private String fullName;
    private String email;
    private String passwordEncoded;
    private LevelAdmin level;

    public Admin mapperToModel() {
        return new Admin(this.id, this.fullName, this.email, this.passwordEncoded, this.level);
    }

}
