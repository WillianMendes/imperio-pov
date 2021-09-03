package com.imperio.pov.repository;

import com.imperio.pov.model.CashDesk;
import com.imperio.pov.model.CashOperation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CashOperationRepository extends CrudRepository<CashOperation, Long> {

    List<CashOperation> getAllByCashDesk(CashDesk cashDesk);


}
