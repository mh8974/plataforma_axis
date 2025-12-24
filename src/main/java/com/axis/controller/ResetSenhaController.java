package com.axis.controller;

import com.axis.dto.*;
import com.axis.service.ResetSenhaService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;


@RestController
@RequestMapping("/api/auth/resetar-senha")
@Tag(name = "Reset de Senha", description = "Endpoints para recuperação de senha")
@Slf4j
public class ResetSenhaController {

    @Autowired
    private ResetSenhaService resetSenhaService;

    
    @PostMapping("/solicitar")
    @Operation(summary = "Solicitar reset de senha", description = "Envia email com link de reset se o email existir no sistema")
    public ResponseEntity<Map<String, String>> solicitarReset(
            @Valid @RequestBody ResetSenhaRequestDTO request,
            HttpServletRequest httpRequest) {

        String ipOrigem = obterIpReal(httpRequest);
        String userAgent = httpRequest.getHeader("User-Agent");

        log.info("Solicitação de reset recebida para email: {} (IP: {})", request.getEmail(), ipOrigem);

        try {
            resetSenhaService.solicitarResetSenha(request, ipOrigem, userAgent);

            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Se o email estiver cadastrado, você receberá instruções para redefinir sua senha.");
            response.put("details", "O link expira em 15 minutos.");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Erro ao processar solicitação de reset", e);

            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Solicitação processada.");
            return ResponseEntity.ok(response);
        }
    }

    
    @PostMapping("/validar-token")
    @Operation(summary = "Validar token de reset", description = "Verifica se o token é válido e não expirou")
    public ResponseEntity<Map<String, Boolean>> validarToken(
            @Valid @RequestBody ValidarTokenDTO request,
            HttpServletRequest httpRequest) {

        String ipOrigem = obterIpReal(httpRequest);
        String userAgent = httpRequest.getHeader("User-Agent");

        log.info("Validação de token recebida (IP: {})", ipOrigem);

        try {
            boolean valido = resetSenhaService.validarToken(request, ipOrigem, userAgent);

            Map<String, Boolean> response = new HashMap<>();
            response.put("valido", valido);

            if (valido) {
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.badRequest().body(response);
            }

        } catch (Exception e) {
            log.error("Erro ao validar token", e);

            Map<String, Boolean> response = new HashMap<>();
            response.put("valido", false);
            return ResponseEntity.badRequest().body(response);
        }
    }

    
    @PostMapping("/confirmar")
    @Operation(summary = "Confirmar reset de senha", description = "Define a nova senha usando o token válido")
    public ResponseEntity<Map<String, String>> confirmarReset(
            @Valid @RequestBody ResetSenhaConfirmDTO request,
            HttpServletRequest httpRequest) {

        String ipOrigem = obterIpReal(httpRequest);
        String userAgent = httpRequest.getHeader("User-Agent");

        log.info("Confirmação de reset recebida (IP: {})", ipOrigem);

        try {
            resetSenhaService.confirmarResetSenha(request, ipOrigem, userAgent);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Senha alterada com sucesso!");
            response.put("details", "Você já pode fazer login com sua nova senha.");

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            log.error("Erro ao confirmar reset de senha", e);

            Map<String, String> response = new HashMap<>();
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    
    private String obterIpReal(HttpServletRequest request) {
        String ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.isEmpty() || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
        
        if (ip != null && ip.contains(",")) {
            ip = ip.split(",")[0].trim();
        }
        return ip;
    }
}
