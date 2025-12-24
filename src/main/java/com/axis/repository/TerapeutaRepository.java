package com.axis.repository;

import com.axis.model.StatusCadastro;
import com.axis.model.Terapeuta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TerapeutaRepository extends JpaRepository<Terapeuta, Long>, JpaSpecificationExecutor<Terapeuta> {

    
    Optional<Terapeuta> findByCrp(String crp);

    
    Optional<Terapeuta> findByCpf(String cpf);

    
    List<Terapeuta> findByStatusCadastro(StatusCadastro statusCadastro);

    
    boolean existsByUsuarioId(Long usuarioId);

    
    Optional<Terapeuta> findByUsuarioId(Long usuarioId);
}