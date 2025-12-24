package com.axis.dto;

import com.axis.model.StatusCadastro;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.Map;

public class TerapeutaDTO {
    private Long usuarioId;
    private String nome;
    private String email;
    private String telefone;
    private String cpf;
    private String crp;
    private String instituicaoFormacao;
    private Integer anoFormacao;
    private String especialidades;
    private String bio;
    private String localizacaoClinica;
    private String metodosPagamento;
    private BigDecimal valorSessao;

    
    private String genero;
    private LocalDate dataNascimento;
    private Integer idadeCalculada;
    private Integer experienciaAnos;
    private String[] posGraduacao;
    private String[] certificacoes;
    private String[] abordagensPrincipais;
    private String[] abordagensSecundarias;
    private String tipoTerapia;
    private String modalidadeAtendimento;
    private String faixaEtariaAtendimento;
    private Boolean aceitaConvenio;
    private String[] conveniosAceitos;
    private String disponibilidadeHorarios;
    private String[] diasAtendimento;
    private String diaReuniao;
    private String horarioReuniao;
    private LocalTime horarioInicio;
    private LocalTime horarioFim;
    private Boolean lgbtqFriendly;
    private String formacaoDiversidade;
    private String[] certificacoesLgbtq;
    private Integer experienciaCasosLgbtq;
    private BigDecimal notaMedia;
    private Integer totalAvaliacoes;
    private Integer totalPacientesAtendidos;
    private BigDecimal anosPlataforma;
    private Boolean primeiraConsultaGratuita;
    private BigDecimal valorPrimeiraConsulta;
    private String politicaCancelamento;
    private Integer tempoRespostaHoras;

    

    
    private String religiao;

    
    private Map<String, String> redesSociais;

    
    private String estadoCivil;
    private Integer anosRelacionamento;
    private Boolean possuiFilhos;
    private Integer quantidadeFilhos;
    private String filhosDeficiencia;
    private String justificativaDeficiencia;

    
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

    
    @com.fasterxml.jackson.annotation.JsonProperty("oQueNaoGostaAtender")
    private String oQueNaoGostaAtender;
    private String casesSucesso;
    private String feedbackPacientes;
    private String demandaMaisComum;

    
    private StatusCadastro statusCadastro;
    private LocalDateTime dataCadastro;
    private LocalDateTime dataAprovacao;
    private Long aprovadoPor;
    private String nomeAprovadoPor; 
    private String motivoReprovacao;
    private String fbAprovEntrevista; 
    private Long tempoEspera; 

    
    public TerapeutaDTO() {}

    
    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
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

    public LocalDateTime getDataCadastro() {
        return dataCadastro;
    }

    public void setDataCadastro(LocalDateTime dataCadastro) {
        this.dataCadastro = dataCadastro;
    }

    public LocalDateTime getDataAprovacao() {
        return dataAprovacao;
    }

    public void setDataAprovacao(LocalDateTime dataAprovacao) {
        this.dataAprovacao = dataAprovacao;
    }

    public Long getTempoEspera() {
        return tempoEspera;
    }

    public void setTempoEspera(Long tempoEspera) {
        this.tempoEspera = tempoEspera;
    }

    public Long getAprovadoPor() {
        return aprovadoPor;
    }

    public void setAprovadoPor(Long aprovadoPor) {
        this.aprovadoPor = aprovadoPor;
    }

    public String getNomeAprovadoPor() {
        return nomeAprovadoPor;
    }

    public void setNomeAprovadoPor(String nomeAprovadoPor) {
        this.nomeAprovadoPor = nomeAprovadoPor;
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
}