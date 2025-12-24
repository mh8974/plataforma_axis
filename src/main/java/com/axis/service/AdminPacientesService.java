package com.axis.service;

import com.axis.dto.PacienteDTO;
import com.axis.dto.PacienteDetalhadoDTO;
import com.axis.dto.PageResponse;
import com.axis.model.Paciente;
import com.axis.model.Usuario;
import com.axis.model.Cep;
import com.axis.repository.PacienteRepository;
import com.axis.repository.UsuarioRepository;
import com.axis.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import lombok.extern.slf4j.Slf4j;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@Service
@Slf4j
public class AdminPacientesService {

    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PacienteService pacienteService;

    
    public PageResponse<PacienteDTO> listarPacientesPaginado(int page, int size, String busca, String sortBy, String sortDir, String statusPerfil) {
        log.debug("Listando pacientes paginado - page: {}, size: {}, busca: {}, sortBy: {}, sortDir: {}, statusPerfil: {}",
                  page, size, busca, sortBy, sortDir, statusPerfil);

        
        org.springframework.data.domain.Pageable pageable = criarPageable(page - 1, size, sortBy, sortDir);

        
        Specification<Paciente> spec = criarSpecification(busca, statusPerfil);

        
        org.springframework.data.domain.Page<Paciente> paginaPacientes = pacienteRepository.findAll(spec, pageable);

        
        List<PacienteDTO> pacientesDTO = paginaPacientes.getContent().stream()
                .map(paciente -> pacienteService.converterParaDTO(paciente))
                .collect(Collectors.toList());

        
        PageResponse<PacienteDTO> response = new PageResponse<>();
        response.setContent(pacientesDTO);
        response.setCurrentPage(page);
        response.setTotalPages(paginaPacientes.getTotalPages());
        response.setTotalItems(paginaPacientes.getTotalElements());
        response.setItemsPerPage(size);

        log.debug("Retornando {} pacientes de {} total", pacientesDTO.size(), paginaPacientes.getTotalElements());

        return response;
    }

    
    private org.springframework.data.domain.Pageable criarPageable(int page, int size, String sortBy, String sortDir) {
        boolean isAsc = "asc".equalsIgnoreCase(sortDir);

        
        String campoOrdenacao = "usuarioId"; 

        if (sortBy != null && !sortBy.trim().isEmpty()) {
            switch (sortBy.toLowerCase()) {
                case "nome":
                    campoOrdenacao = "usuario.nome"; 
                    break;
                case "email":
                    campoOrdenacao = "usuario.email"; 
                    break;
                case "nivelurgencia":
                    campoOrdenacao = "nivelUrgencia";
                    break;
                case "datacriacao":
                    campoOrdenacao = "dataCriacao";
                    break;
            }
        }

        
        org.springframework.data.domain.Sort sort = isAsc
            ? org.springframework.data.domain.Sort.by(campoOrdenacao).ascending()
            : org.springframework.data.domain.Sort.by(campoOrdenacao).descending();

        return org.springframework.data.domain.PageRequest.of(page, size, sort);
    }

    
    private Specification<Paciente> criarSpecification(String busca, String statusPerfil) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            
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

