package com.axis.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;


public class PacienteDetalhadoDTO {

    
    private Long id;
    private Long usuarioId;
    private String nome;
    private String email;
    private String telefone;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataCriacao;

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime dataAtualizacao;

    
    private Integer idade;
    private String sexo;
    private String profissao;
    private String estadoCivil; 
    private Integer tempoRelacionamentoAnos;
    private String escolaridade;
    private String moraCom; 
    private String religiao;
    private String religiaoOutras;

    
    private String faixaSalarial;
    private BigDecimal faixaPrecoMinimo;
    private BigDecimal faixaPrecoMaximo;
    private Boolean possuiConvenio;
    private String nomeConvenio;
    private Boolean dispostoParticular;
    private Boolean possuiApoioFinanceiro;

    
    private String localizacao;
    private Long idCep;
    private String cep; 
    private String logradouro; 
    private String bairro; 
    private String cidade;
    private String estado; 
    private String numeroEndereco;
    private String complementoEndereco;
    private String complementoLocalizacao;

    
    private BigDecimal latitude;
    private BigDecimal longitude;

    
    private String descricaoProblema;
    private String problemaPrincipal;
    private String[] problemasSecundarios;
    private Integer nivelUrgencia; 

    
    private String modalidadePreferida; 
    private String frequenciaSessoes; 
    private String duracaoTratamentoEsperada; 

    
    private String generoTerapeutaPreferido;
    private String faixaEtariaTerapeutaPreferida;

    
    private Boolean historicoTerapia;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate quandoParouTerapia;

    private String motivoInterrupcao;
    private String abordagemAnterior;
    private Integer experienciaAvaliacao; 
    private Boolean acompanhamentoPsiquiatrico;

    
    private Boolean lgbtqSupportImportante;
    private String orientacaoSexual;
    private String identidadeGenero;
    private Boolean questoesReligiosasImportantes;

    
    private String apresentacaoIndividual;
    private String metasLongoPrazo;
    private Integer experienciaAutoconhecimento; 
    private Boolean interesseGruposTerapia;
    private Boolean disponibilidadeTarefasCasa;

    
    private Boolean flexibilidadeHorarios;
    private String[] horariosPreferenciais; 
    private String[] diasDisponiveis; 
    private String disponibilidadeHorarios; 

    
    public PacienteDetalhadoDTO() {}

    

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Integer getIdade() {
        return idade;
    }

    public void setIdade(Integer idade) {
        this.idade = idade;
    }

    public String getSexo() {
        return sexo;
    }

    public void setSexo(String sexo) {
        this.sexo = sexo;
    }

    public String getProfissao() {
        return profissao;
    }

    public void setProfissao(String profissao) {
        this.profissao = profissao;
    }

    public String getEstadoCivil() {
        return estadoCivil;
    }

    public void setEstadoCivil(String estadoCivil) {
        this.estadoCivil = estadoCivil;
    }

    public Integer getTempoRelacionamentoAnos() {
        return tempoRelacionamentoAnos;
    }

    public void setTempoRelacionamentoAnos(Integer tempoRelacionamentoAnos) {
        this.tempoRelacionamentoAnos = tempoRelacionamentoAnos;
    }

    public String getEscolaridade() {
        return escolaridade;
    }

    public void setEscolaridade(String escolaridade) {
        this.escolaridade = escolaridade;
    }

    public String getMoraCom() {
        return moraCom;
    }

    public void setMoraCom(String moraCom) {
        this.moraCom = moraCom;
    }

    public String getReligiao() {
        return religiao;
    }

    public void setReligiao(String religiao) {
        this.religiao = religiao;
    }

    public String getReligiaoOutras() {
        return religiaoOutras;
    }

    public void setReligiaoOutras(String religiaoOutras) {
        this.religiaoOutras = religiaoOutras;
    }

    public String getFaixaSalarial() {
        return faixaSalarial;
    }

    public void setFaixaSalarial(String faixaSalarial) {
        this.faixaSalarial = faixaSalarial;
    }

    public BigDecimal getFaixaPrecoMinimo() {
        return faixaPrecoMinimo;
    }

    public void setFaixaPrecoMinimo(BigDecimal faixaPrecoMinimo) {
        this.faixaPrecoMinimo = faixaPrecoMinimo;
    }

