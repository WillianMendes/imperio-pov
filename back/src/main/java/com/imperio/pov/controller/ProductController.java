package com.imperio.pov.controller;

import com.imperio.pov.controller.dto.ProductDto;
import com.imperio.pov.model.Product;
import com.imperio.pov.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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

    @GetMapping(params = {"page", "size"})
    public Page<ProductDto> findAll(@RequestParam(value = "page", required = false, defaultValue = "0") int page,
                                    @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        return service.findAll(page, size);
    }

    @GetMapping(value = "/search", params = "code")
    public ProductDto find(@RequestParam Long code) {
        return service.find(code);
    }

    @GetMapping(value = "/search", params = "term")
    public Page<ProductDto> findAllByName(@RequestParam String term,
                                          @RequestParam(value = "page", required = false, defaultValue = "0") int page,
                                          @RequestParam(value = "size", required = false, defaultValue = "10") int size) {
        return service.findAllByName(term, page, size);
    }

    @PostMapping(value = "/save")
    @ResponseStatus(HttpStatus.CREATED)
    public ProductDto register(@Valid @RequestBody Product product) {
        return service.register(product);
    }

}
