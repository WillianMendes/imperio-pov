package com.imperio.pov.model;

import com.imperio.pov.controller.dto.AdminDto;
import com.imperio.pov.model.enums.LevelAdmin;
import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;

    @Column(unique = true, nullable = false)
    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LevelAdmin level;

    public AdminDto mapperToDto() {
        AdminDto dto = new AdminDto();
        dto.setId(this.id);
        dto.setFullName(this.fullName);
        dto.setEmail(this.email);
        dto.setPassword(this.password);
        dto.setLevel(this.level);
        return dto;
    }

}
