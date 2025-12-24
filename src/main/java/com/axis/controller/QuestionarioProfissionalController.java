package com.axis.controller;

import com.axis.dto.QuestionarioInicialDTO;
import com.axis.dto.InformacoesPessoaisDTO;
import com.axis.dto.CadastroCompletoDTO;
import com.axis.dto.UsuarioDTO;
import com.axis.dto.TerapeutaDTO;
import com.axis.service.UsuarioService;
import com.axis.service.TerapeutaService;
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
public class QuestionarioProfissionalController {

    private static final Logger logger = LoggerFactory.getLogger(QuestionarioProfissionalController.class);

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private TerapeutaService terapeutaService;

    
    @PostMapping("/questionario-profissional")
    public ResponseEntity<?> criarUsuarioProfissional(@Valid @RequestBody QuestionarioInicialDTO request) {
        try {
            
            request.setTipo("TERAPEUTA");

            
            if (!request.getSenha().equals(request.getConfirmarSenha())) {
                return ResponseEntity.badRequest()
                    .body(new ErrorResponse("Senhas não coincidem"));
            }

            
            UsuarioDTO usuarioDTO = usuarioService.criarUsuarioProfissional(request);

            return new ResponseEntity<>(usuarioDTO, HttpStatus.CREATED);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Erro interno do servidor"));
        }
    }

    
    @PostMapping("/profissionais/informacoes-pessoais")
    public ResponseEntity<?> completarPerfilTerapeuta(@Valid @RequestBody InformacoesPessoaisDTO request) {
        logger.info("=== INICIANDO ENDPOINT /profissionais/informacoes-pessoais ===");
        logger.info("Request recebido: {}", request);
        logger.info("UsuarioId: {}", request.getUsuarioId());
        logger.info("CRP: {}", request.getCrp());
        logger.info("InstituicaoFormacao: {}", request.getInstituicaoFormacao());
        logger.info("AnoFormacao: {}", request.getAnoFormacao());
        logger.info("Bio: {}", request.getBio());
        logger.info(">>> oQueNaoGostaAtender: '{}'", request.getOQueNaoGostaAtender());
        logger.info(">>> casesSucesso: '{}'", request.getCasesSucesso());
        logger.info(">>> feedbackPacientes: '{}'", request.getFeedbackPacientes());
        logger.info(">>> demandaMaisComum: '{}'", request.getDemandaMaisComum());

        try {
            logger.info("Chamando terapeutaService.completarPerfil...");
            
            TerapeutaDTO terapeutaDTO = terapeutaService.completarPerfil(request);
            logger.info("TerapeutaDTO criado com sucesso: {}", terapeutaDTO);

            return new ResponseEntity<>(terapeutaDTO, HttpStatus.CREATED);

        } catch (RuntimeException e) {
            logger.error("=== RUNTIME EXCEPTION ===", e);
            logger.error("Mensagem do erro: {}", e.getMessage());
            logger.error("Stacktrace completo:", e);
            return ResponseEntity.badRequest()
                .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            logger.error("=== EXCEPTION GERAL ===", e);
            logger.error("Mensagem do erro: {}", e.getMessage());
            logger.error("Stacktrace completo:", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Erro interno do servidor: " + e.getMessage()));
        }
    }

    
    @PostMapping("/profissionais/cadastro-completo")
    public ResponseEntity<?> cadastroCompleto(@RequestBody CadastroCompletoDTO request) {
        try {
            
            QuestionarioInicialDTO questionarioDTO = new QuestionarioInicialDTO();
            questionarioDTO.setNomeCompleto(request.getNomeCompleto());
            questionarioDTO.setEmail(request.getEmail());
            questionarioDTO.setSenha(request.getSenha());
            questionarioDTO.setConfirmarSenha(request.getConfirmarSenha());
            questionarioDTO.setTelefone(request.getTelefone());
            questionarioDTO.setDdi(request.getDdi());
            questionarioDTO.setCpf(request.getCpf());
            questionarioDTO.setAceitaTermos(request.getAceitaTermos());
            questionarioDTO.setTipo("TERAPEUTA");

            UsuarioDTO usuarioDTO = usuarioService.criarUsuarioProfissional(questionarioDTO);

            
            InformacoesPessoaisDTO informacoesDTO = mapearParaInformacoesPessoais(request);
            informacoesDTO.setUsuarioId(usuarioDTO.getId());

            TerapeutaDTO terapeutaDTO = terapeutaService.completarPerfil(informacoesDTO);

            return new ResponseEntity<>(terapeutaDTO, HttpStatus.CREATED);

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Erro interno do servidor"));
        }
    }

    
    private InformacoesPessoaisDTO mapearParaInformacoesPessoais(CadastroCompletoDTO request) {
        InformacoesPessoaisDTO dto = new InformacoesPessoaisDTO();

        
        dto.setDataNascimento(request.getDataNascimento());
        dto.setIdentidadeGenero(request.getIdentidadeGenero());
        dto.setReligiao(request.getReligiao());
        dto.setCrp(request.getCrp());
        dto.setCep(request.getCep());
        dto.setLogradouro(request.getLogradouro());
        dto.setBairro(request.getBairro());
        dto.setLocalidade(request.getLocalidade());
        dto.setUf(request.getUf());
        dto.setEstado(request.getEstado());
        dto.setAbordagensPrincipais(request.getAbordagensPrincipais());
        dto.setAbordagensSecundarias(request.getAbordagensSecundarias());
        dto.setExperienciaAnos(request.getExperienciaAnos());
        dto.setPrimeiraConsultaGratuita(request.getPrimeiraConsultaGratuita());
        dto.setOQueNaoGostaAtender(request.getOQueNaoGostaAtender());
        dto.setCasesSucesso(request.getCasesSucesso());
        dto.setFeedbackPacientes(request.getFeedbackPacientes());
        dto.setDemandaMaisComum(request.getDemandaMaisComum());
        dto.setInstituicaoFormacao(request.getInstituicaoFormacao());
        dto.setAnoFormacao(request.getAnoFormacao());
        dto.setEspecialidades(request.getEspecialidades());
        dto.setBio(request.getBio());
        dto.setEstadoCivil(request.getEstadoCivil());
        dto.setAnosRelacionamento(request.getAnosRelacionamento());
        dto.setPossuiFilhos(request.getPossuiFilhos());
        dto.setQuantidadeFilhos(request.getQuantidadeFilhos());
        dto.setIdadesFilhos(request.getIdadesFilhos());
        dto.setFilhosDeficiencia(request.getFilhosDeficiencia());
        dto.setAssuntosPrediletos(request.getAssuntosPrediletos());
        dto.setHobby(request.getHobby());
        dto.setInspiracao(request.getInspiracao());
        dto.setFilmesMarcantes(request.getFilmesMarcantes());
        dto.setSuperacoes(request.getSuperacoes());
        dto.setCausaSangue(request.getCausaSangue());
        dto.setMaiorMudanca(request.getMaiorMudanca());
        dto.setGastariaDinheiro(request.getGastariaDinheiro());
        dto.setMarcaDeixar(request.getMarcaDeixar());
        dto.setTrabalhoAntesSaudeMental(request.getTrabalhoAntesSaudeMental());
        dto.setAtenderiaPorAmor(request.getAtenderiaPorAmor());
        dto.setModalidadeAtendimento(request.getModalidadeAtendimento());
        dto.setLocalizacaoProfissional(request.getLocalizacaoProfissional());
        dto.setLocalizacaoClinica(request.getLocalizacaoClinica());
        dto.setRua(request.getRua());
        dto.setNumero(request.getNumero());
        dto.setComplemento(request.getComplemento());
        dto.setDiasAtendimento(request.getDiasAtendimento());
        dto.setHorariosAtendimento(request.getHorariosAtendimento());
        dto.setValorSessao(request.getValorSessao());
        dto.setDiaReuniao(request.getDiaReuniao());
        dto.setHorarioReuniao(request.getHorarioReuniao());
        dto.setRedesSociais(request.getRedesSociais());

        return dto;
    }

    
    @PostMapping("/profissionais/salvar-progresso")
    public ResponseEntity<?> salvarProgressoCadastro(@RequestBody InformacoesPessoaisDTO request) {
        logger.info("=== ENDPOINT /profissionais/salvar-progresso ===");
        logger.info("UsuarioId: {}", request.getUsuarioId());

        try {
            TerapeutaDTO terapeutaDTO = terapeutaService.salvarProgressoCadastro(request);
            logger.info("Progresso salvo com sucesso para usuarioId: {}", request.getUsuarioId());
            return ResponseEntity.ok(terapeutaDTO);

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

    
    @GetMapping("/profissionais/recuperar/{usuarioId}")
    public ResponseEntity<?> recuperarProgressoCadastro(@PathVariable Long usuarioId) {
        logger.info("=== ENDPOINT /profissionais/recuperar/{} ===", usuarioId);

        try {
            TerapeutaDTO terapeutaDTO = terapeutaService.recuperarProgressoCadastro(usuarioId);

            if (terapeutaDTO == null) {
                return ResponseEntity.ok().body(null); 
            }

            logger.info("Progresso recuperado com sucesso para usuarioId: {}", usuarioId);
            return ResponseEntity.ok(terapeutaDTO);

        } catch (Exception e) {
            logger.error("Erro ao recuperar progresso", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Erro interno do servidor: " + e.getMessage()));
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