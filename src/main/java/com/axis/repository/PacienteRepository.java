package com.axis.repository;

import com.axis.model.Paciente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PacienteRepository extends JpaRepository<Paciente, Long>, JpaSpecificationExecutor<Paciente> {

    
    boolean existsByUsuarioId(Long usuarioId);

    
    Optional<Paciente> findByUsuarioId(Long usuarioId);

    
    @Query("SELECT COUNT(p) FROM Paciente p")
    Long contarTotalPacientes();

    
    @Query("SELECT p.localizacao, COUNT(p) FROM Paciente p " +
           "WHERE p.localizacao IS NOT NULL " +
           "GROUP BY p.localizacao " +
           "ORDER BY COUNT(p) DESC")
    List<Object[]> contarPorLocalizacao();

    
    @Query("SELECT p.problemaPrincipal, COUNT(p) FROM Paciente p " +
           "WHERE p.problemaPrincipal IS NOT NULL " +
           "GROUP BY p.problemaPrincipal " +
           "ORDER BY COUNT(p) DESC")
    List<Object[]> contarPorProblemaPrincipal();
}