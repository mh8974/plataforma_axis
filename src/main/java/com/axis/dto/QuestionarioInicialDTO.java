package com.axis.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public class QuestionarioInicialDTO {

    @NotBlank(message = "Nome completo é obrigatório")
    private String nomeCompleto;

    @NotBlank(message = "Email é obrigatório")
    @Email(message = "Email deve ter formato válido")
    private String email;

    @NotBlank(message = "Senha é obrigatória")
    @Size(min = 6, message = "Senha deve ter pelo menos 6 caracteres")
    private String senha;

    @NotBlank(message = "Confirmação da senha é obrigatória")
    private String confirmarSenha;

    @NotBlank(message = "Telefone é obrigatório")
    private String telefone;

    private String ddi = "+55";

    @NotBlank(message = "CPF é obrigatório para terapeutas")
    private String cpf;

    @NotNull(message = "Aceitar termos é obrigatório")
    private Boolean aceitaTermos;

    
    private String tipo = "TERAPEUTA";

    
    public QuestionarioInicialDTO() {}

    
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

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}