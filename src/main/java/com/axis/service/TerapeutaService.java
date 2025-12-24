package com.axis.service;

import com.axis.dto.TerapeutaDTO;
import com.axis.dto.TerapeutaRequestDTO;
import com.axis.dto.InformacoesPessoaisDTO;
import com.axis.model.Terapeuta;
import com.axis.model.Usuario;
import com.axis.model.Cep;
import com.axis.model.Role;
import com.axis.repository.TerapeutaRepository;
import com.axis.repository.UsuarioRepository;
import com.axis.repository.CepRepository;
import com.axis.exception.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.math.BigDecimal;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class TerapeutaService {
    @Autowired
    private TerapeutaRepository terapeutaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private CepService cepService;

    @Autowired
    private CepRepository cepRepository;

    
    public TerapeutaDTO criarTerapeuta(TerapeutaRequestDTO request) {
        
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + request.getUsuarioId()));

        
        if (terapeutaRepository.findById(request.getUsuarioId()).isPresent()) {
            throw new RuntimeException("Já existe um perfil de terapeuta para este usuário");
        }

        
        Terapeuta terapeuta = new Terapeuta();
        terapeuta.setUsuarioId(usuario.getId());
        terapeuta.setCpf(request.getCpf());
        terapeuta.setCrp(request.getCrp());
        terapeuta.setInstituicaoFormacao(request.getInstituicaoFormacao());
        terapeuta.setAnoFormacao(request.getAnoFormacao());
        terapeuta.setEspecialidades(request.getEspecialidades());
        terapeuta.setBio(request.getBio());
        terapeuta.setLocalizacaoClinica(request.getLocalizacaoClinica());
        terapeuta.setMetodosPagamento(request.getMetodosPagamento());
        terapeuta.setValorSessao(request.getValorSessao());
        terapeuta.setDataCriacao(LocalDateTime.now());
        terapeuta.setDataAtualizacao(LocalDateTime.now());

        Terapeuta terapeutaSalvo = terapeutaRepository.save(terapeuta);

        
        usuario.setStatusPerfil("COMPLETO");
        usuarioRepository.save(usuario);

        return converterParaDTO(terapeutaSalvo);
    }

    
    public Terapeuta obterTerapeutaPorId(Long id) {
        return terapeutaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Terapeuta não encontrado com ID: " + id));
    }

    
    public Terapeuta atualizarTerapeuta(Long id, Terapeuta terapeutaAtualizado) {
        Terapeuta terapeuta = obterTerapeutaPorId(id);

        
        
        terapeuta.setCrp(terapeutaAtualizado.getCrp());
        if (terapeutaAtualizado.getInstituicaoFormacao() != null) {
            terapeuta.setInstituicaoFormacao(terapeutaAtualizado.getInstituicaoFormacao());
        }
        if (terapeutaAtualizado.getAnoFormacao() != null) {
            terapeuta.setAnoFormacao(terapeutaAtualizado.getAnoFormacao());
        }
        if (terapeutaAtualizado.getEspecialidades() != null) {
            terapeuta.setEspecialidades(terapeutaAtualizado.getEspecialidades());
        }
        if (terapeutaAtualizado.getBio() != null) {
            terapeuta.setBio(terapeutaAtualizado.getBio());
        }
        if (terapeutaAtualizado.getValorSessao() != null) {
            terapeuta.setValorSessao(terapeutaAtualizado.getValorSessao());
        }

        
        if (terapeutaAtualizado.getAbordagensPrincipais() != null) {
            terapeuta.setAbordagensPrincipais(terapeutaAtualizado.getAbordagensPrincipais());
        }
        if (terapeutaAtualizado.getAbordagensSecundarias() != null) {
            terapeuta.setAbordagensSecundarias(terapeutaAtualizado.getAbordagensSecundarias());
        }
        if (terapeutaAtualizado.getTipoTerapia() != null) {
            terapeuta.setTipoTerapia(terapeutaAtualizado.getTipoTerapia());
        }
        if (terapeutaAtualizado.getModalidadeAtendimento() != null) {
            terapeuta.setModalidadeAtendimento(terapeutaAtualizado.getModalidadeAtendimento());
        }
        if (terapeutaAtualizado.getPrimeiraConsultaGratuita() != null) {
            terapeuta.setPrimeiraConsultaGratuita(terapeutaAtualizado.getPrimeiraConsultaGratuita());
        }
        if (terapeutaAtualizado.getDiasAtendimento() != null) {
            terapeuta.setDiasAtendimento(terapeutaAtualizado.getDiasAtendimento());
        }
        if (terapeutaAtualizado.getDisponibilidadeHorarios() != null) {
            terapeuta.setDisponibilidadeHorarios(terapeutaAtualizado.getDisponibilidadeHorarios());
        }
        if (terapeutaAtualizado.getDiaReuniao() != null) {
            terapeuta.setDiaReuniao(terapeutaAtualizado.getDiaReuniao());
        }
        if (terapeutaAtualizado.getHorarioReuniao() != null) {
            terapeuta.setHorarioReuniao(terapeutaAtualizado.getHorarioReuniao());
        }
        if (terapeutaAtualizado.getExperienciaAnos() != null) {
            terapeuta.setExperienciaAnos(terapeutaAtualizado.getExperienciaAnos());
        }
        
        
        terapeuta.setOQueNaoGostaAtender(terapeutaAtualizado.getOQueNaoGostaAtender());
        
        if (terapeutaAtualizado.getCasesSucesso() != null) {
            terapeuta.setCasesSucesso(terapeutaAtualizado.getCasesSucesso());
        }
        if (terapeutaAtualizado.getFeedbackPacientes() != null) {
            terapeuta.setFeedbackPacientes(terapeutaAtualizado.getFeedbackPacientes());
        }
        if (terapeutaAtualizado.getDemandaMaisComum() != null) {
            terapeuta.setDemandaMaisComum(terapeutaAtualizado.getDemandaMaisComum());
        }

        
        if (terapeutaAtualizado.getReligiao() != null) {
            terapeuta.setReligiao(terapeutaAtualizado.getReligiao());
        }
        if (terapeutaAtualizado.getEstadoCivil() != null) {
            terapeuta.setEstadoCivil(terapeutaAtualizado.getEstadoCivil());
        }
        if (terapeutaAtualizado.getAnosRelacionamento() != null) {
            terapeuta.setAnosRelacionamento(terapeutaAtualizado.getAnosRelacionamento());
        }
        if (terapeutaAtualizado.getPossuiFilhos() != null) {
            terapeuta.setPossuiFilhos(terapeutaAtualizado.getPossuiFilhos());
        }
        if (terapeutaAtualizado.getQuantidadeFilhos() != null) {
            terapeuta.setQuantidadeFilhos(terapeutaAtualizado.getQuantidadeFilhos());
        }
        if (terapeutaAtualizado.getFilhosDeficiencia() != null) {
            terapeuta.setFilhosDeficiencia(terapeutaAtualizado.getFilhosDeficiencia());
        }
        if (terapeutaAtualizado.getJustificativaDeficiencia() != null) {
            terapeuta.setJustificativaDeficiencia(terapeutaAtualizado.getJustificativaDeficiencia());
        }

        
        if (terapeutaAtualizado.getMetodosPagamento() != null) {
            terapeuta.setMetodosPagamento(terapeutaAtualizado.getMetodosPagamento());
        }
        if (terapeutaAtualizado.getPoliticaCancelamento() != null) {
            terapeuta.setPoliticaCancelamento(terapeutaAtualizado.getPoliticaCancelamento());
        }
        if (terapeutaAtualizado.getFaixaEtariaAtendimento() != null) {
            terapeuta.setFaixaEtariaAtendimento(terapeutaAtualizado.getFaixaEtariaAtendimento());
        }
        if (terapeutaAtualizado.getAceitaConvenio() != null) {
            terapeuta.setAceitaConvenio(terapeutaAtualizado.getAceitaConvenio());
        }
        if (terapeutaAtualizado.getConveniosAceitos() != null) {
            terapeuta.setConveniosAceitos(terapeutaAtualizado.getConveniosAceitos());
        }

        
        if (terapeutaAtualizado.getHobby() != null) {
            terapeuta.setHobby(terapeutaAtualizado.getHobby());
        }
        if (terapeutaAtualizado.getAssuntosPrediletos() != null) {
            terapeuta.setAssuntosPrediletos(terapeutaAtualizado.getAssuntosPrediletos());
        }
        if (terapeutaAtualizado.getInspiracao() != null) {
            terapeuta.setInspiracao(terapeutaAtualizado.getInspiracao());
        }
        if (terapeutaAtualizado.getFilmesMarcantes() != null) {
            terapeuta.setFilmesMarcantes(terapeutaAtualizado.getFilmesMarcantes());
        }
        if (terapeutaAtualizado.getSuperacoes() != null) {
            terapeuta.setSuperacoes(terapeutaAtualizado.getSuperacoes());
        }
        if (terapeutaAtualizado.getCausaSangue() != null) {
            terapeuta.setCausaSangue(terapeutaAtualizado.getCausaSangue());
        }
        if (terapeutaAtualizado.getMaiorMudanca() != null) {
            terapeuta.setMaiorMudanca(terapeutaAtualizado.getMaiorMudanca());
        }
        if (terapeutaAtualizado.getGastariaDinheiro() != null) {
            terapeuta.setGastariaDinheiro(terapeutaAtualizado.getGastariaDinheiro());
        }
        if (terapeutaAtualizado.getMarcaDeixar() != null) {
            terapeuta.setMarcaDeixar(terapeutaAtualizado.getMarcaDeixar());
        }
        if (terapeutaAtualizado.getTrabalhoAntesSaudeMental() != null) {
            terapeuta.setTrabalhoAntesSaudeMental(terapeutaAtualizado.getTrabalhoAntesSaudeMental());
        }
        if (terapeutaAtualizado.getAtenderiaPorAmor() != null) {
            terapeuta.setAtenderiaPorAmor(terapeutaAtualizado.getAtenderiaPorAmor());
        }

        
        if (terapeutaAtualizado.getRedesSociais() != null) {
            terapeuta.setRedesSociais(terapeutaAtualizado.getRedesSociais());
        }

        
        if (terapeutaAtualizado.getLgbtqFriendly() != null) {
            terapeuta.setLgbtqFriendly(terapeutaAtualizado.getLgbtqFriendly());
        }
        if (terapeutaAtualizado.getExperienciaCasosLgbtq() != null) {
            terapeuta.setExperienciaCasosLgbtq(terapeutaAtualizado.getExperienciaCasosLgbtq());
        }
        if (terapeutaAtualizado.getCertificacoesLgbtq() != null) {
            terapeuta.setCertificacoesLgbtq(terapeutaAtualizado.getCertificacoesLgbtq());
        }

        
        if (terapeutaAtualizado.getLocalizacaoClinica() != null) {
            terapeuta.setLocalizacaoClinica(terapeutaAtualizado.getLocalizacaoClinica());
        }

        terapeuta.setDataAtualizacao(java.time.LocalDateTime.now());

        return terapeutaRepository.save(terapeuta);
    }

    
    public void deletarTerapeuta(Long id) {
        Terapeuta terapeuta = obterTerapeutaPorId(id);
        terapeutaRepository.delete(terapeuta);
        
    }

    
    public TerapeutaDTO converterParaDTO(Terapeuta terapeuta) {
        Usuario usuario = usuarioRepository.findById(terapeuta.getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado"));
        
        TerapeutaDTO dto = new TerapeutaDTO();
        dto.setUsuarioId(terapeuta.getUsuarioId());
        dto.setNome(usuario.getNome());
        dto.setEmail(usuario.getEmail());
        dto.setTelefone(usuario.getTelefone());
        dto.setCpf(terapeuta.getCpf());
        dto.setCrp(terapeuta.getCrp());
        dto.setInstituicaoFormacao(terapeuta.getInstituicaoFormacao());
        dto.setAnoFormacao(terapeuta.getAnoFormacao());
        dto.setEspecialidades(terapeuta.getEspecialidades());
        dto.setBio(terapeuta.getBio());

        
        if (terapeuta.getIdCep() != null) {
            Cep cep = cepRepository.findById(terapeuta.getIdCep()).orElse(null);
            if (cep != null) {
                String localizacaoCompleta = construirLocalizacaoComCep(
                    cep,
                    terapeuta.getNumeroEndereco(),
                    terapeuta.getComplementoEndereco()
                );
                dto.setLocalizacaoClinica(localizacaoCompleta);
            } else {
                
                dto.setLocalizacaoClinica(terapeuta.getLocalizacaoClinica());
            }
        } else {
            
            dto.setLocalizacaoClinica(terapeuta.getLocalizacaoClinica());
        }

        dto.setMetodosPagamento(terapeuta.getMetodosPagamento());
        dto.setValorSessao(terapeuta.getValorSessao());
        
        
        dto.setGenero(terapeuta.getGenero());
        dto.setDataNascimento(terapeuta.getDataNascimento());
        dto.setIdadeCalculada(terapeuta.getIdadeCalculada());
        dto.setExperienciaAnos(terapeuta.getExperienciaAnos());
        dto.setPosGraduacao(terapeuta.getPosGraduacao());
        dto.setCertificacoes(terapeuta.getCertificacoes());
        dto.setAbordagensPrincipais(terapeuta.getAbordagensPrincipais());
        dto.setAbordagensSecundarias(terapeuta.getAbordagensSecundarias());
        dto.setTipoTerapia(terapeuta.getTipoTerapia());
        dto.setModalidadeAtendimento(terapeuta.getModalidadeAtendimento());
        dto.setFaixaEtariaAtendimento(terapeuta.getFaixaEtariaAtendimento());
        dto.setAceitaConvenio(terapeuta.getAceitaConvenio());
        dto.setConveniosAceitos(terapeuta.getConveniosAceitos());
        dto.setDisponibilidadeHorarios(terapeuta.getDisponibilidadeHorarios());
        dto.setDiasAtendimento(terapeuta.getDiasAtendimento());
        dto.setDiaReuniao(terapeuta.getDiaReuniao());
        dto.setHorarioReuniao(terapeuta.getHorarioReuniao());
        dto.setHorarioInicio(terapeuta.getHorarioInicio());
        dto.setHorarioFim(terapeuta.getHorarioFim());
        dto.setLgbtqFriendly(terapeuta.getLgbtqFriendly());
        dto.setFormacaoDiversidade(terapeuta.getFormacaoDiversidade());
        dto.setCertificacoesLgbtq(terapeuta.getCertificacoesLgbtq());
        dto.setExperienciaCasosLgbtq(terapeuta.getExperienciaCasosLgbtq());
        dto.setNotaMedia(terapeuta.getNotaMedia());
        dto.setTotalAvaliacoes(terapeuta.getTotalAvaliacoes());
        dto.setTotalPacientesAtendidos(terapeuta.getTotalPacientesAtendidos());
        dto.setAnosPlataforma(terapeuta.getAnosPlataforma());
        dto.setPrimeiraConsultaGratuita(terapeuta.getPrimeiraConsultaGratuita());
        dto.setValorPrimeiraConsulta(terapeuta.getValorPrimeiraConsulta());
        dto.setPoliticaCancelamento(terapeuta.getPoliticaCancelamento());
        dto.setTempoRespostaHoras(terapeuta.getTempoRespostaHoras());
        
        
        dto.setReligiao(terapeuta.getReligiao());
        dto.setRedesSociais(terapeuta.getRedesSociais());
        dto.setEstadoCivil(terapeuta.getEstadoCivil());
        dto.setAnosRelacionamento(terapeuta.getAnosRelacionamento());
        dto.setPossuiFilhos(terapeuta.getPossuiFilhos());
        dto.setQuantidadeFilhos(terapeuta.getQuantidadeFilhos());
        dto.setFilhosDeficiencia(terapeuta.getFilhosDeficiencia());
        dto.setJustificativaDeficiencia(terapeuta.getJustificativaDeficiencia());
        dto.setAssuntosPrediletos(terapeuta.getAssuntosPrediletos());
        dto.setHobby(terapeuta.getHobby());
        dto.setInspiracao(terapeuta.getInspiracao());
        dto.setFilmesMarcantes(terapeuta.getFilmesMarcantes());
        dto.setSuperacoes(terapeuta.getSuperacoes());
        dto.setCausaSangue(terapeuta.getCausaSangue());
        dto.setMaiorMudanca(terapeuta.getMaiorMudanca());
        dto.setGastariaDinheiro(terapeuta.getGastariaDinheiro());
        dto.setMarcaDeixar(terapeuta.getMarcaDeixar());
        dto.setTrabalhoAntesSaudeMental(terapeuta.getTrabalhoAntesSaudeMental());
        dto.setAtenderiaPorAmor(terapeuta.getAtenderiaPorAmor());
        dto.setOQueNaoGostaAtender(terapeuta.getOQueNaoGostaAtender());
        dto.setCasesSucesso(terapeuta.getCasesSucesso());
        dto.setFeedbackPacientes(terapeuta.getFeedbackPacientes());
        dto.setDemandaMaisComum(terapeuta.getDemandaMaisComum());

        
        dto.setStatusCadastro(terapeuta.getStatusCadastro());
        dto.setDataCadastro(usuario.getDataCriacao());
        dto.setDataAprovacao(terapeuta.getDataAprovacao());
        dto.setAprovadoPor(terapeuta.getAprovadoPor());

        
        if (terapeuta.getAprovadoPor() != null) {
            try {
                Usuario admin = usuarioRepository.findById(terapeuta.getAprovadoPor()).orElse(null);
                if (admin != null) {
                    dto.setNomeAprovadoPor(admin.getNome());
                } else {
                    
                    dto.setNomeAprovadoPor("Admin ID: " + terapeuta.getAprovadoPor());
                }
            } catch (Exception e) {
                
                dto.setNomeAprovadoPor("Admin ID: " + terapeuta.getAprovadoPor());
            }
        }

        dto.setMotivoReprovacao(terapeuta.getMotivoReprovacao());
        dto.setFbAprovEntrevista(terapeuta.getFbAprovEntrevista());

        
        dto.setTempoEspera(calcularTempoEspera(usuario.getDataCriacao(), terapeuta.getDataAprovacao()));

        return dto;
    }

    
    private Long calcularTempoEspera(LocalDateTime dataCadastro, LocalDateTime dataAprovacao) {
        if (dataCadastro == null) {
            return null;
        }
        LocalDateTime dataFim = dataAprovacao != null ? dataAprovacao : LocalDateTime.now();
        return ChronoUnit.DAYS.between(dataCadastro, dataFim);
    }

    
    @Transactional
    public TerapeutaDTO completarPerfil(InformacoesPessoaisDTO request) {
        
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + request.getUsuarioId()));

        if (!Role.TERAPEUTA.equals(usuario.getTipo())) {
            throw new RuntimeException("Usuário deve ser do tipo TERAPEUTA para completar perfil");
        }

        
        Terapeuta terapeuta = terapeutaRepository.findById(request.getUsuarioId()).orElse(null);
        boolean isUpdate = (terapeuta != null);

        
        if (request.getBio() == null || request.getBio().trim().isEmpty()) {
            throw new com.axis.exception.BadRequestException("Bio é obrigatória para completar perfil");
        }

        if (request.getEspecialidades() == null || request.getEspecialidades().isEmpty()) {
            throw new com.axis.exception.BadRequestException("Especialidades são obrigatórias para completar perfil");
        }

        
        String modalidade = request.getModalidadeAtendimento();
        boolean precisaLocalizacao = modalidade != null &&
            (modalidade.equalsIgnoreCase("presencial") || modalidade.equalsIgnoreCase("hibrido"));

        if (precisaLocalizacao) {
            boolean temLocalizacao = (request.getRua() != null && !request.getRua().isEmpty()) ||
                                    (request.getLogradouro() != null && !request.getLogradouro().isEmpty()) ||
                                    (request.getCep() != null && !request.getCep().isEmpty());

            if (!temLocalizacao) {
                throw new com.axis.exception.BadRequestException("Localização (CEP ou endereço) é obrigatória para modalidades Presencial e Híbrido");
            }
        }

        
        if (request.getCrp() != null && !request.getCrp().trim().isEmpty()) {
            
            if (isUpdate && !request.getCrp().equals(terapeuta.getCrp())) {
                if (crpExiste(request.getCrp())) {
                    throw new com.axis.exception.CrpJaCadastradoException(request.getCrp());
                }
            } else if (!isUpdate && crpExiste(request.getCrp())) {
                throw new com.axis.exception.CrpJaCadastradoException(request.getCrp());
            }
        }

        
        if (terapeuta == null) {
            terapeuta = new Terapeuta();
            terapeuta.setUsuarioId(usuario.getId());
            terapeuta.setDataCriacao(LocalDateTime.now());
        }

        
        
        String cpfLimpo;
        if (request.getCpf() != null && !request.getCpf().trim().isEmpty()) {
            cpfLimpo = request.getCpf().replaceAll("[^0-9]", "");
        } else if (usuario.getCpf() != null && !usuario.getCpf().trim().isEmpty()) {
            
            cpfLimpo = usuario.getCpf().replaceAll("[^0-9]", "");
        } else {
            throw new com.axis.exception.BadRequestException("CPF é obrigatório para completar perfil de terapeuta");
        }

        
        if (isUpdate) {
            
            if (!cpfLimpo.equals(terapeuta.getCpf()) && cpfExiste(cpfLimpo)) {
                throw new com.axis.exception.CpfJaCadastradoException(cpfLimpo);
            }
        } else {
            
            if (cpfExiste(cpfLimpo)) {
                throw new com.axis.exception.CpfJaCadastradoException(cpfLimpo);
            }
        }

        terapeuta.setCpf(cpfLimpo);

        
        String crp = request.getCrp();
        if (crp != null && crp.trim().isEmpty()) {
            crp = null;
        }
        terapeuta.setCrp(crp);
        terapeuta.setInstituicaoFormacao(request.getInstituicaoFormacao());
        terapeuta.setAnoFormacao(request.getAnoFormacao());
        terapeuta.setBio(request.getBio());
        terapeuta.setValorSessao(request.getValorSessao());

        
        terapeuta.setDataNascimento(request.getDataNascimento());
        terapeuta.setGenero(request.getIdentidadeGenero());
        terapeuta.setExperienciaAnos(request.getExperienciaAnos());
        terapeuta.setModalidadeAtendimento(request.getModalidadeAtendimento());
        terapeuta.setPrimeiraConsultaGratuita(request.getPrimeiraConsultaGratuita());

        
        
        
        
        Long idCep = cepService.processarEnderecoCadastro(
            request.getCep(),
            request.getModalidadeAtendimento(),
            request.getLatitudeGPS(),
            request.getLongitudeGPS()
        );

        
        terapeuta.setIdCep(idCep);

        
        terapeuta.setNumeroEndereco(request.getNumero());
        terapeuta.setComplementoEndereco(request.getComplemento());

        
        String localizacaoCompleta = construirLocalizacao(request);
        terapeuta.setLocalizacaoClinica(localizacaoCompleta);

        
        if (request.getAbordagensPrincipais() != null && !request.getAbordagensPrincipais().isEmpty()) {
            
            terapeuta.setAbordagensPrincipais(request.getAbordagensPrincipais().toArray(new String[0]));
        } else {
            
            terapeuta.setAbordagensPrincipais(new String[0]);
        }

        
        if (request.getAbordagensSecundarias() != null && !request.getAbordagensSecundarias().isEmpty()) {
            terapeuta.setAbordagensSecundarias(request.getAbordagensSecundarias().toArray(new String[0]));
        } else {
            terapeuta.setAbordagensSecundarias(new String[0]);
        }

        if (request.getEspecialidades() != null) {
            
            terapeuta.setEspecialidades(String.join(", ", request.getEspecialidades()));
        }

        if (request.getTipoTerapia() != null && !request.getTipoTerapia().isEmpty()) {
            
            terapeuta.setTipoTerapia(String.join(", ", request.getTipoTerapia()));
        }

        if (request.getDiasAtendimento() != null) {
            terapeuta.setDiasAtendimento(request.getDiasAtendimento().toArray(new String[0]));
        }

        
        if (request.getDiaReuniao() != null) {
            terapeuta.setDiaReuniao(request.getDiaReuniao());
        }
        if (request.getHorarioReuniao() != null) {
            terapeuta.setHorarioReuniao(request.getHorarioReuniao());
        }

        
        if (request.getHorariosAtendimento() != null) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                String horariosJson = mapper.writeValueAsString(request.getHorariosAtendimento());
                terapeuta.setDisponibilidadeHorarios(horariosJson);
            } catch (Exception e) {
                
                
                terapeuta.setDisponibilidadeHorarios(null);
            }
        }

        
        terapeuta.setReligiao(request.getReligiao());
        terapeuta.setEstadoCivil(request.getEstadoCivil());
        terapeuta.setAnosRelacionamento(request.getAnosRelacionamento());
        terapeuta.setPossuiFilhos(request.getPossuiFilhos());
        terapeuta.setQuantidadeFilhos(request.getQuantidadeFilhos());
        terapeuta.setFilhosDeficiencia(request.getFilhosDeficiencia());
        terapeuta.setJustificativaDeficiencia(request.getJustificativaDeficiencia());

        
        terapeuta.setAssuntosPrediletos(request.getAssuntosPrediletos());
        terapeuta.setHobby(request.getHobby());
        terapeuta.setInspiracao(request.getInspiracao());
        terapeuta.setFilmesMarcantes(request.getFilmesMarcantes());
        terapeuta.setSuperacoes(request.getSuperacoes());
        terapeuta.setCausaSangue(request.getCausaSangue());
        terapeuta.setMaiorMudanca(request.getMaiorMudanca());
        terapeuta.setGastariaDinheiro(request.getGastariaDinheiro());
        terapeuta.setMarcaDeixar(request.getMarcaDeixar());
        terapeuta.setTrabalhoAntesSaudeMental(request.getTrabalhoAntesSaudeMental());
        terapeuta.setAtenderiaPorAmor(request.getAtenderiaPorAmor());

        
        terapeuta.setOQueNaoGostaAtender(request.getOQueNaoGostaAtender());
        
        
        
        
        terapeuta.setCasesSucesso(request.getCasesSucesso());
        terapeuta.setFeedbackPacientes(request.getFeedbackPacientes());
        terapeuta.setDemandaMaisComum(request.getDemandaMaisComum());

        
        terapeuta.setRedesSociais(request.getRedesSociais());

        
        terapeuta.setDataCriacao(LocalDateTime.now());
        terapeuta.setDataAtualizacao(LocalDateTime.now());

        
        terapeuta.setLgbtqFriendly(request.getLgbtqFriendly() != null ? request.getLgbtqFriendly() : false);
        terapeuta.setExperienciaCasosLgbtq(request.getExperienciaCasosLgbtq());

        
        if (request.getFaixaEtariaAtendimento() != null) {
            terapeuta.setFaixaEtariaAtendimento(request.getFaixaEtariaAtendimento());
        }

        
        if (request.getMetodosPagamento() != null) {
            terapeuta.setMetodosPagamento(request.getMetodosPagamento());
        }

        
        if (request.getPoliticaCancelamento() != null) {
            terapeuta.setPoliticaCancelamento(request.getPoliticaCancelamento());
        }

        
        if (request.getAceitaConvenio() != null) {
            terapeuta.setAceitaConvenio(request.getAceitaConvenio());
        } else {
            terapeuta.setAceitaConvenio(false);
        }
        if (request.getConveniosAceitos() != null && !request.getConveniosAceitos().isEmpty()) {
            terapeuta.setConveniosAceitos(request.getConveniosAceitos().toArray(new String[0]));
        }

        
        terapeuta.setNotaMedia(BigDecimal.ZERO);
        terapeuta.setTotalAvaliacoes(0);
        terapeuta.setTotalPacientesAtendidos(0);
        terapeuta.setAnosPlataforma(BigDecimal.ZERO);
        terapeuta.setTempoRespostaHoras(24);

        
        
        
        
        
        

        
        Terapeuta terapeutaSalvo = terapeutaRepository.save(terapeuta);

        
        
        
        
        
        
        

        
        usuario.setStatusPerfil("COMPLETO");
        usuarioRepository.save(usuario);

        
        return converterParaDTO(terapeutaSalvo);
    }

    
    private boolean crpExiste(String crp) {
        if (crp == null || crp.trim().isEmpty()) {
            return false; 
        }
        return terapeutaRepository.findByCrp(crp).isPresent();
    }

    
    private boolean cpfExiste(String cpf) {
        return terapeutaRepository.findByCpf(cpf).isPresent();
    }

    
    private String construirLocalizacao(InformacoesPessoaisDTO request) {
        StringBuilder localizacao = new StringBuilder();

        
        String enderecoBase = request.getRua();
        if (enderecoBase == null || enderecoBase.isEmpty()) {
            enderecoBase = request.getLogradouro();
        }

        if (enderecoBase != null && !enderecoBase.isEmpty()) {
            localizacao.append(enderecoBase);

            if (request.getNumero() != null && !request.getNumero().isEmpty()) {
                localizacao.append(", ").append(request.getNumero());
            }

            if (request.getComplemento() != null && !request.getComplemento().isEmpty()) {
                localizacao.append(", ").append(request.getComplemento());
            }
        }

        if (request.getBairro() != null && !request.getBairro().isEmpty()) {
            if (localizacao.length() > 0) localizacao.append(" - ");
            localizacao.append(request.getBairro());
        }

        if (request.getLocalidade() != null && !request.getLocalidade().isEmpty()) {
            if (localizacao.length() > 0) localizacao.append(", ");
            localizacao.append(request.getLocalidade());
        }

        if (request.getUf() != null && !request.getUf().isEmpty()) {
            if (localizacao.length() > 0) localizacao.append(" - ");
            localizacao.append(request.getUf());
        }

        if (request.getCep() != null && !request.getCep().isEmpty()) {
            if (localizacao.length() > 0) localizacao.append(" - CEP: ");
            localizacao.append(request.getCep());
        }

        return localizacao.toString();
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

    
    @Transactional
    public TerapeutaDTO salvarProgressoCadastro(InformacoesPessoaisDTO request) {
        
        Usuario usuario = usuarioRepository.findById(request.getUsuarioId())
                .orElseThrow(() -> new ResourceNotFoundException("Usuário não encontrado com ID: " + request.getUsuarioId()));

        if (!Role.TERAPEUTA.equals(usuario.getTipo())) {
            throw new RuntimeException("Usuário deve ser do tipo TERAPEUTA");
        }

        
        Terapeuta terapeuta = terapeutaRepository.findById(request.getUsuarioId()).orElse(null);

        if (terapeuta == null) {
            
            terapeuta = new Terapeuta();
            terapeuta.setUsuarioId(usuario.getId());
            terapeuta.setCpf(usuario.getCpf()); 
            terapeuta.setDataCriacao(LocalDateTime.now());
        }

        
        
        String crpRequest = request.getCrp();
        if (crpRequest != null) {
            crpRequest = crpRequest.trim();
            if (!crpRequest.isEmpty()) {
                
                if (!crpRequest.equals(terapeuta.getCrp()) && crpExiste(crpRequest)) {
                    throw new com.axis.exception.CrpJaCadastradoException(crpRequest);
                }
                terapeuta.setCrp(crpRequest);
            }
        }

        if (request.getInstituicaoFormacao() != null) {
            terapeuta.setInstituicaoFormacao(request.getInstituicaoFormacao());
        }
        if (request.getAnoFormacao() != null) {
            terapeuta.setAnoFormacao(request.getAnoFormacao());
        }
        if (request.getBio() != null) {
            terapeuta.setBio(request.getBio());
        }
        if (request.getValorSessao() != null) {
            terapeuta.setValorSessao(request.getValorSessao());
        }

        
        if (request.getDataNascimento() != null) {
            terapeuta.setDataNascimento(request.getDataNascimento());
        }
        if (request.getIdentidadeGenero() != null) {
            terapeuta.setGenero(request.getIdentidadeGenero());
        }
        if (request.getExperienciaAnos() != null) {
            terapeuta.setExperienciaAnos(request.getExperienciaAnos());
        }
        if (request.getModalidadeAtendimento() != null) {
            terapeuta.setModalidadeAtendimento(request.getModalidadeAtendimento());
        }
        if (request.getPrimeiraConsultaGratuita() != null) {
            terapeuta.setPrimeiraConsultaGratuita(request.getPrimeiraConsultaGratuita());
        }

        
        
        if (request.getCep() != null && !request.getCep().trim().isEmpty()) {
            Long idCep = cepService.processarEnderecoCadastro(
                request.getCep(),
                request.getModalidadeAtendimento(),
                request.getLatitudeGPS(),
                request.getLongitudeGPS()
            );

            terapeuta.setIdCep(idCep);
            terapeuta.setNumeroEndereco(request.getNumero());
            terapeuta.setComplementoEndereco(request.getComplemento());

            
            String localizacaoCompleta = construirLocalizacao(request);
            if (!localizacaoCompleta.isEmpty()) {
                terapeuta.setLocalizacaoClinica(localizacaoCompleta);
            }
        }

        
        if (request.getAbordagensPrincipais() != null && !request.getAbordagensPrincipais().isEmpty()) {
            terapeuta.setAbordagensPrincipais(request.getAbordagensPrincipais().toArray(new String[0]));
        }
        if (request.getAbordagensSecundarias() != null && !request.getAbordagensSecundarias().isEmpty()) {
            terapeuta.setAbordagensSecundarias(request.getAbordagensSecundarias().toArray(new String[0]));
        }

        
        if (request.getEspecialidades() != null && !request.getEspecialidades().isEmpty()) {
            terapeuta.setEspecialidades(String.join(", ", request.getEspecialidades()));
        }
        if (request.getTipoTerapia() != null && !request.getTipoTerapia().isEmpty()) {
            terapeuta.setTipoTerapia(String.join(", ", request.getTipoTerapia()));
        }

        
        if (request.getDiasAtendimento() != null) {
            terapeuta.setDiasAtendimento(request.getDiasAtendimento().toArray(new String[0]));
        }
        if (request.getDiaReuniao() != null) {
            terapeuta.setDiaReuniao(request.getDiaReuniao());
        }
        if (request.getHorarioReuniao() != null) {
            terapeuta.setHorarioReuniao(request.getHorarioReuniao());
        }
        if (request.getHorariosAtendimento() != null) {
            try {
                ObjectMapper mapper = new ObjectMapper();
                String horariosJson = mapper.writeValueAsString(request.getHorariosAtendimento());
                terapeuta.setDisponibilidadeHorarios(horariosJson);
            } catch (Exception e) {
                
            }
        }

        
        if (request.getReligiao() != null) terapeuta.setReligiao(request.getReligiao());
        if (request.getEstadoCivil() != null) terapeuta.setEstadoCivil(request.getEstadoCivil());
        if (request.getAnosRelacionamento() != null) terapeuta.setAnosRelacionamento(request.getAnosRelacionamento());
        if (request.getPossuiFilhos() != null) terapeuta.setPossuiFilhos(request.getPossuiFilhos());
        if (request.getQuantidadeFilhos() != null) terapeuta.setQuantidadeFilhos(request.getQuantidadeFilhos());
        if (request.getFilhosDeficiencia() != null) terapeuta.setFilhosDeficiencia(request.getFilhosDeficiencia());
        if (request.getJustificativaDeficiencia() != null) terapeuta.setJustificativaDeficiencia(request.getJustificativaDeficiencia());

        
        if (request.getAssuntosPrediletos() != null) terapeuta.setAssuntosPrediletos(request.getAssuntosPrediletos());
        if (request.getHobby() != null) terapeuta.setHobby(request.getHobby());
        if (request.getInspiracao() != null) terapeuta.setInspiracao(request.getInspiracao());
        if (request.getFilmesMarcantes() != null) terapeuta.setFilmesMarcantes(request.getFilmesMarcantes());
        if (request.getSuperacoes() != null) terapeuta.setSuperacoes(request.getSuperacoes());
        if (request.getCausaSangue() != null) terapeuta.setCausaSangue(request.getCausaSangue());
        if (request.getMaiorMudanca() != null) terapeuta.setMaiorMudanca(request.getMaiorMudanca());
        if (request.getGastariaDinheiro() != null) terapeuta.setGastariaDinheiro(request.getGastariaDinheiro());
        if (request.getMarcaDeixar() != null) terapeuta.setMarcaDeixar(request.getMarcaDeixar());
        if (request.getTrabalhoAntesSaudeMental() != null) terapeuta.setTrabalhoAntesSaudeMental(request.getTrabalhoAntesSaudeMental());
        if (request.getAtenderiaPorAmor() != null) terapeuta.setAtenderiaPorAmor(request.getAtenderiaPorAmor());

        
        if (request.getOQueNaoGostaAtender() != null) terapeuta.setOQueNaoGostaAtender(request.getOQueNaoGostaAtender());
        if (request.getCasesSucesso() != null) terapeuta.setCasesSucesso(request.getCasesSucesso());
        if (request.getFeedbackPacientes() != null) terapeuta.setFeedbackPacientes(request.getFeedbackPacientes());
        if (request.getDemandaMaisComum() != null) terapeuta.setDemandaMaisComum(request.getDemandaMaisComum());

        
        if (request.getRedesSociais() != null) {
            terapeuta.setRedesSociais(request.getRedesSociais());
        }

        
        if (request.getLgbtqFriendly() != null) {
            terapeuta.setLgbtqFriendly(request.getLgbtqFriendly());
        }
        if (request.getExperienciaCasosLgbtq() != null) {
            terapeuta.setExperienciaCasosLgbtq(request.getExperienciaCasosLgbtq());
        }

        
        if (request.getFaixaEtariaAtendimento() != null) {
            terapeuta.setFaixaEtariaAtendimento(request.getFaixaEtariaAtendimento());
        }

        
        if (request.getMetodosPagamento() != null) {
            terapeuta.setMetodosPagamento(request.getMetodosPagamento());
        }
        if (request.getPoliticaCancelamento() != null) {
            terapeuta.setPoliticaCancelamento(request.getPoliticaCancelamento());
        }

        
        if (request.getAceitaConvenio() != null) {
            terapeuta.setAceitaConvenio(request.getAceitaConvenio());
        }
        if (request.getConveniosAceitos() != null && !request.getConveniosAceitos().isEmpty()) {
            terapeuta.setConveniosAceitos(request.getConveniosAceitos().toArray(new String[0]));
        }

        
        terapeuta.setDataAtualizacao(LocalDateTime.now());

        
        Terapeuta terapeutaSalvo = terapeutaRepository.save(terapeuta);

        return converterParaDTO(terapeutaSalvo);
    }

    
    public TerapeutaDTO recuperarProgressoCadastro(Long usuarioId) {
        Terapeuta terapeuta = terapeutaRepository.findById(usuarioId).orElse(null);

        if (terapeuta == null) {
            return null; 
        }

        return converterParaDTO(terapeuta);
    }
}