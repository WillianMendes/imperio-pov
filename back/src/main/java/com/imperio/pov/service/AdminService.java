package com.imperio.pov.service;

import com.imperio.pov.controller.dto.AdminDto;
import com.imperio.pov.controller.exception.AuthenticationException;
import com.imperio.pov.controller.exception.FieldDuplicateEntryException;
import com.imperio.pov.controller.exception.ResourceNotFoundException;
import com.imperio.pov.controller.exception.TokenException;
import com.imperio.pov.model.Admin;
import com.imperio.pov.model.Token;
import com.imperio.pov.model.enums.LevelAdmin;
import com.imperio.pov.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository repository;
    private final PasswordEncoder encoder;

    @Autowired
    public AdminService(AdminRepository repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

    public Admin find(String email) {
        Optional<Admin> admin = repository.findByEmail(email);
        if (admin.isEmpty()) throw new ResourceNotFoundException("Não existe nenhum administrador cadastrado com esse e-mail.");
        return admin.get();
    }

    public AdminDto authentication(String email, String password) {
        Optional<Admin> adminOrEmpty = repository.findByEmail(email);
        if (adminOrEmpty.isEmpty()) throw new ResourceNotFoundException("Não existe nenhum administrador cadastrado com esse e-mail.");

        Admin admin = adminOrEmpty.get();
        boolean isAuthenticated = encoder.matches(password, admin.getPassword());

        if (!isAuthenticated) throw new AuthenticationException("Senha incorreta!");

        return admin.mapperToDto();
    }

    public boolean fullNameIsExists(String fullName) {
        Optional<Admin> adminOrNull = repository.findByFullName(fullName);
        return adminOrNull.isPresent();
    }

    public boolean emailIsExists(String email) {
        Optional<Admin> adminOrNull = repository.findByEmail(email);
        return adminOrNull.isPresent();
    }

    public AdminDto register(Admin admin) {
        admin.setId(null);
        admin.setLevel(LevelAdmin.Operador);

        if (fullNameIsExists(admin.getFullName())) {
            throw new FieldDuplicateEntryException("Já existe um operador registrado com esse nome.");
        }

        if (emailIsExists(admin.getEmail())) {
            throw new FieldDuplicateEntryException("Já existe um operador registrado com esse e-mail.");
        }

        admin.setPassword(encoder.encode(admin.getPassword()));
        return repository.save(admin).mapperToDto();
    }

    public void updatePassword(String email, String newPassword) {
        Admin admin = find(email);
        admin.setPassword(encoder.encode(newPassword));
        repository.save(admin);
    }

    public void sendMailRecoveryPassword(String email) {
        if (!emailIsExists(email)) throw new ResourceNotFoundException("O e-mail informado não pertence a nenhum operador do sistema.");
        // logica para enviar email
        System.out.println("E-mail enviado! --Implementar futuramente!");
    }

    public boolean verifyTokenRecoveryPassword(String token, String email) {
        if (!emailIsExists(email)) throw new ResourceNotFoundException("Não existe nenhum administrador cadastrado com esse e-mail.");
        // Verifica se o token pertence ao email informado e não expirou (return false)
        System.out.println("Token verificado! --Implementar futuramente!");
        return true;
    }

    public void changePassword(Token token) {
        boolean tokenIsValid = verifyTokenRecoveryPassword(token.getToken(), token.getEmail());

        if (!tokenIsValid) throw new TokenException("Token inválido");

        updatePassword(token.getEmail(), token.getPassword());
    }

}
