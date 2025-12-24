package com.axis.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Entity
@Table(name = "tb_reset_senha_tokens", schema = "core")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResetSenhaToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_token")
    private Long id;

    @Column(name = "id_usuario", nullable = false)
    private Long idUsuario;

    @Column(name = "token_hash", nullable = false, unique = true, length = 64)
    private String tokenHash;

    @Column(name = "data_criacao", nullable = false)
    private LocalDateTime dataCriacao;

    @Column(name = "data_expiracao", nullable = false)
    private LocalDateTime dataExpiracao;

    @Column(name = "data_utilizacao")
    private LocalDateTime dataUtilizacao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusToken status;

    @Column(name = "ip_requisicao", nullable = false, length = 45)
    private String ipRequisicao;

    @Column(name = "user_agent", columnDefinition = "TEXT")
    private String userAgent;

    @PrePersist
    protected void onCreate() {
        if (dataCriacao == null) {
            dataCriacao = LocalDateTime.now();
        }
        if (status == null) {
            status = StatusToken.ATIVO;
        }
    }
}
