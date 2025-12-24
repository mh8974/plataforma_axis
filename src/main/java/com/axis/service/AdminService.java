package com.axis.service;

import com.axis.dto.TerapeutaDTO;
import com.axis.dto.TerapeutaDetalhadoDTO;
import com.axis.dto.PageResponse;
import com.axis.model.StatusCadastro;
import com.axis.model.Terapeuta;
import com.axis.model.Usuario;
import com.axis.repository.TerapeutaRepository;
import com.axis.repository.UsuarioRepository;
import com.axis.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;


@Service
@Slf4j
public class AdminService {

    @Autowired
    private TerapeutaRepository terapeutaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private TerapeutaService terapeutaService;

    @Autowired
    private EmailService emailService;

    @Value("${app.frontend.url:https://portalaxis.com.br/login}")
    private String frontendUrl;

    
    @Transactional
    public TerapeutaDTO aprovarTerapeuta(Long terapeutaId, Long adminId, String feedbackEntrevista) {
        
        if (feedbackEntrevista == null || feedbackEntrevista.trim().isEmpty()) {
            throw new IllegalArgumentException("Feedback da entrevista é obrigatório para aprovação");
        }

        
        Terapeuta terapeuta = terapeutaRepository.findById(terapeutaId)
                .orElseThrow(() -> new ResourceNotFoundException("Terapeuta não encontrado com ID: " + terapeutaId));

        
        
        
        

        
        Usuario usuario = usuarioRepository.findById(terapeuta.getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário do terapeuta não encontrado"));

        
        terapeuta.setStatusCadastro(StatusCadastro.APROVADO);
        terapeuta.setDataAprovacao(LocalDateTime.now());
        terapeuta.setAprovadoPor(adminId);
        terapeuta.setFbAprovEntrevista(feedbackEntrevista);
        terapeuta.setMotivoReprovacao(null); 
        terapeuta.setDataAtualizacao(LocalDateTime.now());

        
        usuario.setAtivo(true);
        usuario.setDataAtualizacao(LocalDateTime.now());

        
        terapeutaRepository.save(terapeuta);
        usuarioRepository.save(usuario);

        
        try {
            String urlLogin = frontendUrl + "/login";
            emailService.enviarEmailAprovacao(usuario.getEmail(), usuario.getNome(), urlLogin);
        } catch (Exception e) {
            log.error("Erro ao enviar email de aprovação para {}: {}", usuario.getEmail(), e.getMessage());
            
        }

        
        return terapeutaService.converterParaDTO(terapeuta);
    }

    
    @Transactional
    public TerapeutaDTO atualizarFeedbackEntrevista(Long terapeutaId, Long adminId, String feedbackEntrevista) {
        
        if (feedbackEntrevista == null || feedbackEntrevista.trim().isEmpty()) {
            throw new IllegalArgumentException("Feedback da entrevista é obrigatório");
        }

        
        Terapeuta terapeuta = terapeutaRepository.findById(terapeutaId)
                .orElseThrow(() -> new ResourceNotFoundException("Terapeuta não encontrado com ID: " + terapeutaId));

        
        terapeuta.setFbAprovEntrevista(feedbackEntrevista);
        terapeuta.setDataAtualizacao(LocalDateTime.now());

        
        terapeutaRepository.save(terapeuta);

        
        return terapeutaService.converterParaDTO(terapeuta);
    }

    
    @Transactional
    public TerapeutaDTO reprovarTerapeuta(Long terapeutaId, Long adminId, String motivo) {
        
        if (motivo == null || motivo.trim().isEmpty()) {
            throw new IllegalArgumentException("Motivo da reprovação é obrigatório");
        }

        
        Terapeuta terapeuta = terapeutaRepository.findById(terapeutaId)
                .orElseThrow(() -> new ResourceNotFoundException("Terapeuta não encontrado com ID: " + terapeutaId));

        
        
        
        

        
        Usuario usuario = usuarioRepository.findById(terapeuta.getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário do terapeuta não encontrado"));

        
        terapeuta.setStatusCadastro(StatusCadastro.REPROVADO);
        terapeuta.setDataAprovacao(LocalDateTime.now());
        terapeuta.setAprovadoPor(adminId);
        terapeuta.setMotivoReprovacao(motivo);
        terapeuta.setDataAtualizacao(LocalDateTime.now());

        
        usuario.setAtivo(false);
        usuario.setDataAtualizacao(LocalDateTime.now());

        
        terapeutaRepository.save(terapeuta);
        usuarioRepository.save(usuario);

        
        try {
            String urlSuporte = "mailto:suporte@portalaxis.com.br";
            emailService.enviarEmailReprovacao(usuario.getEmail(), usuario.getNome(), motivo, urlSuporte);
        } catch (Exception e) {
            log.error("Erro ao enviar email de reprovação para {}: {}", usuario.getEmail(), e.getMessage());
            
        }

        
        return terapeutaService.converterParaDTO(terapeuta);
    }

    
    public List<TerapeutaDTO> listarTerapeutasPendentes() {
        List<Terapeuta> terapeutasPendentes = terapeutaRepository.findByStatusCadastro(StatusCadastro.PENDENTE);
        return terapeutasPendentes.stream()
                .map(terapeuta -> terapeutaService.converterParaDTO(terapeuta))
                .sorted(Comparator.comparing(TerapeutaDTO::getTempoEspera,
                        Comparator.nullsLast(Comparator.reverseOrder())))
                .collect(Collectors.toList());
    }

    
    public List<TerapeutaDTO> listarTerapeutasPorStatus(StatusCadastro status) {
        List<Terapeuta> terapeutas = terapeutaRepository.findByStatusCadastro(status);
        return terapeutas.stream()
                .map(terapeuta -> terapeutaService.converterParaDTO(terapeuta))
                .sorted(Comparator.comparing(TerapeutaDTO::getTempoEspera,
                        Comparator.nullsLast(Comparator.reverseOrder())))
                .collect(Collectors.toList());
    }

    
    public List<TerapeutaDTO> listarTodosTerapeutas() {
        List<Terapeuta> terapeutas = terapeutaRepository.findAll();
        return terapeutas.stream()
                .map(terapeuta -> terapeutaService.converterParaDTO(terapeuta))
                .sorted(Comparator
                        
                        .comparingInt((TerapeutaDTO dto) -> {
                            if (dto.getStatusCadastro() == null) return 3;
                            switch (dto.getStatusCadastro()) {
                                case PENDENTE: return 0;
                                case APROVADO: return 1;
                                case REPROVADO: return 2;
                                default: return 3;
                            }
                        })
                        
                        .thenComparing(TerapeutaDTO::getTempoEspera,
                                Comparator.nullsLast(Comparator.reverseOrder())))
                .collect(Collectors.toList());
    }

    
    public PageResponse<TerapeutaDTO> listarTerapeutasPaginado(int page, int size, String status, String busca, String sortBy, String sortDir, String statusPerfil) {
        log.debug("Listando terapeutas paginado - page: {}, size: {}, status: {}, busca: {}, sortBy: {}, sortDir: {}, statusPerfil: {}",
                  page, size, status, busca, sortBy, sortDir, statusPerfil);

        
        org.springframework.data.domain.Pageable pageable = criarPageableTerapeuta(page - 1, size, sortBy, sortDir);

        
        Specification<Terapeuta> spec = criarSpecificationTerapeuta(status, busca, statusPerfil);

        
        org.springframework.data.domain.Page<Terapeuta> paginaTerapeutas = terapeutaRepository.findAll(spec, pageable);

        
        List<TerapeutaDTO> terapeutasDTO = paginaTerapeutas.getContent().stream()
                .map(terapeuta -> terapeutaService.converterParaDTO(terapeuta))
                .collect(Collectors.toList());

        
        PageResponse<TerapeutaDTO> response = new PageResponse<>();
        response.setContent(terapeutasDTO);
        response.setCurrentPage(page);
        response.setTotalPages(paginaTerapeutas.getTotalPages());
        response.setTotalItems(paginaTerapeutas.getTotalElements());
        response.setItemsPerPage(size);

        log.debug("Retornando {} terapeutas de {} total", terapeutasDTO.size(), paginaTerapeutas.getTotalElements());

        return response;
    }

    
    private org.springframework.data.domain.Pageable criarPageableTerapeuta(int page, int size, String sortBy, String sortDir) {
        boolean isAsc = "asc".equalsIgnoreCase(sortDir);

        
        String campoOrdenacao = "dataCriacao"; 

        if (sortBy != null && !sortBy.trim().isEmpty()) {
            switch (sortBy.toLowerCase()) {
                case "nome":
                    campoOrdenacao = "usuario.nome"; 
                    break;
                case "email":
                    campoOrdenacao = "usuario.email"; 
                    break;
                case "telefone":
                    campoOrdenacao = "usuario.telefone"; 
                    break;
                case "tempoespera":
                case "datacadastro":
                    campoOrdenacao = "usuario.dataCriacao"; 
                    break;
                case "dataaprovacao":
                    campoOrdenacao = "dataAprovacao";
                    break;
            }
        }

        
        org.springframework.data.domain.Sort sort = isAsc
            ? org.springframework.data.domain.Sort.by(campoOrdenacao).ascending()
            : org.springframework.data.domain.Sort.by(campoOrdenacao).descending();

        return org.springframework.data.domain.PageRequest.of(page, size, sort);
    }

    
    private Specification<Terapeuta> criarSpecificationTerapeuta(String status, String busca, String statusPerfil) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            
            if (status != null && !status.trim().isEmpty() && !status.equalsIgnoreCase("TODOS")) {
                try {
                    StatusCadastro statusEnum = StatusCadastro.valueOf(status.toUpperCase());
                    predicates.add(criteriaBuilder.equal(root.get("statusCadastro"), statusEnum));
                } catch (IllegalArgumentException e) {
                    
                }
            }

            
            Join<Object, Object> usuarioJoin = null;

            
            if (statusPerfil != null && !statusPerfil.trim().isEmpty()) {
                if (usuarioJoin == null) {
                    usuarioJoin = root.join("usuario");
                }

                if ("COMPLETO".equalsIgnoreCase(statusPerfil)) {
                    predicates.add(criteriaBuilder.equal(usuarioJoin.get("statusPerfil"), "COMPLETO"));
                } else if ("INCOMPLETO".equalsIgnoreCase(statusPerfil)) {
                    predicates.add(criteriaBuilder.notEqual(usuarioJoin.get("statusPerfil"), "COMPLETO"));
                }
            }

            
            if (busca != null && !busca.trim().isEmpty()) {
                String termoBusca = "%" + busca.toLowerCase().trim() + "%";

                
                if (usuarioJoin == null) {
                    usuarioJoin = root.join("usuario");
                }

                Predicate nomeMatch = criteriaBuilder.like(
                    criteriaBuilder.lower(usuarioJoin.get("nome")),
                    termoBusca
                );

                Predicate emailMatch = criteriaBuilder.like(
                    criteriaBuilder.lower(usuarioJoin.get("email")),
                    termoBusca
                );

                Predicate telefoneMatch = criteriaBuilder.like(
                    criteriaBuilder.lower(usuarioJoin.get("telefone")),
                    termoBusca
                );

                predicates.add(criteriaBuilder.or(nomeMatch, emailMatch, telefoneMatch));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }


    
    @Transactional(readOnly = true)
    public TerapeutaDetalhadoDTO buscarTerapeutaDetalhado(Long usuarioId) {
        
        Terapeuta terapeuta = terapeutaRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Terapeuta não encontrado com ID: " + usuarioId));

        
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + usuarioId));

        
        return converterParaTerapeutaDetalhadoDTO(terapeuta, usuario);
    }

    
    private TerapeutaDetalhadoDTO converterParaTerapeutaDetalhadoDTO(Terapeuta t, Usuario u) {
        TerapeutaDetalhadoDTO dto = new TerapeutaDetalhadoDTO();

        
        dto.setId(u.getId());
        dto.setNome(u.getNome());
        dto.setEmail(u.getEmail());
        dto.setTelefone(u.getTelefone());
        dto.setDataCadastro(u.getDataCriacao());

        
        dto.setCpf(t.getCpf());
        dto.setGenero(t.getGenero());
        dto.setDataNascimento(t.getDataNascimento());
        dto.setIdadeCalculada(t.getIdadeCalculada());
        dto.setReligiao(t.getReligiao());
        dto.setEstadoCivil(t.getEstadoCivil());
        dto.setAnosRelacionamento(t.getAnosRelacionamento());
        dto.setPossuiFilhos(t.getPossuiFilhos());
        dto.setQuantidadeFilhos(t.getQuantidadeFilhos());
        dto.setFilhosDeficiencia(t.getFilhosDeficiencia());
        dto.setJustificativaDeficiencia(t.getJustificativaDeficiencia());

        
        dto.setCrp(t.getCrp());
        dto.setInstituicaoFormacao(t.getInstituicaoFormacao());
        dto.setAnoFormacao(t.getAnoFormacao());
        dto.setExperienciaAnos(t.getExperienciaAnos());
        dto.setPosGraduacao(converterArrayParaLista(t.getPosGraduacao()));
        dto.setCertificacoes(converterArrayParaLista(t.getCertificacoes()));

        
        dto.setAbordagensPrincipais(converterArrayParaLista(t.getAbordagensPrincipais()));
        dto.setTipoTerapia(t.getTipoTerapia());
        dto.setAbordagensSecundarias(converterArrayParaLista(t.getAbordagensSecundarias()));
        dto.setEspecialidades(t.getEspecialidades());
        
        dto.setOQueNaoGostaAtender(t.getOQueNaoGostaAtender());

        
        dto.setModalidadeAtendimento(t.getModalidadeAtendimento());
        dto.setFaixaEtariaAtendimento(t.getFaixaEtariaAtendimento());
        dto.setDisponibilidadeHorarios(t.getDisponibilidadeHorarios());
        dto.setDiasAtendimento(converterArrayParaLista(t.getDiasAtendimento()));
        dto.setHorarioInicio(t.getHorarioInicio());
        dto.setHorarioFim(t.getHorarioFim());

        
        dto.setDiaReuniao(t.getDiaReuniao());
        dto.setHorarioReuniao(t.getHorarioReuniao());
        dto.setHorarioReuniaoDisponivel(t.getHorarioReuniaoDisponivel());

        
        dto.setValorSessao(t.getValorSessao());
        dto.setPrimeiraConsultaGratuita(t.getPrimeiraConsultaGratuita());
        dto.setValorPrimeiraConsulta(t.getValorPrimeiraConsulta());
        dto.setMetodosPagamento(t.getMetodosPagamento());
        dto.setPoliticaCancelamento(t.getPoliticaCancelamento());

        
        dto.setAceitaConvenio(t.getAceitaConvenio());
        dto.setConveniosAceitos(converterArrayParaLista(t.getConveniosAceitos()));

        
        dto.setLgbtqFriendly(t.getLgbtqFriendly());
        dto.setExperienciaCasosLgbtq(t.getExperienciaCasosLgbtq());
        dto.setFormacaoDiversidade(t.getFormacaoDiversidade());
        dto.setCertificacoesLgbtq(converterArrayParaLista(t.getCertificacoesLgbtq()));

        
        dto.setLocalizacaoClinica(t.getLocalizacaoClinica());

        
        dto.setBio(t.getBio());
        dto.setDemandaMaisComum(t.getDemandaMaisComum());
        dto.setTempoRespostaHoras(t.getTempoRespostaHoras());
        dto.setTotalPacientesAtendidos(t.getTotalPacientesAtendidos());
        dto.setNotaMedia(t.getNotaMedia());
        dto.setTotalAvaliacoes(t.getTotalAvaliacoes());
        dto.setAnosPlataforma(t.getAnosPlataforma());
        dto.setCasesSucesso(t.getCasesSucesso());
        dto.setFeedbackPacientes(t.getFeedbackPacientes());

        
        dto.setAssuntosPrediletos(t.getAssuntosPrediletos());
        dto.setHobby(t.getHobby());
        dto.setInspiracao(t.getInspiracao());
        dto.setFilmesMarcantes(t.getFilmesMarcantes());
        dto.setSuperacoes(t.getSuperacoes());
        dto.setCausaSangue(t.getCausaSangue());
        dto.setMaiorMudanca(t.getMaiorMudanca());
        dto.setGastariaDinheiro(t.getGastariaDinheiro());
        dto.setMarcaDeixar(t.getMarcaDeixar());
        dto.setTrabalhoAntesSaudeMental(t.getTrabalhoAntesSaudeMental());
        dto.setAtenderiaPorAmor(t.getAtenderiaPorAmor());

        
        dto.setRedesSociais(t.getRedesSociais());

        
        dto.setStatusCadastro(t.getStatusCadastro() != null ? t.getStatusCadastro().name() : "PENDENTE");
        dto.setDataAprovacao(t.getDataAprovacao());
        dto.setAprovadoPor(t.getAprovadoPor());
        dto.setMotivoReprovacao(t.getMotivoReprovacao());
        dto.setFbAprovEntrevista(t.getFbAprovEntrevista());

        
        if (t.getStatusCadastro() == StatusCadastro.PENDENTE && u.getDataCriacao() != null) {
            long dias = ChronoUnit.DAYS.between(u.getDataCriacao(), LocalDateTime.now());
            dto.setDiasAguardando(dias);
        }

        return dto;
    }

    
    private List<String> converterArrayParaLista(String[] array) {
        if (array == null || array.length == 0) {
            return null;
        }
        return Arrays.asList(array);
    }
}
