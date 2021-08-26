package com.imperio.pov.repository;

import com.imperio.pov.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProductRepository extends PagingAndSortingRepository<Product, Long> {

    @Query("FROM Product p WHERE LOWER(p.name) like %:searchTerm% ")
    Page<Product> findAllByNameContaining(@Param("searchTerm") String name, Pageable pageable);

    Optional<Product> findByCode(Long code);
    Optional<Product> findByName(String name);

}
