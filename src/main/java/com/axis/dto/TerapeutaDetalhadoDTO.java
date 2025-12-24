package com.axis.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Map;


public class TerapeutaDetalhadoDTO {

    
    private Long id;
    private String nome;
    private String email;
    private String telefone;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataCadastro;

    
    private String cpf;
    private String genero;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dataNascimento;

    private Integer idadeCalculada;
    private String religiao;
    private String estadoCivil;
    private Integer anosRelacionamento;
    private Boolean possuiFilhos;
    private Integer quantidadeFilhos;
    private Boolean filhosComDeficiencia;
    private String filhosDeficiencia;
    private String justificativaDeficiencia;

    
    private String crp;
    private String instituicaoFormacao;
    private Integer anoFormacao;
    private Integer experienciaAnos;
    private List<String> posGraduacao;
    private List<String> certificacoes;

    
    private List<String> abordagensPrincipais;
    private String tipoTerapia;
    private List<String> abordagensSecundarias;
    private String especialidades; 

    @com.fasterxml.jackson.annotation.JsonProperty("oQueNaoGostaAtender")
    private String oQueNaoGostaAtender;

    
    private String modalidadeAtendimento;
    private String faixaEtariaAtendimento;
    private String disponibilidadeHorarios;
    private List<String> diasAtendimento;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime horarioInicio;

    @JsonFormat(pattern = "HH:mm")
    private LocalTime horarioFim;

    
    private String diaReuniao;
    private String horarioReuniao;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime horarioReuniaoDisponivel; 

    
    private BigDecimal valorSessao;
    private Boolean primeiraConsultaGratuita;
    private BigDecimal valorPrimeiraConsulta;
    private String metodosPagamento;
    private String politicaCancelamento;

    
    private Boolean aceitaConvenio;
    private List<String> conveniosAceitos;

    
    private Boolean lgbtqFriendly;
    private Integer experienciaCasosLgbtq;
    private String formacaoDiversidade;
    private List<String> certificacoesLgbtq;

    
    private String localizacaoClinica; 

    
    private String bio;
    private String demandaMaisComum;
    private Integer tempoRespostaHoras;
    private Integer totalPacientesAtendidos;
    private BigDecimal notaMedia;
    private Integer totalAvaliacoes;
    private BigDecimal anosPlataforma;
    private String casesSucesso;
    private String feedbackPacientes;

    
    private String assuntosPrediletos;
    private String hobby;
    private String inspiracao;
    private String filmesMarcantes;
    private String superacoes;
    private String causaSangue;
    private String maiorMudanca;
    private String gastariaDinheiro;
    private String marcaDeixar;
    private String trabalhoAntesSaudeMental;
    private String atenderiaPorAmor;

    
    private Map<String, String> redesSociais; 

    
    private String statusCadastro; 

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataAprovacao;

    private Long aprovadoPor;
    private String motivoReprovacao;
    private String fbAprovEntrevista; 

    
    private Long diasAguardando;

    
    public TerapeutaDetalhadoDTO() {}

    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
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

    public String getReligiao() {
        return religiao;
    }

