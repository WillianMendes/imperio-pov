package com.imperio.pov.repository;

import com.imperio.pov.model.CashDesk;
import com.imperio.pov.model.Sale;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SalesRepository extends CrudRepository<Sale, Long> {

    List<Sale> getAllByCashDesk(CashDesk cashDesk);

}