    public BigDecimal getFaixaPrecoMaximo() {
        return faixaPrecoMaximo;
    }

    public void setFaixaPrecoMaximo(BigDecimal faixaPrecoMaximo) {
        this.faixaPrecoMaximo = faixaPrecoMaximo;
    }

    public Boolean getPossuiConvenio() {
        return possuiConvenio;
    }

    public void setPossuiConvenio(Boolean possuiConvenio) {
        this.possuiConvenio = possuiConvenio;
    }

    public String getNomeConvenio() {
        return nomeConvenio;
    }

    public void setNomeConvenio(String nomeConvenio) {
        this.nomeConvenio = nomeConvenio;
    }

    public Boolean getDispostoParticular() {
        return dispostoParticular;
    }

    public void setDispostoParticular(Boolean dispostoParticular) {
        this.dispostoParticular = dispostoParticular;
    }

    public Boolean getPossuiApoioFinanceiro() {
        return possuiApoioFinanceiro;
    }

    public void setPossuiApoioFinanceiro(Boolean possuiApoioFinanceiro) {
        this.possuiApoioFinanceiro = possuiApoioFinanceiro;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
    }

    public Long getIdCep() {
        return idCep;
    }

    public void setIdCep(Long idCep) {
        this.idCep = idCep;
    }

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getLogradouro() {
        return logradouro;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getBairro() {
        return bairro;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
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

    public BigDecimal getLatitude() {
        return latitude;
    }

    public void setLatitude(BigDecimal latitude) {
        this.latitude = latitude;
    }

    public BigDecimal getLongitude() {
        return longitude;
    }

    public void setLongitude(BigDecimal longitude) {
        this.longitude = longitude;
    }

    public String getDescricaoProblema() {
        return descricaoProblema;
    }

    public void setDescricaoProblema(String descricaoProblema) {
        this.descricaoProblema = descricaoProblema;
    }

    public String getProblemaPrincipal() {
        return problemaPrincipal;
    }

    public void setProblemaPrincipal(String problemaPrincipal) {
        this.problemaPrincipal = problemaPrincipal;
    }

    public String[] getProblemasSecundarios() {
        return problemasSecundarios;
    }

    public void setProblemasSecundarios(String[] problemasSecundarios) {
        this.problemasSecundarios = problemasSecundarios;
    }

    public Integer getNivelUrgencia() {
        return nivelUrgencia;
    }

    public void setNivelUrgencia(Integer nivelUrgencia) {
        this.nivelUrgencia = nivelUrgencia;
    }

    public String getModalidadePreferida() {
        return modalidadePreferida;
    }

    public void setModalidadePreferida(String modalidadePreferida) {
        this.modalidadePreferida = modalidadePreferida;
    }

    public String getFrequenciaSessoes() {
        return frequenciaSessoes;
    }

    public void setFrequenciaSessoes(String frequenciaSessoes) {
        this.frequenciaSessoes = frequenciaSessoes;
    }

    public String getDuracaoTratamentoEsperada() {
        return duracaoTratamentoEsperada;
    }

    public void setDuracaoTratamentoEsperada(String duracaoTratamentoEsperada) {
        this.duracaoTratamentoEsperada = duracaoTratamentoEsperada;
    }

    public String getGeneroTerapeutaPreferido() {
        return generoTerapeutaPreferido;
    }

    public void setGeneroTerapeutaPreferido(String generoTerapeutaPreferido) {
        this.generoTerapeutaPreferido = generoTerapeutaPreferido;
    }

    public String getFaixaEtariaTerapeutaPreferida() {
        return faixaEtariaTerapeutaPreferida;
    }

    public void setFaixaEtariaTerapeutaPreferida(String faixaEtariaTerapeutaPreferida) {
        this.faixaEtariaTerapeutaPreferida = faixaEtariaTerapeutaPreferida;
    }

    public Boolean getHistoricoTerapia() {
        return historicoTerapia;
    }

    public void setHistoricoTerapia(Boolean historicoTerapia) {
        this.historicoTerapia = historicoTerapia;
    }

    public LocalDate getQuandoParouTerapia() {
        return quandoParouTerapia;
    }

    public void setQuandoParouTerapia(LocalDate quandoParouTerapia) {
        this.quandoParouTerapia = quandoParouTerapia;
    }

    public String getMotivoInterrupcao() {
        return motivoInterrupcao;
    }

    public void setMotivoInterrupcao(String motivoInterrupcao) {
        this.motivoInterrupcao = motivoInterrupcao;
    }

    public String getAbordagemAnterior() {
        return abordagemAnterior;
    }

    public void setAbordagemAnterior(String abordagemAnterior) {
        this.abordagemAnterior = abordagemAnterior;
    }

    public Integer getExperienciaAvaliacao() {
        return experienciaAvaliacao;
    }

    public void setExperienciaAvaliacao(Integer experienciaAvaliacao) {
        this.experienciaAvaliacao = experienciaAvaliacao;
    }

    public Boolean getAcompanhamentoPsiquiatrico() {
        return acompanhamentoPsiquiatrico;
    }

    public void setAcompanhamentoPsiquiatrico(Boolean acompanhamentoPsiquiatrico) {
        this.acompanhamentoPsiquiatrico = acompanhamentoPsiquiatrico;
    }

    public Boolean getLgbtqSupportImportante() {
        return lgbtqSupportImportante;
    }

    public void setLgbtqSupportImportante(Boolean lgbtqSupportImportante) {
        this.lgbtqSupportImportante = lgbtqSupportImportante;
    }

    public String getOrientacaoSexual() {
        return orientacaoSexual;
    }

    public void setOrientacaoSexual(String orientacaoSexual) {
        this.orientacaoSexual = orientacaoSexual;
    }

    public String getIdentidadeGenero() {
        return identidadeGenero;
    }

    public void setIdentidadeGenero(String identidadeGenero) {
        this.identidadeGenero = identidadeGenero;
    }

    public Boolean getQuestoesReligiosasImportantes() {
        return questoesReligiosasImportantes;
    }

    public void setQuestoesReligiosasImportantes(Boolean questoesReligiosasImportantes) {
        this.questoesReligiosasImportantes = questoesReligiosasImportantes;
    }

    public String getApresentacaoIndividual() {
        return apresentacaoIndividual;
    }

    public void setApresentacaoIndividual(String apresentacaoIndividual) {
        this.apresentacaoIndividual = apresentacaoIndividual;
    }

    public String getMetasLongoPrazo() {
        return metasLongoPrazo;
    }

    public void setMetasLongoPrazo(String metasLongoPrazo) {
        this.metasLongoPrazo = metasLongoPrazo;
    }

    public Integer getExperienciaAutoconhecimento() {
        return experienciaAutoconhecimento;
    }

    public void setExperienciaAutoconhecimento(Integer experienciaAutoconhecimento) {
        this.experienciaAutoconhecimento = experienciaAutoconhecimento;
    }

    public Boolean getInteresseGruposTerapia() {
        return interesseGruposTerapia;
    }

    public void setInteresseGruposTerapia(Boolean interesseGruposTerapia) {
        this.interesseGruposTerapia = interesseGruposTerapia;
    }

    public Boolean getDisponibilidadeTarefasCasa() {
        return disponibilidadeTarefasCasa;
    }

    public void setDisponibilidadeTarefasCasa(Boolean disponibilidadeTarefasCasa) {
        this.disponibilidadeTarefasCasa = disponibilidadeTarefasCasa;
    }

    public Boolean getFlexibilidadeHorarios() {
        return flexibilidadeHorarios;
    }

    public void setFlexibilidadeHorarios(Boolean flexibilidadeHorarios) {
        this.flexibilidadeHorarios = flexibilidadeHorarios;
    }

    public String[] getHorariosPreferenciais() {
        return horariosPreferenciais;
    }

    public void setHorariosPreferenciais(String[] horariosPreferenciais) {
        this.horariosPreferenciais = horariosPreferenciais;
    }

    public String[] getDiasDisponiveis() {
        return diasDisponiveis;
    }

    public void setDiasDisponiveis(String[] diasDisponiveis) {
        this.diasDisponiveis = diasDisponiveis;
    }

    public String getDisponibilidadeHorarios() {
        return disponibilidadeHorarios;
    }

    public void setDisponibilidadeHorarios(String disponibilidadeHorarios) {
        this.disponibilidadeHorarios = disponibilidadeHorarios;
    }
}
