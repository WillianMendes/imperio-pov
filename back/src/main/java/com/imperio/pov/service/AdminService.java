package com.imperio.pov.service;

import com.imperio.pov.controller.dto.AdminDto;
import com.imperio.pov.controller.exception.FieldDuplicateEntryException;
import com.imperio.pov.controller.exception.ResourceNotFoundException;
import com.imperio.pov.model.Admin;
import com.imperio.pov.model.Token;
import com.imperio.pov.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AdminService {

    private final AdminRepository repository;

    @Autowired
    public AdminService(AdminRepository repository) {
        this.repository = repository;
    }

    public Admin find(String email) {
        Optional<Admin> admin = repository.findByEmail(email);
        if (admin.isEmpty()) throw new ResourceNotFoundException("Não existe nenhum administrador cadastrado com esse e-mail.");
        return admin.get();
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

        if (fullNameIsExists(admin.getFullName())) {
            throw new FieldDuplicateEntryException("Já existe um operador registrado com esse nome.");
        }

        if (emailIsExists(admin.getEmail())) {
            throw new FieldDuplicateEntryException("Já existe um operador registrado com esse e-mail.");
        }

        return repository.save(admin).mapperToDto();
    }

    public boolean updatePassword(String email, String newPassword) {
        Admin admin = find(email);
        admin.setPassword(newPassword);
        repository.save(admin);
        return true;
    }

    public boolean sendMailRecoveryPassword(String email) {
        String mail = find(email).getEmail();
        System.out.println("E-mail enviado! --Implementar futuramente!");
        return true;
    }

    public boolean verifyTokenRecoveryPassword(String token, String email) {
        Optional<Admin> admin = repository.findByEmail(email);
        System.out.println("Token verificado! --Implementar futuramente!");
        return admin.isPresent();
    }

    public boolean changePassword(Token token) {
        boolean tokenIsValid = verifyTokenRecoveryPassword(token.getToken(), token.getEmail());

        if (!tokenIsValid) return false;

        return updatePassword(token.getEmail(), token.getPassword());
    }

}
