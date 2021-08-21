package com.imperio.pov.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
public class Token implements Serializable {

    @Id
    @GeneratedValue
    private String token;

    @Column(nullable = false)
    private String email;

    @Transient
    private String password;

}
