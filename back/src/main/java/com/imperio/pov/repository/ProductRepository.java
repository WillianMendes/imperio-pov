package com.imperio.pov.repository;

import com.imperio.pov.model.Product;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {

    Optional<Product> findByCode(Long code);
    Optional<Product> findByName(String name);

}