    public void setReligiao(String religiao) {
        this.religiao = religiao;
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

    public Boolean getFilhosComDeficiencia() {
        return filhosComDeficiencia;
    }

    public void setFilhosComDeficiencia(Boolean filhosComDeficiencia) {
        this.filhosComDeficiencia = filhosComDeficiencia;
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

    public Integer getExperienciaAnos() {
        return experienciaAnos;
    }

    public void setExperienciaAnos(Integer experienciaAnos) {
        this.experienciaAnos = experienciaAnos;
    }

    public List<String> getPosGraduacao() {
        return posGraduacao;
    }

    public void setPosGraduacao(List<String> posGraduacao) {
        this.posGraduacao = posGraduacao;
    }

    public List<String> getCertificacoes() {
        return certificacoes;
    }

    public void setCertificacoes(List<String> certificacoes) {
        this.certificacoes = certificacoes;
    }

    public List<String> getAbordagensPrincipais() {
        return abordagensPrincipais;
    }

    public void setAbordagensPrincipais(List<String> abordagensPrincipais) {
        this.abordagensPrincipais = abordagensPrincipais;
    }

    public String getTipoTerapia() {
        return tipoTerapia;
    }

    public void setTipoTerapia(String tipoTerapia) {
        this.tipoTerapia = tipoTerapia;
    }

    public List<String> getAbordagensSecundarias() {
        return abordagensSecundarias;
    }

    public void setAbordagensSecundarias(List<String> abordagensSecundarias) {
        this.abordagensSecundarias = abordagensSecundarias;
    }

    public String getEspecialidades() {
        return especialidades;
    }

    public void setEspecialidades(String especialidades) {
        this.especialidades = especialidades;
    }

    public String getOQueNaoGostaAtender() {
        return oQueNaoGostaAtender;
    }

    public void setOQueNaoGostaAtender(String oQueNaoGostaAtender) {
        this.oQueNaoGostaAtender = oQueNaoGostaAtender;
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

    public String getDisponibilidadeHorarios() {
        return disponibilidadeHorarios;
    }

    public void setDisponibilidadeHorarios(String disponibilidadeHorarios) {
        this.disponibilidadeHorarios = disponibilidadeHorarios;
    }

    public List<String> getDiasAtendimento() {
        return diasAtendimento;
    }

    public void setDiasAtendimento(List<String> diasAtendimento) {
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

    public LocalDateTime getHorarioReuniaoDisponivel() {
        return horarioReuniaoDisponivel;
    }

    public void setHorarioReuniaoDisponivel(LocalDateTime horarioReuniaoDisponivel) {
        this.horarioReuniaoDisponivel = horarioReuniaoDisponivel;
    }

    public BigDecimal getValorSessao() {
        return valorSessao;
    }

    public void setValorSessao(BigDecimal valorSessao) {
        this.valorSessao = valorSessao;
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

    public String getMetodosPagamento() {
        return metodosPagamento;
    }

    public void setMetodosPagamento(String metodosPagamento) {
        this.metodosPagamento = metodosPagamento;
    }

    public String getPoliticaCancelamento() {
        return politicaCancelamento;
    }

    public void setPoliticaCancelamento(String politicaCancelamento) {
        this.politicaCancelamento = politicaCancelamento;
    }

    public Boolean getAceitaConvenio() {
        return aceitaConvenio;
    }

    public void setAceitaConvenio(Boolean aceitaConvenio) {
        this.aceitaConvenio = aceitaConvenio;
    }

    public List<String> getConveniosAceitos() {
        return conveniosAceitos;
    }

    public void setConveniosAceitos(List<String> conveniosAceitos) {
        this.conveniosAceitos = conveniosAceitos;
    }

    public Boolean getLgbtqFriendly() {
        return lgbtqFriendly;
    }

    public void setLgbtqFriendly(Boolean lgbtqFriendly) {
        this.lgbtqFriendly = lgbtqFriendly;
    }

    public Integer getExperienciaCasosLgbtq() {
        return experienciaCasosLgbtq;
    }

    public void setExperienciaCasosLgbtq(Integer experienciaCasosLgbtq) {
        this.experienciaCasosLgbtq = experienciaCasosLgbtq;
    }

    public String getFormacaoDiversidade() {
        return formacaoDiversidade;
    }

    public void setFormacaoDiversidade(String formacaoDiversidade) {
        this.formacaoDiversidade = formacaoDiversidade;
    }

    public List<String> getCertificacoesLgbtq() {
        return certificacoesLgbtq;
    }

    public void setCertificacoesLgbtq(List<String> certificacoesLgbtq) {
        this.certificacoesLgbtq = certificacoesLgbtq;
    }

    public String getLocalizacaoClinica() {
        return localizacaoClinica;
    }

    public void setLocalizacaoClinica(String localizacaoClinica) {
        this.localizacaoClinica = localizacaoClinica;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public String getDemandaMaisComum() {
        return demandaMaisComum;
    }

    public void setDemandaMaisComum(String demandaMaisComum) {
        this.demandaMaisComum = demandaMaisComum;
    }

    public Integer getTempoRespostaHoras() {
        return tempoRespostaHoras;
    }

    public void setTempoRespostaHoras(Integer tempoRespostaHoras) {
        this.tempoRespostaHoras = tempoRespostaHoras;
    }

    public Integer getTotalPacientesAtendidos() {
        return totalPacientesAtendidos;
    }

    public void setTotalPacientesAtendidos(Integer totalPacientesAtendidos) {
        this.totalPacientesAtendidos = totalPacientesAtendidos;
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

    public BigDecimal getAnosPlataforma() {
        return anosPlataforma;
    }

    public void setAnosPlataforma(BigDecimal anosPlataforma) {
        this.anosPlataforma = anosPlataforma;
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

    public Map<String, String> getRedesSociais() {
        return redesSociais;
    }

    public void setRedesSociais(Map<String, String> redesSociais) {
        this.redesSociais = redesSociais;
    }

    public String getStatusCadastro() {
        return statusCadastro;
    }

    public void setStatusCadastro(String statusCadastro) {
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

    public Long getDiasAguardando() {
        return diasAguardando;
    }

    public void setDiasAguardando(Long diasAguardando) {
        this.diasAguardando = diasAguardando;
    }
}
