package com.imperio.pov.service;

import com.imperio.pov.controller.dto.ProductDto;
import com.imperio.pov.controller.exception.FieldDuplicateEntryException;
import com.imperio.pov.controller.exception.ResourceNotFoundException;
import com.imperio.pov.model.Product;
import com.imperio.pov.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository repository;

    @Autowired
    public ProductService(ProductRepository repository) {
        this.repository = repository;
    }

    public Page<ProductDto> findAll(Integer page, Integer size) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.Direction.ASC, "name");
        return repository.findAll(pageRequest).map(Product::mapperToDto);
    }

    public ProductDto find(Long code) {
        Optional<Product> productOrNull = repository.findByCode(code);
        if (productOrNull.isEmpty()) throw new ResourceNotFoundException("Produto não encontrado.");
        return productOrNull.get().mapperToDto();
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
