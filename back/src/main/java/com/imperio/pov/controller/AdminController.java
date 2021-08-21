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

    @GetMapping(value = "/send-mail-recovery-password/{email}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Boolean> sendMailRecoveryPassword(@Valid @PathVariable String email) {
        boolean isSend = service.sendMailRecoveryPassword(email);
        return ResponseEntity.ok(isSend);
    }

    @GetMapping(value = "/verify-token-recovery-password/{token}/{email}")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Boolean> verifyTokenRecoveryPassword(@Valid @PathVariable String token, @Valid @PathVariable String email) {
        boolean tokenIsValid = service.verifyTokenRecoveryPassword(token, email);
        return ResponseEntity.ok(tokenIsValid);
    }

    @PutMapping(value = "/change-password")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<Boolean> changePassword(@RequestBody Token token) {
        boolean passwordIsValid = service.changePassword(token);
        return ResponseEntity.ok(passwordIsValid);
    }

}
