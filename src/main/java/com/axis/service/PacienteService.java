package com.axis.service;

import com.axis.dto.PacienteDTO;
import com.axis.dto.PacienteRequestDTO;
import com.axis.model.Paciente;
import com.axis.model.Usuario;
import com.axis.model.Cep;
import com.axis.repository.PacienteRepository;
import com.axis.repository.UsuarioRepository;
import com.axis.repository.CepRepository;
import com.axis.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class PacienteService {
    @Autowired
    private PacienteRepository pacienteRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CepService cepService;

    @Autowired
    private CepRepository cepRepository;

    
    public PacienteDTO criarPaciente(PacienteRequestDTO request) {
        
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + request.getUsuarioId()));

        
        if (pacienteRepository.findById(request.getUsuarioId()).isPresent()) {
            throw new RuntimeException("Já existe um perfil de paciente para este usuário");
        }

        
        Paciente paciente = new Paciente();
        paciente.setUsuarioId(usuario.getId());

        
        paciente.setIdade(request.getIdade());
        paciente.setSexo(request.getSexo());
        paciente.setFaixaSalarial(request.getFaixaSalarial());

        
        
        Long idCep = cepService.processarEnderecoCadastro(
            request.getCep(),
            request.getModalidadePreferida(), 
            request.getLatitudeGPS(),
            request.getLongitudeGPS()
        );

        
        paciente.setIdCep(idCep);

        
        
        paciente.setNumeroEndereco(null);
        paciente.setComplementoEndereco(null);

        
        paciente.setLocalizacao(request.getLocalizacao());

        paciente.setDescricaoProblema(request.getDescricaoProblema());
        paciente.setDataCriacao(LocalDateTime.now());
        paciente.setDataAtualizacao(LocalDateTime.now());

        

        
        if (request.getProblemaPrincipal() != null) {
            paciente.setProblemaPrincipal(request.getProblemaPrincipal());
        }
        if (request.getProblemasSecundarios() != null && !request.getProblemasSecundarios().isEmpty()) {
            paciente.setProblemasSecundarios(request.getProblemasSecundarios().toArray(new String[0]));
        }
        if (request.getNivelUrgencia() != null) {
            paciente.setNivelUrgencia(request.getNivelUrgencia());
        }

        
        if (request.getModalidadePreferida() != null) {
            paciente.setModalidadePreferida(request.getModalidadePreferida());
        }
        if (request.getFrequenciaSessoes() != null) {
            paciente.setFrequenciaSessoes(request.getFrequenciaSessoes());
        }
        if (request.getDuracaoTratamentoEsperada() != null) {
            paciente.setDuracaoTratamentoEsperada(request.getDuracaoTratamentoEsperada());
        }
        if (request.getDiasDisponiveis() != null && !request.getDiasDisponiveis().isEmpty()) {
            paciente.setDiasDisponiveis(request.getDiasDisponiveis().toArray(new String[0]));
        }
        if (request.getHorariosPreferenciais() != null && !request.getHorariosPreferenciais().isEmpty()) {
            paciente.setHorariosPreferenciais(request.getHorariosPreferenciais().toArray(new String[0]));
        }
        if (request.getFlexibilidadeHorarios() != null) {
            paciente.setFlexibilidadeHorarios(request.getFlexibilidadeHorarios());
        }
        if (request.getDisponibilidadeHorarios() != null && !request.getDisponibilidadeHorarios().trim().isEmpty()) {
            paciente.setDisponibilidadeHorarios(request.getDisponibilidadeHorarios());
        }

        
        if (request.getGeneroTerapeutaPreferido() != null) {
            paciente.setGeneroTerapeutaPreferido(request.getGeneroTerapeutaPreferido());
        }
        if (request.getFaixaEtariaTerapeutaPreferida() != null) {
            paciente.setFaixaEtariaTerapeutaPreferida(request.getFaixaEtariaTerapeutaPreferida());
        }
        if (request.getPreferenciasProfissional() != null && !request.getPreferenciasProfissional().isEmpty()) {
            paciente.setPreferenciasProfissional(request.getPreferenciasProfissional().toArray(new String[0]));
        }

        
        if (request.getFaixaPrecoMinimo() != null) {
            paciente.setFaixaPrecoMinimo(request.getFaixaPrecoMinimo());
        }
        if (request.getFaixaPrecoMaximo() != null) {
            paciente.setFaixaPrecoMaximo(request.getFaixaPrecoMaximo());
        }
        if (request.getPossuiConvenio() != null) {
            paciente.setPossuiConvenio(request.getPossuiConvenio());
        }
        if (request.getNomeConvenio() != null) {
            paciente.setNomeConvenio(request.getNomeConvenio());
        }
        if (request.getDispostoParticular() != null) {
            paciente.setDispostoParticular(request.getDispostoParticular());
        }
        if (request.getPossuiApoioFinanceiro() != null) {
            paciente.setPossuiApoioFinanceiro(request.getPossuiApoioFinanceiro());
        }

        
        if (request.getHistoricoTerapia() != null) {
            paciente.setHistoricoTerapia(request.getHistoricoTerapia());
        }
        if (request.getQuandoParouTerapia() != null) {
            paciente.setQuandoParouTerapia(request.getQuandoParouTerapia());
        }
        if (request.getMotivoInterrupcao() != null) {
            paciente.setMotivoInterrupcao(request.getMotivoInterrupcao());
        }
        if (request.getAbordagemAnterior() != null) {
            paciente.setAbordagemAnterior(request.getAbordagemAnterior());
        }
        if (request.getExperienciaAvaliacao() != null) {
            paciente.setExperienciaAvaliacao(request.getExperienciaAvaliacao());
        }
        if (request.getAcompanhamentoPsiquiatrico() != null) {
            paciente.setAcompanhamentoPsiquiatrico(request.getAcompanhamentoPsiquiatrico());
        }

        
        if (request.getLgbtqSupportImportante() != null) {
            paciente.setLgbtqSupportImportante(request.getLgbtqSupportImportante());
        }
        if (request.getOrientacaoSexual() != null) {
            paciente.setOrientacaoSexual(request.getOrientacaoSexual());
        }
        if (request.getIdentidadeGenero() != null) {
            paciente.setIdentidadeGenero(request.getIdentidadeGenero());
        }
        if (request.getQuestoesReligiosasImportantes() != null) {
            paciente.setQuestoesReligiosasImportantes(request.getQuestoesReligiosasImportantes());
        }

        
        if (request.getApresentacaoIndividual() != null) {
            paciente.setApresentacaoIndividual(request.getApresentacaoIndividual());
        }
        if (request.getMetasLongoPrazo() != null) {
            paciente.setMetasLongoPrazo(request.getMetasLongoPrazo());
        }
        if (request.getExperienciaAutoconhecimento() != null) {
            paciente.setExperienciaAutoconhecimento(request.getExperienciaAutoconhecimento());
        }
        if (request.getInteresseGruposTerapia() != null) {
            paciente.setInteresseGruposTerapia(request.getInteresseGruposTerapia());
        }
        if (request.getDisponibilidadeTarefasCasa() != null) {
            paciente.setDisponibilidadeTarefasCasa(request.getDisponibilidadeTarefasCasa());
        }

        Paciente pacienteSalvo = pacienteRepository.save(paciente);

        
        usuario.setStatusPerfil("COMPLETO");
        usuarioRepository.save(usuario);

        return converterParaDTO(pacienteSalvo);
    }

    
    public Paciente obterPacientePorId(Long id) {
        return pacienteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Paciente não encontrado com ID: " + id));
    }

    
    public PacienteDTO atualizarPaciente(Long id, PacienteRequestDTO request) {
        Paciente paciente = obterPacientePorId(id);

        
        
        if (request.getIdade() != null) paciente.setIdade(request.getIdade());
        if (request.getSexo() != null && !request.getSexo().isBlank()) paciente.setSexo(request.getSexo());

        paciente.setFaixaSalarial(request.getFaixaSalarial());
        paciente.setLocalizacao(request.getLocalizacao());
        paciente.setDescricaoProblema(request.getDescricaoProblema());
        paciente.setDataAtualizacao(LocalDateTime.now());

        
        if (request.getProblemaPrincipal() != null) paciente.setProblemaPrincipal(request.getProblemaPrincipal());
        if (request.getProblemasSecundarios() != null && !request.getProblemasSecundarios().isEmpty())
            paciente.setProblemasSecundarios(request.getProblemasSecundarios().toArray(new String[0]));
        if (request.getNivelUrgencia() != null) paciente.setNivelUrgencia(request.getNivelUrgencia());
        if (request.getModalidadePreferida() != null) paciente.setModalidadePreferida(request.getModalidadePreferida());
        if (request.getFrequenciaSessoes() != null) paciente.setFrequenciaSessoes(request.getFrequenciaSessoes());
        if (request.getDuracaoTratamentoEsperada() != null) paciente.setDuracaoTratamentoEsperada(request.getDuracaoTratamentoEsperada());
        if (request.getDiasDisponiveis() != null && !request.getDiasDisponiveis().isEmpty())
            paciente.setDiasDisponiveis(request.getDiasDisponiveis().toArray(new String[0]));
        if (request.getHorariosPreferenciais() != null && !request.getHorariosPreferenciais().isEmpty())
            paciente.setHorariosPreferenciais(request.getHorariosPreferenciais().toArray(new String[0]));
        if (request.getFlexibilidadeHorarios() != null) paciente.setFlexibilidadeHorarios(request.getFlexibilidadeHorarios());
        if (request.getGeneroTerapeutaPreferido() != null) paciente.setGeneroTerapeutaPreferido(request.getGeneroTerapeutaPreferido());
        if (request.getFaixaEtariaTerapeutaPreferida() != null) paciente.setFaixaEtariaTerapeutaPreferida(request.getFaixaEtariaTerapeutaPreferida());
        if (request.getFaixaPrecoMinimo() != null) paciente.setFaixaPrecoMinimo(request.getFaixaPrecoMinimo());
        if (request.getFaixaPrecoMaximo() != null) paciente.setFaixaPrecoMaximo(request.getFaixaPrecoMaximo());
        if (request.getPossuiConvenio() != null) paciente.setPossuiConvenio(request.getPossuiConvenio());
        if (request.getNomeConvenio() != null) paciente.setNomeConvenio(request.getNomeConvenio());
        if (request.getDispostoParticular() != null) paciente.setDispostoParticular(request.getDispostoParticular());
        if (request.getPossuiApoioFinanceiro() != null) paciente.setPossuiApoioFinanceiro(request.getPossuiApoioFinanceiro());
        if (request.getHistoricoTerapia() != null) paciente.setHistoricoTerapia(request.getHistoricoTerapia());
        if (request.getQuandoParouTerapia() != null) paciente.setQuandoParouTerapia(request.getQuandoParouTerapia());
        if (request.getMotivoInterrupcao() != null) paciente.setMotivoInterrupcao(request.getMotivoInterrupcao());
        if (request.getAbordagemAnterior() != null) paciente.setAbordagemAnterior(request.getAbordagemAnterior());
        if (request.getExperienciaAvaliacao() != null) paciente.setExperienciaAvaliacao(request.getExperienciaAvaliacao());
        if (request.getAcompanhamentoPsiquiatrico() != null) paciente.setAcompanhamentoPsiquiatrico(request.getAcompanhamentoPsiquiatrico());
        if (request.getLgbtqSupportImportante() != null) paciente.setLgbtqSupportImportante(request.getLgbtqSupportImportante());
        if (request.getOrientacaoSexual() != null) paciente.setOrientacaoSexual(request.getOrientacaoSexual());
        if (request.getIdentidadeGenero() != null) paciente.setIdentidadeGenero(request.getIdentidadeGenero());
        if (request.getQuestoesReligiosasImportantes() != null) paciente.setQuestoesReligiosasImportantes(request.getQuestoesReligiosasImportantes());
        if (request.getApresentacaoIndividual() != null) paciente.setApresentacaoIndividual(request.getApresentacaoIndividual());
        if (request.getMetasLongoPrazo() != null) paciente.setMetasLongoPrazo(request.getMetasLongoPrazo());
        if (request.getExperienciaAutoconhecimento() != null) paciente.setExperienciaAutoconhecimento(request.getExperienciaAutoconhecimento());
        if (request.getInteresseGruposTerapia() != null) paciente.setInteresseGruposTerapia(request.getInteresseGruposTerapia());
        if (request.getDisponibilidadeTarefasCasa() != null) paciente.setDisponibilidadeTarefasCasa(request.getDisponibilidadeTarefasCasa());

        Paciente pacienteAtualizado = pacienteRepository.save(paciente);
        return converterParaDTO(pacienteAtualizado);
    }

    
    public void deletarPaciente(Long id) {
        Paciente paciente = obterPacientePorId(id);
        pacienteRepository.delete(paciente);
        
    }

    
    private String construirLocalizacaoComCep(Cep cep, String numero, String complemento) {
        StringBuilder localizacao = new StringBuilder();

        
        if (cep.getNmLogradouro() != null && !cep.getNmLogradouro().isEmpty()) {
            localizacao.append(cep.getNmLogradouro());
        }

        
        if (numero != null && !numero.isEmpty()) {
            if (localizacao.length() > 0) localizacao.append(", ");
            localizacao.append(numero);
        }

        
        if (complemento != null && !complemento.isEmpty()) {
            if (localizacao.length() > 0) localizacao.append(", ");
            localizacao.append(complemento);
        }

        
        if (cep.getNmBairro() != null && !cep.getNmBairro().isEmpty()) {
            if (localizacao.length() > 0) localizacao.append(" - ");
            localizacao.append(cep.getNmBairro());
        }

        
        if (cep.getCidade() != null && !cep.getCidade().isEmpty()) {
            if (localizacao.length() > 0) localizacao.append(", ");
            localizacao.append(cep.getCidade());
        }

        
        if (cep.getUf() != null && !cep.getUf().isEmpty()) {
            if (localizacao.length() > 0) localizacao.append(" - ");
            localizacao.append(cep.getUf());
        }

        
        if (cep.getNrCep() != null && !cep.getNrCep().isEmpty()) {
            if (localizacao.length() > 0) localizacao.append(" - CEP: ");
            localizacao.append(cep.getNrCep());
        }

        return localizacao.toString();
    }

    
    public PacienteDTO converterParaDTO(Paciente paciente) {
        Usuario usuario = usuarioRepository.findById(paciente.getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));

        PacienteDTO dto = new PacienteDTO();
        dto.setUsuarioId(paciente.getUsuarioId());
        dto.setNome(usuario.getNome());
        dto.setEmail(usuario.getEmail());
        dto.setIdade(paciente.getIdade());
        dto.setSexo(paciente.getSexo());
        dto.setFaixaSalarial(paciente.getFaixaSalarial());

        
        
        dto.setLocalizacao(paciente.getLocalizacao());

        dto.setDescricaoProblema(paciente.getDescricaoProblema());
        
        
        dto.setProblemaPrincipal(paciente.getProblemaPrincipal());
        dto.setProblemasSecundarios(paciente.getProblemasSecundarios());
        dto.setNivelUrgencia(paciente.getNivelUrgencia());
        dto.setModalidadePreferida(paciente.getModalidadePreferida());
        dto.setFrequenciaSessoes(paciente.getFrequenciaSessoes());
        dto.setDuracaoTratamentoEsperada(paciente.getDuracaoTratamentoEsperada());
        dto.setGeneroTerapeutaPreferido(paciente.getGeneroTerapeutaPreferido());
        dto.setFaixaEtariaTerapeutaPreferida(paciente.getFaixaEtariaTerapeutaPreferida());
        dto.setFaixaPrecoMinimo(paciente.getFaixaPrecoMinimo());
        dto.setFaixaPrecoMaximo(paciente.getFaixaPrecoMaximo());
        dto.setPossuiConvenio(paciente.getPossuiConvenio());
        dto.setNomeConvenio(paciente.getNomeConvenio());
        dto.setDispostoParticular(paciente.getDispostoParticular());
        dto.setPossuiApoioFinanceiro(paciente.getPossuiApoioFinanceiro());
        dto.setHistoricoTerapia(paciente.getHistoricoTerapia());
        dto.setQuandoParouTerapia(paciente.getQuandoParouTerapia());
        dto.setMotivoInterrupcao(paciente.getMotivoInterrupcao());
        dto.setAbordagemAnterior(paciente.getAbordagemAnterior());
        dto.setExperienciaAvaliacao(paciente.getExperienciaAvaliacao());
        dto.setAcompanhamentoPsiquiatrico(paciente.getAcompanhamentoPsiquiatrico());
        dto.setLgbtqSupportImportante(paciente.getLgbtqSupportImportante());
        dto.setOrientacaoSexual(paciente.getOrientacaoSexual());
        dto.setIdentidadeGenero(paciente.getIdentidadeGenero());
        dto.setQuestoesReligiosasImportantes(paciente.getQuestoesReligiosasImportantes());
        dto.setApresentacaoIndividual(paciente.getApresentacaoIndividual());
        dto.setMetasLongoPrazo(paciente.getMetasLongoPrazo());
        dto.setExperienciaAutoconhecimento(paciente.getExperienciaAutoconhecimento());
        dto.setInteresseGruposTerapia(paciente.getInteresseGruposTerapia());
        dto.setDisponibilidadeTarefasCasa(paciente.getDisponibilidadeTarefasCasa());
        dto.setFlexibilidadeHorarios(paciente.getFlexibilidadeHorarios());
        dto.setHorariosPreferenciais(paciente.getHorariosPreferenciais());
        dto.setDiasDisponiveis(paciente.getDiasDisponiveis());

        
        dto.setProfissao(paciente.getProfissao());
        dto.setEstadoCivil(paciente.getEstadoCivil());
        dto.setTempoRelacionamentoAnos(paciente.getTempoRelacionamentoAnos());
        dto.setEscolaridade(paciente.getEscolaridade());
        dto.setMoraCom(paciente.getMoraCom());
        dto.setReligiao(paciente.getReligiao());
        dto.setReligiaoOutras(paciente.getReligiaoOutras());

        
        dto.setIdCep(paciente.getIdCep());
        if (paciente.getCep() != null) {
            dto.setCep(paciente.getCep().getNrCep());
        }
        dto.setNumeroEndereco(paciente.getNumeroEndereco());
        dto.setComplementoEndereco(paciente.getComplementoEndereco());
        dto.setComplementoLocalizacao(paciente.getComplementoLocalizacao());

        
        dto.setDisponibilidadeHorarios(paciente.getDisponibilidadeHorarios());

        
        dto.setPreferenciasProfissional(paciente.getPreferenciasProfissional());

        return dto;
    }

    
    public PacienteDTO salvarProgressoCadastro(PacienteRequestDTO request) {
        
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + request.getUsuarioId()));

        
        Paciente paciente = pacienteRepository.findById(request.getUsuarioId()).orElse(null);

        if (paciente == null) {
            
            paciente = new Paciente();
            paciente.setUsuarioId(usuario.getId());
            paciente.setDataCriacao(LocalDateTime.now());
        }

        
        
        if (request.getIdade() != null) {
            paciente.setIdade(request.getIdade());
        }
        if (request.getSexo() != null && !request.getSexo().isBlank()) {
            paciente.setSexo(request.getSexo());
        }
        if (request.getFaixaSalarial() != null) {
            paciente.setFaixaSalarial(request.getFaixaSalarial());
        }
        if (request.getLocalizacao() != null) {
            paciente.setLocalizacao(request.getLocalizacao());
        }
        if (request.getDescricaoProblema() != null) {
            paciente.setDescricaoProblema(request.getDescricaoProblema());
        }

        
        if (request.getProfissao() != null && !request.getProfissao().isBlank()) {
            paciente.setProfissao(request.getProfissao());
        }
        if (request.getEstadoCivil() != null && !request.getEstadoCivil().isBlank()) {
            paciente.setEstadoCivil(request.getEstadoCivil());
        }
        if (request.getTempoRelacionamentoAnos() != null) {
            paciente.setTempoRelacionamentoAnos(request.getTempoRelacionamentoAnos());
        }
        if (request.getEscolaridade() != null && !request.getEscolaridade().isBlank()) {
            paciente.setEscolaridade(request.getEscolaridade());
        }
        if (request.getMoraCom() != null && !request.getMoraCom().isBlank()) {
            paciente.setMoraCom(request.getMoraCom());
        }
        if (request.getReligiao() != null && !request.getReligiao().isBlank()) {
            paciente.setReligiao(request.getReligiao());
        }
        if (request.getReligiaoOutras() != null && !request.getReligiaoOutras().isBlank()) {
            paciente.setReligiaoOutras(request.getReligiaoOutras());
        }

        
        if (request.getCep() != null && !request.getCep().trim().isEmpty()) {
            Long idCep = cepService.processarEnderecoCadastro(
                request.getCep(),
                request.getModalidadePreferida(),
                request.getLatitudeGPS(),
                request.getLongitudeGPS()
            );
            paciente.setIdCep(idCep);
            paciente.setNumeroEndereco(request.getNumero());
            paciente.setComplementoEndereco(request.getComplemento());
        }

        
        if (request.getProblemaPrincipal() != null) {
            paciente.setProblemaPrincipal(request.getProblemaPrincipal());
        }
        if (request.getProblemasSecundarios() != null && !request.getProblemasSecundarios().isEmpty()) {
            paciente.setProblemasSecundarios(request.getProblemasSecundarios().toArray(new String[0]));
        }
        if (request.getNivelUrgencia() != null) {
            paciente.setNivelUrgencia(request.getNivelUrgencia());
        }

        
        if (request.getModalidadePreferida() != null) {
            paciente.setModalidadePreferida(request.getModalidadePreferida());
        }
        if (request.getFrequenciaSessoes() != null) {
            paciente.setFrequenciaSessoes(request.getFrequenciaSessoes());
        }
        if (request.getDuracaoTratamentoEsperada() != null) {
            paciente.setDuracaoTratamentoEsperada(request.getDuracaoTratamentoEsperada());
        }
        if (request.getDiasDisponiveis() != null && !request.getDiasDisponiveis().isEmpty()) {
            paciente.setDiasDisponiveis(request.getDiasDisponiveis().toArray(new String[0]));
        }
        if (request.getHorariosPreferenciais() != null && !request.getHorariosPreferenciais().isEmpty()) {
            paciente.setHorariosPreferenciais(request.getHorariosPreferenciais().toArray(new String[0]));
        }
        if (request.getFlexibilidadeHorarios() != null) {
            paciente.setFlexibilidadeHorarios(request.getFlexibilidadeHorarios());
        }
        if (request.getDisponibilidadeHorarios() != null && !request.getDisponibilidadeHorarios().trim().isEmpty()) {
            paciente.setDisponibilidadeHorarios(request.getDisponibilidadeHorarios());
        }

        
        if (request.getGeneroTerapeutaPreferido() != null) {
            paciente.setGeneroTerapeutaPreferido(request.getGeneroTerapeutaPreferido());
        }
        if (request.getFaixaEtariaTerapeutaPreferida() != null) {
            paciente.setFaixaEtariaTerapeutaPreferida(request.getFaixaEtariaTerapeutaPreferida());
        }
        if (request.getPreferenciasProfissional() != null && !request.getPreferenciasProfissional().isEmpty()) {
            paciente.setPreferenciasProfissional(request.getPreferenciasProfissional().toArray(new String[0]));
        }

        
        if (request.getFaixaPrecoMinimo() != null) {
            paciente.setFaixaPrecoMinimo(request.getFaixaPrecoMinimo());
        }
        if (request.getFaixaPrecoMaximo() != null) {
            paciente.setFaixaPrecoMaximo(request.getFaixaPrecoMaximo());
        }
        if (request.getPossuiConvenio() != null) {
            paciente.setPossuiConvenio(request.getPossuiConvenio());
        }
        if (request.getNomeConvenio() != null) {
            paciente.setNomeConvenio(request.getNomeConvenio());
        }
        if (request.getDispostoParticular() != null) {
            paciente.setDispostoParticular(request.getDispostoParticular());
        }
        if (request.getPossuiApoioFinanceiro() != null) {
            paciente.setPossuiApoioFinanceiro(request.getPossuiApoioFinanceiro());
        }

        
        if (request.getHistoricoTerapia() != null) {
            paciente.setHistoricoTerapia(request.getHistoricoTerapia());
        }
        if (request.getQuandoParouTerapia() != null) {
            paciente.setQuandoParouTerapia(request.getQuandoParouTerapia());
        }
        if (request.getMotivoInterrupcao() != null) {
            paciente.setMotivoInterrupcao(request.getMotivoInterrupcao());
        }
        if (request.getAbordagemAnterior() != null) {
            paciente.setAbordagemAnterior(request.getAbordagemAnterior());
        }
        if (request.getExperienciaAvaliacao() != null) {
            paciente.setExperienciaAvaliacao(request.getExperienciaAvaliacao());
        }
        if (request.getAcompanhamentoPsiquiatrico() != null) {
            paciente.setAcompanhamentoPsiquiatrico(request.getAcompanhamentoPsiquiatrico());
        }

        
        if (request.getLgbtqSupportImportante() != null) {
            paciente.setLgbtqSupportImportante(request.getLgbtqSupportImportante());
        }
        if (request.getOrientacaoSexual() != null) {
            paciente.setOrientacaoSexual(request.getOrientacaoSexual());
        }
        if (request.getIdentidadeGenero() != null) {
            paciente.setIdentidadeGenero(request.getIdentidadeGenero());
        }
        if (request.getQuestoesReligiosasImportantes() != null) {
            paciente.setQuestoesReligiosasImportantes(request.getQuestoesReligiosasImportantes());
        }

        
        if (request.getApresentacaoIndividual() != null) {
            paciente.setApresentacaoIndividual(request.getApresentacaoIndividual());
        }
        if (request.getMetasLongoPrazo() != null) {
            paciente.setMetasLongoPrazo(request.getMetasLongoPrazo());
        }
        if (request.getExperienciaAutoconhecimento() != null) {
            paciente.setExperienciaAutoconhecimento(request.getExperienciaAutoconhecimento());
        }
        if (request.getInteresseGruposTerapia() != null) {
            paciente.setInteresseGruposTerapia(request.getInteresseGruposTerapia());
        }
        if (request.getDisponibilidadeTarefasCasa() != null) {
            paciente.setDisponibilidadeTarefasCasa(request.getDisponibilidadeTarefasCasa());
        }

        
        paciente.setDataAtualizacao(LocalDateTime.now());

        
        Paciente pacienteSalvo = pacienteRepository.save(paciente);

        return converterParaDTO(pacienteSalvo);
    }

    
    public void marcarPerfilComoCompleto(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + usuarioId));

        usuario.setStatusPerfil("COMPLETO");
        usuario.setDataAtualizacao(LocalDateTime.now());
        usuarioRepository.save(usuario);
    }
}