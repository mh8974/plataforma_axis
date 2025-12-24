package com.axis.repository;

import com.axis.model.Cep;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface CepRepository extends JpaRepository<Cep, Long> {

    
    Optional<Cep> findByNrCep(String nrCep);

    
    boolean existsByNrCep(String nrCep);
}
