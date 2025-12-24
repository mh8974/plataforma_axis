package com.axis.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class PacienteDTO {
    private Long usuarioId;
    private String nome;
    private String email;
    private Integer idade;
    private String sexo;
    private String faixaSalarial;
    private String localizacao;
    private String descricaoProblema;

    
    private String problemaPrincipal;
    private String[] problemasSecundarios;
    private Integer nivelUrgencia;
    private String modalidadePreferida;
    private String frequenciaSessoes;
    private String duracaoTratamentoEsperada;
    private String generoTerapeutaPreferido;
    private String faixaEtariaTerapeutaPreferida;
    private BigDecimal faixaPrecoMinimo;
    private BigDecimal faixaPrecoMaximo;
    private Boolean possuiConvenio;
    private String nomeConvenio;
    private Boolean dispostoParticular;
    private Boolean possuiApoioFinanceiro;
    private Boolean historicoTerapia;
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

    
    private String profissao;
    private String estadoCivil;
    private Integer tempoRelacionamentoAnos;
    private String escolaridade;
    private String moraCom;
    private String religiao;
    private String religiaoOutras;

    
    private Long idCep;
    private String cep; 
    private String numeroEndereco;
    private String complementoEndereco;
    private String complementoLocalizacao;

    
    private String disponibilidadeHorarios; 

    
    private String[] preferenciasProfissional;

    
    public PacienteDTO() {}

    
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

    public String getFaixaSalarial() {
        return faixaSalarial;
    }

    public void setFaixaSalarial(String faixaSalarial) {
        this.faixaSalarial = faixaSalarial;
    }

    public String getLocalizacao() {
        return localizacao;
    }

    public void setLocalizacao(String localizacao) {
        this.localizacao = localizacao;
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

    public String getDisponibilidadeHorarios() {
        return disponibilidadeHorarios;
    }

    public void setDisponibilidadeHorarios(String disponibilidadeHorarios) {
        this.disponibilidadeHorarios = disponibilidadeHorarios;
    }

    public String[] getPreferenciasProfissional() {
        return preferenciasProfissional;
    }

    public void setPreferenciasProfissional(String[] preferenciasProfissional) {
        this.preferenciasProfissional = preferenciasProfissional;
    }
}