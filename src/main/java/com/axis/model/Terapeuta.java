package com.axis.model;

import jakarta.persistence.*;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.time.LocalTime;
import java.math.BigDecimal;
import java.util.Map;

@Entity
@Table(name = "terapeutas", schema = "core")
public class Terapeuta {
    @Id
    @Column(name = "usuario_id")
    private Long usuarioId;

    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Usuario usuario;

    @Column(nullable = false, unique = true)
    private String cpf;

    @Column(nullable = true, unique = true)
    private String crp;

    @Column(nullable = true)
    private String instituicaoFormacao;

    @Column(nullable = true)
    private Integer anoFormacao;

    @Column(nullable = true)
    private String especialidades;

    @Column(nullable = true, columnDefinition = "TEXT")
    private String bio;

    @Column(nullable = true)
    private String localizacaoClinica;

    

    
    @Column(name = "id_cep")
    private Long idCep;

    
    @Column(name = "numero_endereco", length = 10)
    private String numeroEndereco;

    
    @Column(name = "complemento_endereco", length = 100)
    private String complementoEndereco;

    
    @Column(name = "complemento_localizacao", columnDefinition = "TEXT")
    private String complementoLocalizacao;

    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cep", referencedColumnName = "id_cep", insertable = false, updatable = false)
    private Cep cep;

    @Column(length = 255)
    private String metodosPagamento; 

    @Column
    private BigDecimal valorSessao;

    @Column(nullable = false)
    private LocalDateTime dataCriacao;

    @Column(nullable = false)
    private LocalDateTime dataAtualizacao;

    
    
    
    @Column(length = 50)
    private String genero;
    
    @Column
    private LocalDate dataNascimento;
    
    @Column
    private Integer idadeCalculada;
    
    
    @Column
    private Integer experienciaAnos;
    
    @Column(columnDefinition = "text[]")
    private String[] posGraduacao;
    
    @Column(columnDefinition = "text[]")
    private String[] certificacoes;
    
    @Column(columnDefinition = "text[]")
    private String[] abordagensPrincipais;

    @Column(columnDefinition = "text[]")
    private String[] abordagensSecundarias;

    @Column(length = 200)
    private String tipoTerapia; 

    
    @Column(length = 50)
    private String modalidadeAtendimento; 
    
    @Column(length = 100)
    private String faixaEtariaAtendimento;
    
    @Column
    private Boolean aceitaConvenio = false;
    
    @Column(columnDefinition = "text[]")
    private String[] conveniosAceitos;
    
    
    @Column(columnDefinition = "TEXT")
    private String disponibilidadeHorarios;
    
    @Column(columnDefinition = "text[]")
    private String[] diasAtendimento;
    
    @Column
    private LocalTime horarioInicio;
    
    @Column
    private LocalTime horarioFim;

    @Column(name = "horario_reuniao_disponivel")
    private LocalDateTime horarioReuniaoDisponivel;

    
    @Column(name = "dia_reuniao")
    private String diaReuniao;

    @Column(name = "horario_reuniao")
    private String horarioReuniao;

    
    @Column
    private Boolean lgbtqFriendly = false;
    
    @Column(columnDefinition = "TEXT")
    private String formacaoDiversidade;
    
    @Column(columnDefinition = "text[]")
    private String[] certificacoesLgbtq;
    
    @Column
    private Integer experienciaCasosLgbtq = 0;
    
    
    @Column(precision = 3, scale = 2)
    private BigDecimal notaMedia = BigDecimal.ZERO;
    
    @Column
    private Integer totalAvaliacoes = 0;
    
    @Column
    private Integer totalPacientesAtendidos = 0;
    
    @Column(precision = 4, scale = 2)
    private BigDecimal anosPlataforma = BigDecimal.ZERO;
    
    
    @Column
    private Boolean primeiraConsultaGratuita = false;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal valorPrimeiraConsulta;
    
    @Column(columnDefinition = "TEXT")
    private String politicaCancelamento;
    
