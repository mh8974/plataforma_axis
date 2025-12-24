package com.axis.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Entity
@Table(name = "tb_log_reset_senha", schema = "core")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LogResetSenha {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_log")
    private Long id;

    @Column(name = "id_usuario")
    private Long idUsuario;

    @Column(name = "email_tentativa", nullable = false)
    private String emailTentativa;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private AcaoResetSenha acao;

    @Column(nullable = false)
    private Boolean sucesso;

    @Column(name = "mensagem_erro", columnDefinition = "TEXT")
    private String mensagemErro;

    @Column(name = "data_hora", nullable = false)
    private LocalDateTime dataHora;

    @Column(name = "ip_origem", nullable = false, length = 45)
    private String ipOrigem;

    @Column(name = "user_agent", columnDefinition = "TEXT")
    private String userAgent;

    @Column(length = 2)
    private String pais;

    @Column(name = "token_hash", length = 64)
    private String tokenHash;

    @Column(name = "tentativas_consecutivas")
    private Integer tentativasConsecutivas;

    @PrePersist
    protected void onCreate() {
        if (dataHora == null) {
            dataHora = LocalDateTime.now();
        }
        if (tentativasConsecutivas == null) {
            tentativasConsecutivas = 1;
        }
    }
}
