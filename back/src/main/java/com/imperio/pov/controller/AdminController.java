package com.imperio.pov.controller;

import com.imperio.pov.controller.dto.AdminDto;
import com.imperio.pov.model.Admin;
import com.imperio.pov.model.Token;
import com.imperio.pov.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@RestController
@RequestMapping(value = "/admin")
public class AdminController {

    private final AdminService service;

    @Autowired
    public AdminController(AdminService service) {
        this.service = service;
    }

    @PostMapping("/save")
    @ResponseStatus(HttpStatus.CREATED)
    public AdminDto registerAdmin(@Valid @RequestBody Admin admin) {
        return service.register(admin);
    }

    @PutMapping(value = "/change-password")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Boolean> changePassword(@RequestBody Token token) {
        boolean passwordIsValid = service.changePassword(token);
        return ResponseEntity.ok(passwordIsValid);
    }

    @GetMapping(value = "/send-mail-recovery-password", params = "email")
    @ResponseStatus(HttpStatus.OK)
    public void sendMailRecoveryPassword(@RequestParam String email) {
        service.sendMailRecoveryPassword(email);
    }

    @GetMapping(value = "/verify-token-recovery-password", params = {"token", "email"})
    @ResponseStatus(HttpStatus.OK)
    public boolean verifyTokenRecoveryPassword(@RequestParam String token, @RequestParam String email) {
        return service.verifyTokenRecoveryPassword(token, email);
    }

}