                predicates.add(criteriaBuilder.or(nomeMatch, emailMatch));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }


    
    @Transactional(readOnly = true)
    public PacienteDetalhadoDTO buscarDetalhesPaciente(Long pacienteId) {
        log.debug("Buscando detalhes do paciente com ID: {}", pacienteId);

        
        Paciente paciente = pacienteRepository.findByUsuarioId(pacienteId)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente não encontrado com ID: " + pacienteId));

        
        Usuario usuario = usuarioRepository.findById(pacienteId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + pacienteId));

        
        return converterParaPacienteDetalhadoDTO(paciente, usuario);
    }

    
    @Transactional(readOnly = true)
    public Map<String, Object> obterEstatisticas() {
        log.debug("Obtendo estatísticas de pacientes");

        Map<String, Object> estatisticas = new HashMap<>();

        
        Long totalPacientes = pacienteRepository.contarTotalPacientes();
        estatisticas.put("totalPacientes", totalPacientes);

        
        List<Object[]> porLocalizacao = pacienteRepository.contarPorLocalizacao();
        Map<String, Long> mapLocalizacao = new HashMap<>();
        for (Object[] row : porLocalizacao) {
            String localizacao = (String) row[0];
            Long count = (Long) row[1];
            mapLocalizacao.put(localizacao, count);
        }
        estatisticas.put("porLocalizacao", mapLocalizacao);

        
        List<Object[]> porProblema = pacienteRepository.contarPorProblemaPrincipal();
        Map<String, Long> mapProblema = new HashMap<>();
        for (Object[] row : porProblema) {
            String problema = (String) row[0];
            Long count = (Long) row[1];
            mapProblema.put(problema, count);
        }
        estatisticas.put("porProblemaPrincipal", mapProblema);

        return estatisticas;
    }

    
    private PacienteDetalhadoDTO converterParaPacienteDetalhadoDTO(Paciente p, Usuario u) {
        PacienteDetalhadoDTO dto = new PacienteDetalhadoDTO();

        
        dto.setId(p.getUsuarioId());
        dto.setUsuarioId(p.getUsuarioId());
        dto.setNome(u.getNome());
        dto.setEmail(u.getEmail());
        dto.setTelefone(u.getTelefone());
        dto.setDataCriacao(p.getDataCriacao());
        dto.setDataAtualizacao(p.getDataAtualizacao());

        
        dto.setIdade(p.getIdade());
        dto.setSexo(p.getSexo());
        dto.setProfissao(p.getProfissao());
        dto.setEstadoCivil(p.getEstadoCivil());
        dto.setTempoRelacionamentoAnos(p.getTempoRelacionamentoAnos());
        dto.setEscolaridade(p.getEscolaridade());
        dto.setMoraCom(p.getMoraCom());
        dto.setReligiao(p.getReligiao());
        dto.setReligiaoOutras(p.getReligiaoOutras());

        
        dto.setFaixaSalarial(p.getFaixaSalarial());
        dto.setFaixaPrecoMinimo(p.getFaixaPrecoMinimo());
        dto.setFaixaPrecoMaximo(p.getFaixaPrecoMaximo());
        dto.setPossuiConvenio(p.getPossuiConvenio());
        dto.setNomeConvenio(p.getNomeConvenio());
        dto.setDispostoParticular(p.getDispostoParticular());
        dto.setPossuiApoioFinanceiro(p.getPossuiApoioFinanceiro());

        
        dto.setLocalizacao(p.getLocalizacao());
        dto.setIdCep(p.getIdCep());
        dto.setNumeroEndereco(p.getNumeroEndereco());
        dto.setComplementoEndereco(p.getComplementoEndereco());
        dto.setComplementoLocalizacao(p.getComplementoLocalizacao());

        
        Cep cep = p.getCep();
        if (cep != null) {
            dto.setCep(cep.getNrCep());
            dto.setLogradouro(cep.getNmLogradouro());
            dto.setBairro(cep.getNmBairro());
            dto.setCidade(cep.getCidade());
            dto.setEstado(cep.getUf());
            dto.setLatitude(cep.getLatitude());
            dto.setLongitude(cep.getLongitude());
        }

        
        dto.setDescricaoProblema(p.getDescricaoProblema());
        dto.setProblemaPrincipal(p.getProblemaPrincipal());
        dto.setProblemasSecundarios(p.getProblemasSecundarios());
        dto.setNivelUrgencia(p.getNivelUrgencia());

        
        dto.setModalidadePreferida(p.getModalidadePreferida());
        dto.setFrequenciaSessoes(p.getFrequenciaSessoes());
        dto.setDuracaoTratamentoEsperada(p.getDuracaoTratamentoEsperada());

        
        dto.setGeneroTerapeutaPreferido(p.getGeneroTerapeutaPreferido());
        dto.setFaixaEtariaTerapeutaPreferida(p.getFaixaEtariaTerapeutaPreferida());

        
        dto.setHistoricoTerapia(p.getHistoricoTerapia());
        dto.setQuandoParouTerapia(p.getQuandoParouTerapia());
        dto.setMotivoInterrupcao(p.getMotivoInterrupcao());
        dto.setAbordagemAnterior(p.getAbordagemAnterior());
        dto.setExperienciaAvaliacao(p.getExperienciaAvaliacao());
        dto.setAcompanhamentoPsiquiatrico(p.getAcompanhamentoPsiquiatrico());

        
        dto.setLgbtqSupportImportante(p.getLgbtqSupportImportante());
        dto.setOrientacaoSexual(p.getOrientacaoSexual());
        dto.setIdentidadeGenero(p.getIdentidadeGenero());
        dto.setQuestoesReligiosasImportantes(p.getQuestoesReligiosasImportantes());

        
        dto.setApresentacaoIndividual(p.getApresentacaoIndividual());
        dto.setMetasLongoPrazo(p.getMetasLongoPrazo());
        dto.setExperienciaAutoconhecimento(p.getExperienciaAutoconhecimento());
        dto.setInteresseGruposTerapia(p.getInteresseGruposTerapia());
        dto.setDisponibilidadeTarefasCasa(p.getDisponibilidadeTarefasCasa());

        
        dto.setFlexibilidadeHorarios(p.getFlexibilidadeHorarios());
        dto.setHorariosPreferenciais(p.getHorariosPreferenciais());
        dto.setDiasDisponiveis(p.getDiasDisponiveis());
        dto.setDisponibilidadeHorarios(p.getDisponibilidadeHorarios());

        return dto;
    }
}
