package com.axis.dto;

import java.time.LocalDate;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;


public class CadastroCompletoDTO {

    
    private String nomeCompleto;
    private String email;
    private String senha;
    private String confirmarSenha;
    private String telefone;
    private String ddi;
    private String cpf;
    private Boolean aceitaTermos;

    
    private LocalDate dataNascimento;
    private String identidadeGenero;
    private String religiao;
    private String crp;

    
    private String cep;
    private String logradouro;
    private String bairro;
    private String localidade;
    private String uf;
    private String estado;

    
    private List<String> abordagensPrincipais;
    private List<String> abordagensSecundarias;
    private List<String> tipoTerapia;
    private Integer experienciaAnos;
    private Boolean primeiraConsultaGratuita;
    private String oQueNaoGostaAtender;
    private String casesSucesso;
    private String feedbackPacientes;
    private String demandaMaisComum;
    private String instituicaoFormacao;
    private Integer anoFormacao;
    private List<String> especialidades;
    private String bio;

    
    private String estadoCivil;
    private Integer anosRelacionamento;
    private Boolean possuiFilhos;
    private Integer quantidadeFilhos;
    private List<Integer> idadesFilhos;
    private String filhosDeficiencia;

    
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

    
    private String modalidadeAtendimento;
    private String localizacaoProfissional;
    private String localizacaoClinica;
    private String rua;
    private String numero;
    private String complemento;

    
    private List<String> diasAtendimento;
    private Map<String, List<String>> horariosAtendimento;
    private BigDecimal valorSessao;
    private String diaReuniao;
    private String horarioReuniao;

    
    private Map<String, String> redesSociais;

    
    public CadastroCompletoDTO() {}

    
    public String getNomeCompleto() {
        return nomeCompleto;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getConfirmarSenha() {
        return confirmarSenha;
    }

    public void setConfirmarSenha(String confirmarSenha) {
        this.confirmarSenha = confirmarSenha;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getDdi() {
        return ddi;
    }

    public void setDdi(String ddi) {
        this.ddi = ddi;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Boolean getAceitaTermos() {
        return aceitaTermos;
    }

    public void setAceitaTermos(Boolean aceitaTermos) {
        this.aceitaTermos = aceitaTermos;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getIdentidadeGenero() {
        return identidadeGenero;
    }

    public void setIdentidadeGenero(String identidadeGenero) {
        this.identidadeGenero = identidadeGenero;
    }

    public String getReligiao() {
        return religiao;
    }

    public void setReligiao(String religiao) {
        this.religiao = religiao;
    }

    public String getCrp() {
        return crp;
    }

    public void setCrp(String crp) {
        this.crp = crp;
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

    public String getLocalidade() {
        return localidade;
    }

    public void setLocalidade(String localidade) {
        this.localidade = localidade;
    }

    public String getUf() {
        return uf;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public List<String> getAbordagensPrincipais() {
        return abordagensPrincipais;
    }

    public void setAbordagensPrincipais(List<String> abordagensPrincipais) {
        this.abordagensPrincipais = abordagensPrincipais;
    }

    public List<String> getAbordagensSecundarias() {
        return abordagensSecundarias;
    }

    public void setAbordagensSecundarias(List<String> abordagensSecundarias) {
        this.abordagensSecundarias = abordagensSecundarias;
    }

    public List<String> getTipoTerapia() {
        return tipoTerapia;
    }

    public void setTipoTerapia(List<String> tipoTerapia) {
        this.tipoTerapia = tipoTerapia;
    }

    public Integer getExperienciaAnos() {
        return experienciaAnos;
    }

    public void setExperienciaAnos(Integer experienciaAnos) {
        this.experienciaAnos = experienciaAnos;
    }

    public Boolean getPrimeiraConsultaGratuita() {
        return primeiraConsultaGratuita;
    }

    public void setPrimeiraConsultaGratuita(Boolean primeiraConsultaGratuita) {
        this.primeiraConsultaGratuita = primeiraConsultaGratuita;
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

    public List<String> getEspecialidades() {
        return especialidades;
    }

    public void setEspecialidades(List<String> especialidades) {
        this.especialidades = especialidades;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
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

    public List<Integer> getIdadesFilhos() {
        return idadesFilhos;
    }

    public void setIdadesFilhos(List<Integer> idadesFilhos) {
        this.idadesFilhos = idadesFilhos;
    }

    public String getFilhosDeficiencia() {
        return filhosDeficiencia;
    }

    public void setFilhosDeficiencia(String filhosDeficiencia) {
        this.filhosDeficiencia = filhosDeficiencia;
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

    public String getModalidadeAtendimento() {
        return modalidadeAtendimento;
    }

    public void setModalidadeAtendimento(String modalidadeAtendimento) {
        this.modalidadeAtendimento = modalidadeAtendimento;
    }

    public String getLocalizacaoProfissional() {
        return localizacaoProfissional;
    }

    public void setLocalizacaoProfissional(String localizacaoProfissional) {
        this.localizacaoProfissional = localizacaoProfissional;
    }

    public String getLocalizacaoClinica() {
        return localizacaoClinica;
    }

    public void setLocalizacaoClinica(String localizacaoClinica) {
        this.localizacaoClinica = localizacaoClinica;
    }

    public String getRua() {
        return rua;
    }

    public void setRua(String rua) {
        this.rua = rua;
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

    public List<String> getDiasAtendimento() {
        return diasAtendimento;
    }

    public void setDiasAtendimento(List<String> diasAtendimento) {
        this.diasAtendimento = diasAtendimento;
    }

    public Map<String, List<String>> getHorariosAtendimento() {
        return horariosAtendimento;
    }

    public void setHorariosAtendimento(Map<String, List<String>> horariosAtendimento) {
        this.horariosAtendimento = horariosAtendimento;
    }

    public BigDecimal getValorSessao() {
        return valorSessao;
    }

    public void setValorSessao(BigDecimal valorSessao) {
        this.valorSessao = valorSessao;
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

    public Map<String, String> getRedesSociais() {
        return redesSociais;
    }

    public void setRedesSociais(Map<String, String> redesSociais) {
        this.redesSociais = redesSociais;
    }
}