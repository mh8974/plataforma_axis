package com.axis.controller;

import com.axis.dto.QuestionarioInicialDTO;
import com.axis.dto.PacienteRequestDTO;
import com.axis.dto.UsuarioDTO;
import com.axis.dto.PacienteDTO;
import com.axis.service.UsuarioService;
import com.axis.service.PacienteService;
import com.axis.repository.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class QuestionarioPacienteController {

    private static final Logger logger = LoggerFactory.getLogger(QuestionarioPacienteController.class);

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PacienteService pacienteService;

    @Autowired
    private PacienteRepository pacienteRepository;

    
    @PostMapping("/questionario-paciente")
    public ResponseEntity<?> criarUsuarioPaciente(@Valid @RequestBody QuestionarioInicialDTO request) {
        logger.info("=== CRIANDO USUÁRIO PACIENTE ===");
        logger.info("Email: {}", request.getEmail());

        try {
            
            request.setTipo("PACIENTE");

            
            if (!request.getSenha().equals(request.getConfirmarSenha())) {
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Senhas não coincidem"));
            }

            
            UsuarioDTO usuarioDTO = usuarioService.criarUsuarioPaciente(request);
            logger.info("Usuário paciente criado com sucesso. ID: {}", usuarioDTO.getId());

            return new ResponseEntity<>(usuarioDTO, HttpStatus.CREATED);

        } catch (RuntimeException e) {
            logger.error("Erro ao criar usuário paciente: {}", e.getMessage());
            return ResponseEntity.badRequest()
                .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            logger.error("Erro interno ao criar usuário paciente", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Erro interno do servidor"));
        }
    }

    
    @PostMapping("/pacientes/completar-questionario")
    public ResponseEntity<?> completarQuestionarioPaciente(@Valid @RequestBody PacienteRequestDTO request) {
        logger.info("=== COMPLETANDO QUESTIONÁRIO PACIENTE ===");
        logger.info("UsuarioId: {}", request.getUsuarioId());
        logger.info("Problema Principal: {}", request.getProblemaPrincipal());
        logger.info("Modalidade Preferida: {}", request.getModalidadePreferida());

        try {
            
            PacienteDTO pacienteDTO = pacienteService.salvarProgressoCadastro(request);

            
            pacienteService.marcarPerfilComoCompleto(request.getUsuarioId());

            logger.info("Questionário paciente completado com sucesso e perfil marcado como COMPLETO");

            return new ResponseEntity<>(pacienteDTO, HttpStatus.OK);

        } catch (RuntimeException e) {
            logger.error("Erro ao completar questionário paciente: {}", e.getMessage());
            return ResponseEntity.badRequest()
                .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            logger.error("Erro interno ao completar questionário paciente", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Erro interno do servidor: " + e.getMessage()));
        }
    }

    
    @PostMapping("/pacientes/salvar-progresso")
    public ResponseEntity<?> salvarProgressoQuestionario(@RequestBody PacienteRequestDTO request) {
        logger.info("=== SALVANDO PROGRESSO QUESTIONÁRIO PACIENTE ===");
        logger.info("UsuarioId: {}", request.getUsuarioId());

        try {
            
            PacienteDTO pacienteDTO = pacienteService.salvarProgressoCadastro(request);

            logger.info("Progresso salvo com sucesso para usuarioId: {}", request.getUsuarioId());
            return ResponseEntity.ok(pacienteDTO);

        } catch (RuntimeException e) {
            logger.error("Erro ao salvar progresso: {}", e.getMessage());
            return ResponseEntity.badRequest()
                .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            logger.error("Erro interno ao salvar progresso", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Erro interno do servidor: " + e.getMessage()));
        }
    }

    
    @GetMapping("/pacientes/recuperar/{usuarioId}")
    public ResponseEntity<?> recuperarProgressoQuestionario(@PathVariable Long usuarioId) {
        logger.info("=== RECUPERANDO PROGRESSO QUESTIONÁRIO PACIENTE: {} ===", usuarioId);

        try {
            PacienteDTO pacienteDTO = pacienteService.converterParaDTO(
                pacienteService.obterPacientePorId(usuarioId)
            );

            if (pacienteDTO == null) {
                return ResponseEntity.ok().body(null); 
            }

            logger.info("Progresso recuperado com sucesso para usuarioId: {}", usuarioId);
            return ResponseEntity.ok(pacienteDTO);

        } catch (Exception e) {
            logger.info("Nenhum progresso encontrado para usuarioId: {}", usuarioId);
            return ResponseEntity.ok().body(null); 
        }
    }

    
    public static class ErrorResponse {
        private String message;
        private long timestamp;

        public ErrorResponse(String message) {
            this.message = message;
            this.timestamp = System.currentTimeMillis();
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public long getTimestamp() {
            return timestamp;
        }

        public void setTimestamp(long timestamp) {
            this.timestamp = timestamp;
        }
    }
}
