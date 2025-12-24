package com.axis.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Max;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public class PacienteRequestDTO {
    
    @NotNull(message = "Usuario ID é obrigatório")
    private Long usuarioId;

    
    @Min(value = 18, message = "Idade mínima é 18 anos")
    @Max(value = 120, message = "Idade máxima é 120 anos")
    private Integer idade;

    private String sexo;

    
    private String profissao;
    private String estadoCivil; 
    private Integer tempoRelacionamentoAnos; 
    private String escolaridade;
    private String moraCom; 
    private String religiao; 
    private String religiaoOutras; 

    @NotBlank(message = "Faixa salarial é obrigatória")
    private String faixaSalarial;

    @NotBlank(message = "Localização é obrigatória")
    private String localizacao;

    
    private String cep;
    private String numero;
    private String complemento;
    private BigDecimal latitudeGPS;
    private BigDecimal longitudeGPS;

    @NotBlank(message = "Descrição do problema é obrigatória")
    private String descricaoProblema;

    

    
    private String problemaPrincipal;
    private List<String> problemasSecundarios;

    @Min(value = 1, message = "Nível de urgência mínimo é 1")
    @Max(value = 10, message = "Nível de urgência máximo é 10")
    private Integer nivelUrgencia;

    
    private String modalidadePreferida; 
    private String frequenciaSessoes; 
    private String duracaoTratamentoEsperada; 
    private List<String> diasDisponiveis;
    private List<String> horariosPreferenciais;
    private Boolean flexibilidadeHorarios;
    private String disponibilidadeHorarios; 

    
    private String generoTerapeutaPreferido; 
    private String faixaEtariaTerapeutaPreferida; 
    private List<String> preferenciasProfissional; 

    
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

    @Min(value = 1, message = "Avaliação de experiência mínima é 1")
    @Max(value = 10, message = "Avaliação de experiência máxima é 10")
    private Integer experienciaAvaliacao;

    private Boolean acompanhamentoPsiquiatrico;

    
    private Boolean lgbtqSupportImportante;
    private String orientacaoSexual;
    private String identidadeGenero;
    private Boolean questoesReligiosasImportantes;

    
    private String apresentacaoIndividual;
    private String metasLongoPrazo;

    @Min(value = 1, message = "Experiência de autoconhecimento mínima é 1")
    @Max(value = 10, message = "Experiência de autoconhecimento máxima é 10")
    private Integer experienciaAutoconhecimento;

    private Boolean interesseGruposTerapia;
    private Boolean disponibilidadeTarefasCasa;

    
    public PacienteRequestDTO() {}

    public PacienteRequestDTO(Long usuarioId, Integer idade, String sexo, String faixaSalarial, 
                              String localizacao, String descricaoProblema) {
        this.usuarioId = usuarioId;
        this.idade = idade;
        this.sexo = sexo;
        this.faixaSalarial = faixaSalarial;
        this.localizacao = localizacao;
        this.descricaoProblema = descricaoProblema;
    }

    
    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
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

    public List<String> getProblemasSecundarios() {
        return problemasSecundarios;
    }

    public void setProblemasSecundarios(List<String> problemasSecundarios) {
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

    public List<String> getDiasDisponiveis() {
        return diasDisponiveis;
    }

    public void setDiasDisponiveis(List<String> diasDisponiveis) {
        this.diasDisponiveis = diasDisponiveis;
    }

    public List<String> getHorariosPreferenciais() {
        return horariosPreferenciais;
    }

    public void setHorariosPreferenciais(List<String> horariosPreferenciais) {
        this.horariosPreferenciais = horariosPreferenciais;
    }

    public Boolean getFlexibilidadeHorarios() {
        return flexibilidadeHorarios;
    }

    public void setFlexibilidadeHorarios(Boolean flexibilidadeHorarios) {
        this.flexibilidadeHorarios = flexibilidadeHorarios;
    }

    public String getDisponibilidadeHorarios() {
        return disponibilidadeHorarios;
    }

    public void setDisponibilidadeHorarios(String disponibilidadeHorarios) {
        this.disponibilidadeHorarios = disponibilidadeHorarios;
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

    public List<String> getPreferenciasProfissional() {
        return preferenciasProfissional;
    }

    public void setPreferenciasProfissional(List<String> preferenciasProfissional) {
        this.preferenciasProfissional = preferenciasProfissional;
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

    

    public String getCep() {
        return cep;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getNumero() {
        return numero;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getComplemento() {
        return complemento;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public BigDecimal getLatitudeGPS() {
        return latitudeGPS;
    }

    public void setLatitudeGPS(BigDecimal latitudeGPS) {
        this.latitudeGPS = latitudeGPS;
    }

    public BigDecimal getLongitudeGPS() {
        return longitudeGPS;
    }

    public void setLongitudeGPS(BigDecimal longitudeGPS) {
        this.longitudeGPS = longitudeGPS;
    }
}