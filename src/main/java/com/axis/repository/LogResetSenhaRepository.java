package com.axis.repository;

import com.axis.model.AcaoResetSenha;
import com.axis.model.LogResetSenha;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;


@Repository
public interface LogResetSenhaRepository extends JpaRepository<LogResetSenha, Long> {

    
    List<LogResetSenha> findByIdUsuarioOrderByDataHoraDesc(Long idUsuario);

    
    List<LogResetSenha> findByEmailTentativaOrderByDataHoraDesc(String emailTentativa);

    
    List<LogResetSenha> findByIpOrigemOrderByDataHoraDesc(String ipOrigem);

    
    @Query("SELECT COUNT(l) FROM LogResetSenha l WHERE l.idUsuario = :idUsuario " +
           "AND l.sucesso = false AND l.dataHora > :dataLimite")
    int countFailedAttemptsByUsuario(@Param("idUsuario") Long idUsuario,
                                      @Param("dataLimite") LocalDateTime dataLimite);

    
    @Query("SELECT COUNT(l) FROM LogResetSenha l WHERE l.ipOrigem = :ip " +
           "AND l.dataHora > :dataLimite")
    int countAttemptsByIp(@Param("ip") String ip,
                          @Param("dataLimite") LocalDateTime dataLimite);

    
    List<LogResetSenha> findByAcaoOrderByDataHoraDesc(AcaoResetSenha acao);

    
    List<LogResetSenha> findByDataHoraBefore(LocalDateTime data);
}
