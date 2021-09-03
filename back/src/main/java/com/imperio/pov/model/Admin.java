package com.imperio.pov.model;

import com.imperio.pov.controller.dto.AdminDto;
import com.imperio.pov.model.enums.LevelAdmin;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Entity
@Getter
@Setter
@ToString
@AllArgsConstructor
@NoArgsConstructor
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;

    @NotBlank(message = "O campo nome é obrigatório.")
    @Column(unique = true, nullable = false)
    private String fullName;

    @NotBlank(message = "O campo e-mail é obrigatório.")
    @Email(message = "O e-mail informado é inválido.")
    @Column(unique = true, nullable = false)
    private String email;

    @Length(min = 8, message = "A senha deve ter mais de 8 caracteres.")
    @Column(nullable = false)
    private String password;

    @Enumerated(EnumType.STRING)
    @Column
    private LevelAdmin level;

    public AdminDto mapperToDto() {
        return new AdminDto(this.id, this.fullName, this.email, this.password, this.level);
    }

}
