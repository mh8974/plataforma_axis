package com.axis.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.DecimalMin;
import java.math.BigDecimal;

public class TerapeutaRequestDTO {
    @NotNull(message = "Usuario ID é obrigatório")
    private Long usuarioId;

    @NotBlank(message = "CPF é obrigatório")
    private String cpf;

    
    private String crp;

    @NotBlank(message = "Instituição de formação é obrigatória")
    private String instituicaoFormacao;

    @NotNull(message = "Ano de formação é obrigatório")
    @Min(value = 1950, message = "Ano de formação deve ser maior que 1950")
    private Integer anoFormacao;

    @NotBlank(message = "Especialidades são obrigatórias")
    private String especialidades;

    private String bio;

    @NotBlank(message = "Localização da clínica é obrigatória")
    private String localizacaoClinica;

    private String metodosPagamento;

    @DecimalMin(value = "0.0", inclusive = false, message = "Valor da sessão deve ser maior que zero")
    private BigDecimal valorSessao;

    private String assuntosPrediletos;

    private String atenderiaPorAmor;

    private String causaSangue;

    private String filmesMarcantes;

    private String hobby;

    private String inspiracao;

    private String maiorMudanca;

    private String marcaDeixar;

    private String superacoes;

    private String trabalhoAntesSaudeMental;

    private String filhosDeficiencia;

    
    public TerapeutaRequestDTO() {}

    
    public Long getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Long usuarioId) {
        this.usuarioId = usuarioId;
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

    public String getAssuntosPrediletos() {
        return assuntosPrediletos;
    }

    public void setAssuntosPrediletos(String assuntosPrediletos) {
        this.assuntosPrediletos = assuntosPrediletos;
    }

    public String getAtenderiaPorAmor() {
        return atenderiaPorAmor;
    }

    public void setAtenderiaPorAmor(String atenderiaPorAmor) {
        this.atenderiaPorAmor = atenderiaPorAmor;
    }

    public String getCausaSangue() {
        return causaSangue;
    }

    public void setCausaSangue(String causaSangue) {
        this.causaSangue = causaSangue;
    }

    public String getFilmesMarcantes() {
        return filmesMarcantes;
    }

    public void setFilmesMarcantes(String filmesMarcantes) {
        this.filmesMarcantes = filmesMarcantes;
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

    public String getMaiorMudanca() {
        return maiorMudanca;
    }

    public void setMaiorMudanca(String maiorMudanca) {
        this.maiorMudanca = maiorMudanca;
    }

    public String getMarcaDeixar() {
        return marcaDeixar;
    }

    public void setMarcaDeixar(String marcaDeixar) {
        this.marcaDeixar = marcaDeixar;
    }

    public String getSuperacoes() {
        return superacoes;
    }

    public void setSuperacoes(String superacoes) {
        this.superacoes = superacoes;
    }

    public String getTrabalhoAntesSaudeMental() {
        return trabalhoAntesSaudeMental;
    }

    public void setTrabalhoAntesSaudeMental(String trabalhoAntesSaudeMental) {
        this.trabalhoAntesSaudeMental = trabalhoAntesSaudeMental;
    }

    public String getFilhosDeficiencia() {
        return filhosDeficiencia;
    }

    public void setFilhosDeficiencia(String filhosDeficiencia) {
        this.filhosDeficiencia = filhosDeficiencia;
    }
}