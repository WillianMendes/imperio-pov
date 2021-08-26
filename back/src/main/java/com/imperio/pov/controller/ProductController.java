package com.imperio.pov.controller;

import com.imperio.pov.controller.dto.ProductDto;
import com.imperio.pov.model.Product;
import com.imperio.pov.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/product")
public class ProductController {

    private final ProductService service;

    @Autowired
    public ProductController(ProductService service) {
        this.service = service;
    }

    @GetMapping(value = "/search", params = "code")
    public ProductDto find(@RequestParam Long code) {
        return service.find(code);
    }

    @PostMapping(value = "/save")
    @ResponseStatus(HttpStatus.CREATED)
    public ProductDto register(@Valid @RequestBody Product product) {
        return service.register(product);
    }

}
