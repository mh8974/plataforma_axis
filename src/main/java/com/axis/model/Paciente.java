package com.axis.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "pacientes", schema = "core")
public class Paciente {
    @Id
    @Column(name = "usuario_id")
    private Long usuarioId;

    
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", referencedColumnName = "id", insertable = false, updatable = false)
    private Usuario usuario;

    @Column(nullable = false)
    private Integer idade;

    @Column(nullable = false)
    private String sexo;

    

    @Column(length = 100)
    private String profissao;

    @Column(length = 50)
    private String estadoCivil; 

    @Column
    private Integer tempoRelacionamentoAnos; 

    @Column(length = 50)
    private String escolaridade;

    @Column(length = 50)
    private String moraCom; 

    @Column(length = 50)
    private String religiao; 

    @Column(columnDefinition = "TEXT")
    private String religiaoOutras; 

    @Column(nullable = false)
    private String faixaSalarial;

    @Column(nullable = false)
    private String localizacao;

    

    
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

    @Column(nullable = false, columnDefinition = "TEXT")
    private String descricaoProblema;

    @Column(nullable = false)
    private LocalDateTime dataCriacao;

    @Column(nullable = false)
    private LocalDateTime dataAtualizacao;

    
    
    
    @Column(length = 100)
    private String problemaPrincipal;
    
    @Column(columnDefinition = "text[]")
    private String[] problemasSecundarios;

    @Column(columnDefinition = "text[]")
    private String[] preferenciasProfissional; 

    @Column
    private Integer nivelUrgencia; 
    
    
    @Column(length = 50)
    private String modalidadePreferida; 
    
    @Column(length = 50)
    private String frequenciaSessoes; 
    
    @Column(length = 50)
    private String duracaoTratamentoEsperada; 
    
    
    @Column(length = 50)
    private String generoTerapeutaPreferido; 
    
    @Column(length = 50)
    private String faixaEtariaTerapeutaPreferida; 
    
    
    @Column(precision = 10, scale = 2)
    private BigDecimal faixaPrecoMinimo;
    
    @Column(precision = 10, scale = 2)
    private BigDecimal faixaPrecoMaximo;
    
    @Column
    private Boolean possuiConvenio = false;
    
    @Column(length = 100)
    private String nomeConvenio;
    
    @Column
    private Boolean dispostoParticular = true;

    
    @Column
    private Boolean possuiApoioFinanceiro;

    
    @Column
    private Boolean historicoTerapia = false;
    
    @Column
    private LocalDate quandoParouTerapia;
    
    @Column(columnDefinition = "TEXT")
    private String motivoInterrupcao;
    
    @Column(length = 100)
    private String abordagemAnterior;
    
    @Column
    private Integer experienciaAvaliacao; 
    
    @Column
    private Boolean acompanhamentoPsiquiatrico = false;
    
    
    @Column
    private Boolean lgbtqSupportImportante = false;
    
    @Column(length = 50)
    private String orientacaoSexual;
    
    @Column(length = 50)
    private String identidadeGenero;
    
    @Column
    private Boolean questoesReligiosasImportantes = false;
    
    
    @Column(name = "apresentacao_individual", columnDefinition = "TEXT")
    private String apresentacaoIndividual;

    @Column(columnDefinition = "TEXT")
    private String metasLongoPrazo;
    
    @Column
    private Integer experienciaAutoconhecimento; 
    
    @Column
    private Boolean interesseGruposTerapia = false;
    
    @Column
    private Boolean disponibilidadeTarefasCasa = true;
    
    
    @Column
    private Boolean flexibilidadeHorarios = true;
    
    @Column(columnDefinition = "text[]")
    private String[] horariosPreferenciais; 
    
    @Column(columnDefinition = "text[]")
    private String[] diasDisponiveis; 

    @Column(name = "disponibilidade_horarios", columnDefinition = "TEXT")
    private String disponibilidadeHorarios; 

    
    public Paciente() {}

    public Paciente(Long usuarioId, Integer idade, String sexo, String faixaSalarial, String localizacao, String descricaoProblema) {
        this.usuarioId = usuarioId;
        this.idade = idade;
        this.sexo = sexo;
        this.faixaSalarial = faixaSalarial;
        this.localizacao = localizacao;
        this.descricaoProblema = descricaoProblema;
        this.dataCriacao = LocalDateTime.now();
        this.dataAtualizacao = LocalDateTime.now();
        
        
        this.possuiConvenio = false;
        this.dispostoParticular = true;
        this.historicoTerapia = false;
        this.acompanhamentoPsiquiatrico = false;
        this.lgbtqSupportImportante = false;
        this.questoesReligiosasImportantes = false;
        this.interesseGruposTerapia = false;
        this.disponibilidadeTarefasCasa = true;
        this.flexibilidadeHorarios = true;
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

    public String[] getPreferenciasProfissional() {
        return preferenciasProfissional;
    }

    public void setPreferenciasProfissional(String[] preferenciasProfissional) {
        this.preferenciasProfissional = preferenciasProfissional;
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

    public String getDisponibilidadeHorarios() {
        return disponibilidadeHorarios;
    }

    public void setDisponibilidadeHorarios(String disponibilidadeHorarios) {
        this.disponibilidadeHorarios = disponibilidadeHorarios;
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