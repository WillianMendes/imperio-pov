package com.imperio.pov.controller.dto;

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
    private LevelAdmin level;

}