    @Column
    private Integer tempoRespostaHoras = 24;

    

    
    @Column(length = 100)
    private String religiao;

    
    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "redes_sociais")
    private Map<String, String> redesSociais;

    
    @Column(columnDefinition = "TEXT")
    private String estadoCivil;

    @Column
    private Integer anosRelacionamento;

    @Column
    private Boolean possuiFilhos = false;

    @Column
    private Integer quantidadeFilhos;

    @Column(columnDefinition = "TEXT")
    private String filhosDeficiencia;

    @Column(name = "justificativa_deficiencia", columnDefinition = "TEXT")
    private String justificativaDeficiencia;

    
    @Column(columnDefinition = "TEXT")
    private String assuntosPrediletos;

    @Column(columnDefinition = "TEXT")
    private String hobby;

    @Column(columnDefinition = "TEXT")
    private String inspiracao;

    @Column(columnDefinition = "TEXT")
    private String filmesMarcantes;

    @Column(columnDefinition = "TEXT")
    private String superacoes;

    @Column(columnDefinition = "TEXT")
    private String causaSangue;

    @Column(columnDefinition = "TEXT")
    private String maiorMudanca;

    @Column(columnDefinition = "TEXT")
    private String gastariaDinheiro;

    @Column(columnDefinition = "TEXT")
    private String marcaDeixar;

    @Column(columnDefinition = "TEXT")
    private String trabalhoAntesSaudeMental;

    @Column(columnDefinition = "TEXT")
    private String atenderiaPorAmor;

    
    @Column(name = "o_que_nao_gosta_atender", columnDefinition = "TEXT")
    @com.fasterxml.jackson.annotation.JsonProperty("oQueNaoGostaAtender")
    private String oQueNaoGostaAtender;

    @Column(columnDefinition = "TEXT")
    private String casesSucesso;

    @Column(columnDefinition = "TEXT")
    private String feedbackPacientes;

    @Column(columnDefinition = "TEXT")
    private String demandaMaisComum;

    

    
    @Enumerated(EnumType.STRING)
    @Column(name = "status_cadastro", nullable = false, length = 20)
    private StatusCadastro statusCadastro = StatusCadastro.PENDENTE;

    
    @Column(name = "data_aprovacao")
    private LocalDateTime dataAprovacao;

    
    @Column(name = "aprovado_por")
    private Long aprovadoPor;

    
    @Column(name = "motivo_reprovacao", columnDefinition = "TEXT")
    private String motivoReprovacao;

    
    @Column(name = "fb_aprov_entrevista", columnDefinition = "TEXT")
    private String fbAprovEntrevista;

    
    public Terapeuta() {
        this.statusCadastro = StatusCadastro.PENDENTE;
    }

    public Terapeuta(Long usuarioId, String cpf, String crp, String instituicaoFormacao, Integer anoFormacao, 
                     String especialidades, String bio, String localizacaoClinica, String metodosPagamento, 
                     BigDecimal valorSessao) {
        this.usuarioId = usuarioId;
        this.cpf = cpf;
        this.crp = crp;
        this.instituicaoFormacao = instituicaoFormacao;
        this.anoFormacao = anoFormacao;
        this.especialidades = especialidades;
        this.bio = bio;
        this.localizacaoClinica = localizacaoClinica;
        this.metodosPagamento = metodosPagamento;
        this.valorSessao = valorSessao;
        this.dataCriacao = LocalDateTime.now();
        this.dataAtualizacao = LocalDateTime.now();
        
        
        this.aceitaConvenio = false;
        this.lgbtqFriendly = false;
        this.experienciaCasosLgbtq = 0;
        this.notaMedia = BigDecimal.ZERO;
        this.totalAvaliacoes = 0;
        this.totalPacientesAtendidos = 0;
        this.anosPlataforma = BigDecimal.ZERO;
        this.primeiraConsultaGratuita = false;
        this.tempoRespostaHoras = 24;
        this.statusCadastro = StatusCadastro.PENDENTE;
    }

    
    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }


    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getCrp() {
        return crp;
    }

    public void setCrp(String crp) {
        this.crp = crp;
    }

    public String getInstituicaoFormacao() {
        return instituicaoFormacao;
    }

    public void setInstituicaoFormacao(String instituicaoFormacao) {
        this.instituicaoFormacao = instituicaoFormacao;
    }

    public Integer getAnoFormacao() {
        return anoFormacao;
    }

    public void setAnoFormacao(Integer anoFormacao) {
        this.anoFormacao = anoFormacao;
    }

    public String getEspecialidades() {
        return especialidades;
    }

    public void setEspecialidades(String especialidades) {
        this.especialidades = especialidades;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getLocalizacaoClinica() {
        return localizacaoClinica;
    }

    public void setLocalizacaoClinica(String localizacaoClinica) {
        this.localizacaoClinica = localizacaoClinica;
    }

    public String getMetodosPagamento() {
        return metodosPagamento;
    }

    public void setMetodosPagamento(String metodosPagamento) {
        this.metodosPagamento = metodosPagamento;
    }

    public BigDecimal getValorSessao() {
        return valorSessao;
    }

    public void setValorSessao(BigDecimal valorSessao) {
        this.valorSessao = valorSessao;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public LocalDateTime getDataAtualizacao() {
        return dataAtualizacao;
    }

    public void setDataAtualizacao(LocalDateTime dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao;
    }

    

    public String getGenero() {
        return genero;
    }

    public void setGenero(String genero) {
        this.genero = genero;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public Integer getIdadeCalculada() {
        return idadeCalculada;
    }

    public void setIdadeCalculada(Integer idadeCalculada) {
        this.idadeCalculada = idadeCalculada;
    }

    public Integer getExperienciaAnos() {
        return experienciaAnos;
    }

    public void setExperienciaAnos(Integer experienciaAnos) {
        this.experienciaAnos = experienciaAnos;
    }

    public String[] getPosGraduacao() {
        return posGraduacao;
    }

    public void setPosGraduacao(String[] posGraduacao) {
        this.posGraduacao = posGraduacao;
    }

    public String[] getCertificacoes() {
        return certificacoes;
    }

    public void setCertificacoes(String[] certificacoes) {
        this.certificacoes = certificacoes;
    }

    public String[] getAbordagensPrincipais() {
        return abordagensPrincipais;
    }

    public void setAbordagensPrincipais(String[] abordagensPrincipais) {
        this.abordagensPrincipais = abordagensPrincipais;
    }

    public String getTipoTerapia() {
        return tipoTerapia;
    }

    public void setTipoTerapia(String tipoTerapia) {
        this.tipoTerapia = tipoTerapia;
    }

    public String[] getAbordagensSecundarias() {
        return abordagensSecundarias;
    }

    public void setAbordagensSecundarias(String[] abordagensSecundarias) {
        this.abordagensSecundarias = abordagensSecundarias;
    }

    public String getModalidadeAtendimento() {
        return modalidadeAtendimento;
    }

    public void setModalidadeAtendimento(String modalidadeAtendimento) {
        this.modalidadeAtendimento = modalidadeAtendimento;
    }

    public String getFaixaEtariaAtendimento() {
        return faixaEtariaAtendimento;
    }

    public void setFaixaEtariaAtendimento(String faixaEtariaAtendimento) {
        this.faixaEtariaAtendimento = faixaEtariaAtendimento;
    }

    public Boolean getAceitaConvenio() {
        return aceitaConvenio;
    }

    public void setAceitaConvenio(Boolean aceitaConvenio) {
        this.aceitaConvenio = aceitaConvenio;
    }

    public String[] getConveniosAceitos() {
        return conveniosAceitos;
    }

    public void setConveniosAceitos(String[] conveniosAceitos) {
        this.conveniosAceitos = conveniosAceitos;
    }

    public String getDisponibilidadeHorarios() {
        return disponibilidadeHorarios;
    }

    public void setDisponibilidadeHorarios(String disponibilidadeHorarios) {
        this.disponibilidadeHorarios = disponibilidadeHorarios;
    }

    public String[] getDiasAtendimento() {
        return diasAtendimento;
    }

    public void setDiasAtendimento(String[] diasAtendimento) {
        this.diasAtendimento = diasAtendimento;
    }

    public LocalTime getHorarioInicio() {
        return horarioInicio;
    }

    public void setHorarioInicio(LocalTime horarioInicio) {
        this.horarioInicio = horarioInicio;
    }

    public LocalTime getHorarioFim() {
        return horarioFim;
    }

    public void setHorarioFim(LocalTime horarioFim) {
        this.horarioFim = horarioFim;
    }

    public LocalDateTime getHorarioReuniaoDisponivel() {
        return horarioReuniaoDisponivel;
    }

    public void setHorarioReuniaoDisponivel(LocalDateTime horarioReuniaoDisponivel) {
        this.horarioReuniaoDisponivel = horarioReuniaoDisponivel;
    }

    public String getDiaReuniao() {
        return diaReuniao;
    }

    public void setDiaReuniao(String diaReuniao) {
        this.diaReuniao = diaReuniao;
    }

    public String getHorarioReuniao() {
        return horarioReuniao;
    }

    public void setHorarioReuniao(String horarioReuniao) {
        this.horarioReuniao = horarioReuniao;
    }

    public Boolean getLgbtqFriendly() {
        return lgbtqFriendly;
    }

    public void setLgbtqFriendly(Boolean lgbtqFriendly) {
        this.lgbtqFriendly = lgbtqFriendly;
    }

    public String getFormacaoDiversidade() {
        return formacaoDiversidade;
    }

    public void setFormacaoDiversidade(String formacaoDiversidade) {
        this.formacaoDiversidade = formacaoDiversidade;
    }

    public String[] getCertificacoesLgbtq() {
        return certificacoesLgbtq;
    }

    public void setCertificacoesLgbtq(String[] certificacoesLgbtq) {
        this.certificacoesLgbtq = certificacoesLgbtq;
    }

    public Integer getExperienciaCasosLgbtq() {
        return experienciaCasosLgbtq;
    }

    public void setExperienciaCasosLgbtq(Integer experienciaCasosLgbtq) {
        this.experienciaCasosLgbtq = experienciaCasosLgbtq;
    }

    public BigDecimal getNotaMedia() {
        return notaMedia;
    }

    public void setNotaMedia(BigDecimal notaMedia) {
        this.notaMedia = notaMedia;
    }

    public Integer getTotalAvaliacoes() {
        return totalAvaliacoes;
    }

    public void setTotalAvaliacoes(Integer totalAvaliacoes) {
        this.totalAvaliacoes = totalAvaliacoes;
    }

    public Integer getTotalPacientesAtendidos() {
        return totalPacientesAtendidos;
    }

    public void setTotalPacientesAtendidos(Integer totalPacientesAtendidos) {
        this.totalPacientesAtendidos = totalPacientesAtendidos;
    }

    public BigDecimal getAnosPlataforma() {
        return anosPlataforma;
    }

    public void setAnosPlataforma(BigDecimal anosPlataforma) {
        this.anosPlataforma = anosPlataforma;
    }

    public Boolean getPrimeiraConsultaGratuita() {
        return primeiraConsultaGratuita;
    }

    public void setPrimeiraConsultaGratuita(Boolean primeiraConsultaGratuita) {
        this.primeiraConsultaGratuita = primeiraConsultaGratuita;
    }

    public BigDecimal getValorPrimeiraConsulta() {
        return valorPrimeiraConsulta;
    }

    public void setValorPrimeiraConsulta(BigDecimal valorPrimeiraConsulta) {
        this.valorPrimeiraConsulta = valorPrimeiraConsulta;
    }

    public String getPoliticaCancelamento() {
        return politicaCancelamento;
    }

    public void setPoliticaCancelamento(String politicaCancelamento) {
        this.politicaCancelamento = politicaCancelamento;
    }

    public Integer getTempoRespostaHoras() {
        return tempoRespostaHoras;
    }

    public void setTempoRespostaHoras(Integer tempoRespostaHoras) {
        this.tempoRespostaHoras = tempoRespostaHoras;
    }

    

    public String getReligiao() {
        return religiao;
    }

    public void setReligiao(String religiao) {
        this.religiao = religiao;
    }

    public Map<String, String> getRedesSociais() {
        return redesSociais;
    }

    public void setRedesSociais(Map<String, String> redesSociais) {
        this.redesSociais = redesSociais;
    }

    public String getEstadoCivil() {
        return estadoCivil;
    }

    public void setEstadoCivil(String estadoCivil) {
        this.estadoCivil = estadoCivil;
    }

    public Integer getAnosRelacionamento() {
        return anosRelacionamento;
    }

    public void setAnosRelacionamento(Integer anosRelacionamento) {
        this.anosRelacionamento = anosRelacionamento;
    }

    public Boolean getPossuiFilhos() {
        return possuiFilhos;
    }

    public void setPossuiFilhos(Boolean possuiFilhos) {
        this.possuiFilhos = possuiFilhos;
    }

    public Integer getQuantidadeFilhos() {
        return quantidadeFilhos;
    }

    public void setQuantidadeFilhos(Integer quantidadeFilhos) {
        this.quantidadeFilhos = quantidadeFilhos;
    }

    public String getFilhosDeficiencia() {
        return filhosDeficiencia;
    }

    public void setFilhosDeficiencia(String filhosDeficiencia) {
        this.filhosDeficiencia = filhosDeficiencia;
    }

    public String getJustificativaDeficiencia() {
        return justificativaDeficiencia;
    }

    public void setJustificativaDeficiencia(String justificativaDeficiencia) {
        this.justificativaDeficiencia = justificativaDeficiencia;
    }

    public String getAssuntosPrediletos() {
        return assuntosPrediletos;
    }

    public void setAssuntosPrediletos(String assuntosPrediletos) {
        this.assuntosPrediletos = assuntosPrediletos;
    }

    public String getHobby() {
        return hobby;
    }

    public void setHobby(String hobby) {
        this.hobby = hobby;
    }

    public String getInspiracao() {
        return inspiracao;
    }

    public void setInspiracao(String inspiracao) {
        this.inspiracao = inspiracao;
    }

    public String getFilmesMarcantes() {
        return filmesMarcantes;
    }

    public void setFilmesMarcantes(String filmesMarcantes) {
        this.filmesMarcantes = filmesMarcantes;
    }

    public String getSuperacoes() {
        return superacoes;
    }

    public void setSuperacoes(String superacoes) {
        this.superacoes = superacoes;
    }

    public String getCausaSangue() {
        return causaSangue;
    }

    public void setCausaSangue(String causaSangue) {
        this.causaSangue = causaSangue;
    }

    public String getMaiorMudanca() {
        return maiorMudanca;
    }

    public void setMaiorMudanca(String maiorMudanca) {
        this.maiorMudanca = maiorMudanca;
    }

    public String getGastariaDinheiro() {
        return gastariaDinheiro;
    }

    public void setGastariaDinheiro(String gastariaDinheiro) {
        this.gastariaDinheiro = gastariaDinheiro;
    }

    public String getMarcaDeixar() {
        return marcaDeixar;
    }

    public void setMarcaDeixar(String marcaDeixar) {
        this.marcaDeixar = marcaDeixar;
    }

    public String getTrabalhoAntesSaudeMental() {
        return trabalhoAntesSaudeMental;
    }

    public void setTrabalhoAntesSaudeMental(String trabalhoAntesSaudeMental) {
        this.trabalhoAntesSaudeMental = trabalhoAntesSaudeMental;
    }

    public String getAtenderiaPorAmor() {
        return atenderiaPorAmor;
    }

    public void setAtenderiaPorAmor(String atenderiaPorAmor) {
        this.atenderiaPorAmor = atenderiaPorAmor;
    }

    public String getOQueNaoGostaAtender() {
        return oQueNaoGostaAtender;
    }

    public void setOQueNaoGostaAtender(String oQueNaoGostaAtender) {
        this.oQueNaoGostaAtender = oQueNaoGostaAtender;
    }

    public String getCasesSucesso() {
        return casesSucesso;
    }

    public void setCasesSucesso(String casesSucesso) {
        this.casesSucesso = casesSucesso;
    }

    public String getFeedbackPacientes() {
        return feedbackPacientes;
    }

    public void setFeedbackPacientes(String feedbackPacientes) {
        this.feedbackPacientes = feedbackPacientes;
    }

    public String getDemandaMaisComum() {
        return demandaMaisComum;
    }

    public void setDemandaMaisComum(String demandaMaisComum) {
        this.demandaMaisComum = demandaMaisComum;
    }

    

    public StatusCadastro getStatusCadastro() {
        return statusCadastro;
    }

    public void setStatusCadastro(StatusCadastro statusCadastro) {
        this.statusCadastro = statusCadastro;
    }

    public LocalDateTime getDataAprovacao() {
        return dataAprovacao;
    }

    public void setDataAprovacao(LocalDateTime dataAprovacao) {
        this.dataAprovacao = dataAprovacao;
    }

    public Long getAprovadoPor() {
        return aprovadoPor;
    }

    public void setAprovadoPor(Long aprovadoPor) {
        this.aprovadoPor = aprovadoPor;
    }

    public String getMotivoReprovacao() {
        return motivoReprovacao;
    }

    public void setMotivoReprovacao(String motivoReprovacao) {
        this.motivoReprovacao = motivoReprovacao;
    }

    public String getFbAprovEntrevista() {
        return fbAprovEntrevista;
    }

    public void setFbAprovEntrevista(String fbAprovEntrevista) {
        this.fbAprovEntrevista = fbAprovEntrevista;
    }

    

    public Long getIdCep() {
        return idCep;
    }

    public void setIdCep(Long idCep) {
        this.idCep = idCep;
    }

    public String getNumeroEndereco() {
        return numeroEndereco;
    }

    public void setNumeroEndereco(String numeroEndereco) {
        this.numeroEndereco = numeroEndereco;
    }

    public String getComplementoEndereco() {
        return complementoEndereco;
    }

    public void setComplementoEndereco(String complementoEndereco) {
        this.complementoEndereco = complementoEndereco;
    }

    public String getComplementoLocalizacao() {
        return complementoLocalizacao;
    }

    public void setComplementoLocalizacao(String complementoLocalizacao) {
        this.complementoLocalizacao = complementoLocalizacao;
    }

    public Cep getCep() {
        return cep;
    }

    public void setCep(Cep cep) {
        this.cep = cep;
    }

    

    
    public String getEnderecoCompleto() {
        if (cep == null) {
            return null;
        }

        StringBuilder sb = new StringBuilder();

        
        if (cep.getNmLogradouro() != null && !cep.getNmLogradouro().isEmpty()) {
            sb.append(cep.getNmLogradouro());
        }

        
        if (numeroEndereco != null && !numeroEndereco.isEmpty()) {
            if (sb.length() > 0) sb.append(", ");
            sb.append(numeroEndereco);
        }

        
        if (complementoEndereco != null && !complementoEndereco.isEmpty()) {
            if (sb.length() > 0) sb.append(", ");
            sb.append(complementoEndereco);
        }

        
        if (cep.getNmBairro() != null && !cep.getNmBairro().isEmpty()) {
            if (sb.length() > 0) sb.append(" - ");
            sb.append(cep.getNmBairro());
        }

        
        if (cep.getCidade() != null && !cep.getCidade().isEmpty()) {
            if (sb.length() > 0) sb.append(", ");
            sb.append(cep.getCidade());
        }

        if (cep.getUf() != null && !cep.getUf().isEmpty()) {
            if (sb.length() > 0) sb.append(" - ");
            sb.append(cep.getUf());
        }

        
        if (sb.length() > 0) sb.append(" - ");
        sb.append("CEP: ").append(cep.getNrCep());

        return sb.toString();
    }

    
    public boolean hasGeolocation() {
        return cep != null && cep.hasGeolocation();
    }

    
    public BigDecimal getLatitude() {
        return cep != null ? cep.getLatitude() : null;
    }

    
    public BigDecimal getLongitude() {
        return cep != null ? cep.getLongitude() : null;
    }

    
    public String getCidade() {
        return cep != null ? cep.getCidade() : null;
    }

    
    public String getUf() {
        return cep != null ? cep.getUf() : null;
    }
}