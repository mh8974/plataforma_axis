package com.axis.repository;

import com.axis.model.ResetSenhaToken;
import com.axis.model.StatusToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;


@Repository
public interface ResetSenhaTokenRepository extends JpaRepository<ResetSenhaToken, Long> {

    
    Optional<ResetSenhaToken> findByTokenHashAndStatus(String tokenHash, StatusToken status);

    
    @Query("SELECT COUNT(t) FROM ResetSenhaToken t WHERE t.idUsuario = :idUsuario " +
           "AND t.dataCriacao > :dataLimite")
    int countRecentTokensByUsuario(@Param("idUsuario") Long idUsuario,
                                    @Param("dataLimite") LocalDateTime dataLimite);

    
    @Query("SELECT COUNT(t) FROM ResetSenhaToken t WHERE t.ipRequisicao = :ip " +
           "AND t.dataCriacao > :dataLimite")
    int countRecentTokensByIp(@Param("ip") String ip,
                               @Param("dataLimite") LocalDateTime dataLimite);

    
    List<ResetSenhaToken> findByDataCriacaoBefore(LocalDateTime data);

    
    List<ResetSenhaToken> findByIdUsuario(Long idUsuario);
}
