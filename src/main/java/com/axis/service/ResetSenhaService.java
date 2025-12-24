package com.axis.service;

import com.axis.dto.*;
import com.axis.model.*;
import com.axis.repository.*;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.UUID;


@Service
@Slf4j
public class ResetSenhaService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private ResetSenhaTokenRepository tokenRepository;

    @Autowired
    private LogResetSenhaRepository logRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${app.reset-senha.token-expiration-minutes}")
    private int tokenExpirationMinutes;

    @Value("${app.reset-senha.max-attempts-per-user-per-hour}")
    private int maxAttemptsPerUser;

    @Value("${app.reset-senha.max-attempts-per-ip-per-hour}")
    private int maxAttemptsPerIp;

    @Value("${app.reset-senha.frontend-url}")
    private String frontendUrl;

    
    @Transactional
    public void solicitarResetSenha(ResetSenhaRequestDTO request, String ipOrigem, String userAgent) {

        String email = request.getEmail().toLowerCase().trim();

        log.info("Solicitação de reset de senha para email: {} (IP: {})", email, ipOrigem);

        
        LogResetSenha auditLog = LogResetSenha.builder()
                .emailTentativa(email)
                .acao(AcaoResetSenha.SOLICITACAO)
                .dataHora(LocalDateTime.now())
                .ipOrigem(ipOrigem)
                .userAgent(userAgent)
                .build();

        try {
            
            if (verificarRateLimitIp(ipOrigem)) {
                auditLog.setSucesso(false);
                auditLog.setMensagemErro("Rate limit atingido para IP: " + ipOrigem);
                logRepository.save(auditLog);

                log.warn("Rate limit atingido para IP: {}", ipOrigem);
                
                return;
            }

            
            Usuario usuario = usuarioRepository.findByEmail(email).orElse(null);

            if (usuario == null) {
                
                auditLog.setSucesso(false);
                auditLog.setMensagemErro("Email não cadastrado: " + email);
                logRepository.save(auditLog);

                log.warn("Tentativa de reset para email não cadastrado: {}", email);
                
                return;
            }

            auditLog.setIdUsuario(usuario.getId());

            
            if (verificarRateLimitUsuario(usuario.getId())) {
                auditLog.setSucesso(false);
                auditLog.setMensagemErro("Rate limit atingido para usuário ID: " + usuario.getId());
                logRepository.save(auditLog);

                log.warn("Rate limit atingido para usuário ID: {}", usuario.getId());
                
                return;
            }

            
            String tokenPlainText = gerarTokenSeguro();
            String tokenHash = hashToken(tokenPlainText);

            
            ResetSenhaToken token = ResetSenhaToken.builder()
                    .idUsuario(usuario.getId())
                    .tokenHash(tokenHash)
                    .dataCriacao(LocalDateTime.now())
                    .dataExpiracao(LocalDateTime.now().plusMinutes(tokenExpirationMinutes))
                    .status(StatusToken.ATIVO)
                    .ipRequisicao(ipOrigem)
                    .userAgent(userAgent)
                    .build();

            tokenRepository.save(token);

            
            try {
                emailService.enviarEmailResetSenha(
                        usuario.getEmail(),
                        usuario.getNome(),
                        tokenPlainText,
                        frontendUrl
                );

                
                auditLog.setSucesso(true);
                auditLog.setTokenHash(tokenHash);
                logRepository.save(auditLog);

                log.info("Token de reset gerado e email enviado com sucesso para usuário ID: {}", usuario.getId());

            } catch (MessagingException e) {
                auditLog.setSucesso(false);
                auditLog.setMensagemErro("Erro ao enviar email: " + e.getMessage());
                logRepository.save(auditLog);

                log.error("Erro ao enviar email de reset para usuário ID: {}", usuario.getId(), e);
                throw new RuntimeException("Erro ao enviar email de reset de senha");
            }

        } catch (Exception e) {
            
            auditLog.setSucesso(false);
            auditLog.setMensagemErro("Erro ao processar solicitação: " + e.getMessage());
            logRepository.save(auditLog);

            log.error("Erro ao processar solicitação de reset de senha", e);
            throw new RuntimeException("Erro ao processar solicitação de reset de senha", e);
        }
    }

    
    @Transactional
    public boolean validarToken(ValidarTokenDTO request, String ipOrigem, String userAgent) {

        String tokenPlainText = request.getToken();
        String tokenHash = hashToken(tokenPlainText);

        log.info("Validando token de reset (IP: {})", ipOrigem);

        
        LogResetSenha auditLog = LogResetSenha.builder()
                .acao(AcaoResetSenha.VALIDACAO_TOKEN)
                .dataHora(LocalDateTime.now())
                .ipOrigem(ipOrigem)
                .userAgent(userAgent)
                .tokenHash(tokenHash)
                .emailTentativa("N/A")
                .build();

        try {
            
            ResetSenhaToken token = tokenRepository.findByTokenHashAndStatus(tokenHash, StatusToken.ATIVO)
                    .orElse(null);

            if (token == null) {
                auditLog.setSucesso(false);
                auditLog.setMensagemErro("Token inválido ou não encontrado");
                logRepository.save(auditLog);

                log.warn("Token inválido ou não encontrado");
                return false;
            }

            auditLog.setIdUsuario(token.getIdUsuario());

            
            if (LocalDateTime.now().isAfter(token.getDataExpiracao())) {
                auditLog.setSucesso(false);
                auditLog.setMensagemErro("Token expirado");
                logRepository.save(auditLog);

                log.warn("Token expirado para usuário ID: {}", token.getIdUsuario());
                return false;
            }

            
            auditLog.setSucesso(true);
            logRepository.save(auditLog);

            log.info("Token válido para usuário ID: {}", token.getIdUsuario());
            return true;

        } catch (Exception e) {
            auditLog.setSucesso(false);
            auditLog.setMensagemErro("Erro ao validar token: " + e.getMessage());
            logRepository.save(auditLog);

            log.error("Erro ao validar token", e);
            return false;
        }
    }

    
    @Transactional
    public void confirmarResetSenha(ResetSenhaConfirmDTO request, String ipOrigem, String userAgent) {

        String tokenPlainText = request.getToken();
        String tokenHash = hashToken(tokenPlainText);

        log.info("Confirmando reset de senha (IP: {})", ipOrigem);

        
        LogResetSenha auditLog = LogResetSenha.builder()
                .acao(AcaoResetSenha.ALTERACAO_SENHA)
                .dataHora(LocalDateTime.now())
                .ipOrigem(ipOrigem)
                .userAgent(userAgent)
                .tokenHash(tokenHash)
                .emailTentativa("N/A")
                .build();

        try {
            
            if (!request.getNovaSenha().equals(request.getConfirmarSenha())) {
                auditLog.setSucesso(false);
                auditLog.setMensagemErro("Senhas não coincidem");
                logRepository.save(auditLog);

                throw new RuntimeException("As senhas não coincidem");
            }

            
            ResetSenhaToken token = tokenRepository.findByTokenHashAndStatus(tokenHash, StatusToken.ATIVO)
                    .orElseThrow(() -> new RuntimeException("Token inválido ou já utilizado"));

            auditLog.setIdUsuario(token.getIdUsuario());

            
            if (LocalDateTime.now().isAfter(token.getDataExpiracao())) {
                token.setStatus(StatusToken.EXPIRADO);
                tokenRepository.save(token);

                auditLog.setSucesso(false);
                auditLog.setMensagemErro("Token expirado");
                logRepository.save(auditLog);

                throw new RuntimeException("Token expirado");
            }

            
            Usuario usuario = usuarioRepository.findById(token.getIdUsuario())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

            
            usuario.setSenhaHash(passwordEncoder.encode(request.getNovaSenha()));
            usuarioRepository.save(usuario);

            
            token.setStatus(StatusToken.USADO);
            token.setDataUtilizacao(LocalDateTime.now());
            tokenRepository.save(token);

            
            try {
                emailService.enviarEmailConfirmacaoAlteracaoSenha(usuario.getEmail(), usuario.getNome());
            } catch (MessagingException e) {
                log.warn("Erro ao enviar email de confirmação, mas senha foi alterada", e);
            }

            
            auditLog.setSucesso(true);
            auditLog.setIdUsuario(usuario.getId());
            logRepository.save(auditLog);

            log.info("Senha alterada com sucesso para usuário ID: {}", usuario.getId());

        } catch (Exception e) {
            auditLog.setSucesso(false);
            auditLog.setMensagemErro("Erro ao alterar senha: " + e.getMessage());
            logRepository.save(auditLog);

            log.error("Erro ao confirmar reset de senha", e);
            throw new RuntimeException("Erro ao alterar senha: " + e.getMessage(), e);
        }
    }

    
    private boolean verificarRateLimitUsuario(Long idUsuario) {
        LocalDateTime dataLimite = LocalDateTime.now().minusHours(1);
        int tentativas = tokenRepository.countRecentTokensByUsuario(idUsuario, dataLimite);
        return tentativas >= maxAttemptsPerUser;
    }

    
    private boolean verificarRateLimitIp(String ip) {
        LocalDateTime dataLimite = LocalDateTime.now().minusHours(1);
        int tentativas = tokenRepository.countRecentTokensByIp(ip, dataLimite);
        return tentativas >= maxAttemptsPerIp;
    }

    
    private String gerarTokenSeguro() {
        return UUID.randomUUID().toString();
    }

    
    private String hashToken(String token) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(token.getBytes(StandardCharsets.UTF_8));

            
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();

        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Erro ao gerar hash SHA-256", e);
        }
    }
}
