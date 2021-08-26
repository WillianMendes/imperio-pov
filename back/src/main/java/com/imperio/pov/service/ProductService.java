package com.imperio.pov.service;

import com.imperio.pov.controller.dto.ProductDto;
import com.imperio.pov.controller.exception.FieldDuplicateEntryException;
import com.imperio.pov.model.Product;
import com.imperio.pov.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository repository;

    @Autowired
    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public boolean nameIsExists(String name) {
        return repository.findByName(name).isPresent();
    }

    public ProductDto register(Product product) {
        product.setCode(null);

        if (nameIsExists(product.getName())) throw new FieldDuplicateEntryException("Já existe um produto registrado com esse nome.");

        return repository.save(product).mapperToDto();
    }

}
