package com.imperio.pov.repository;

import com.imperio.pov.model.Admin;
import com.imperio.pov.model.CashDesk;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CashDeskRepository extends CrudRepository<CashDesk, Long> {

    List<CashDesk> findAllByOperatorAndClosed(Admin admin, LocalDateTime closed);

}
