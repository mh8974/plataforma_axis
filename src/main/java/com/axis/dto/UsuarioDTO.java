package com.axis.dto;

import com.axis.model.Role;

public class UsuarioDTO {
    private Long id;
    private String nome;
    private String email;
    private String senha;
    private Role tipo;
    private Boolean ativo;
    private String statusPerfil;
    private String cpf;

    
    public UsuarioDTO() {}

    public UsuarioDTO(Long id, String nome, String email, String senha, Role tipo, Boolean ativo) {
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.tipo = tipo;
        this.ativo = ativo;
    }

    
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

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Role getTipo() {
        return tipo;
    }

    public void setTipo(Role tipo) {
        this.tipo = tipo;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public String getStatusPerfil() {
        return statusPerfil;
    }

    public void setStatusPerfil(String statusPerfil) {
        this.statusPerfil = statusPerfil;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
}