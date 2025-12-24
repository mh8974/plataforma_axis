package com.axis.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "usuarios", schema = "core")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(name = "senha_hash", nullable = false)
    private String senhaHash;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role tipo;

    @Column
    private String telefone;

    @Column(unique = true, length = 255)
    private String cpf;

    @Column(name = "data_criacao", nullable = false)
    private LocalDateTime dataCriacao = LocalDateTime.now();

    @Column(name = "data_atualizacao", nullable = false)
    private LocalDateTime dataAtualizacao = LocalDateTime.now();

    @Column(nullable = false)
    private Boolean ativo = true;

    @Column(name = "status_perfil", length = 50)
    private String statusPerfil = "INCOMPLETO";

    
    public Usuario() {
        this.dataCriacao = LocalDateTime.now();
        this.dataAtualizacao = LocalDateTime.now();
        this.ativo = true;
        this.statusPerfil = "INCOMPLETO";
    }

    public Usuario(String nome, String email, String senhaHash, Role tipo) {
        this.nome = nome;
        this.email = email;
        this.senhaHash = senhaHash;
        this.tipo = tipo;
        this.dataCriacao = LocalDateTime.now();
        this.dataAtualizacao = LocalDateTime.now();
        this.ativo = true;
        this.statusPerfil = "INCOMPLETO";
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

    public String getSenhaHash() {
        return senhaHash;
    }

    public void setSenhaHash(String senhaHash) {
        this.senhaHash = senhaHash;
    }

    public Role getTipo() {
        return tipo;
    }

    public void setTipo(Role tipo) {
        this.tipo = tipo;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao != null ? dataCriacao : LocalDateTime.now();
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao != null ? dataCriacao : LocalDateTime.now();
    }

    public LocalDateTime getDataAtualizacao() {
        return dataAtualizacao != null ? dataAtualizacao : LocalDateTime.now();
    }

    public void setDataAtualizacao(LocalDateTime dataAtualizacao) {
        this.dataAtualizacao = dataAtualizacao != null ? dataAtualizacao : LocalDateTime.now();
    }

    public Boolean getAtivo() {
        return ativo != null ? ativo : true;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo != null ? ativo : true;
    }

    public String getTelefone() {
        return telefone;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public String getStatusPerfil() {
        return statusPerfil != null ? statusPerfil : "INCOMPLETO";
    }

    public void setStatusPerfil(String statusPerfil) {
        this.statusPerfil = statusPerfil != null ? statusPerfil : "INCOMPLETO";
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }
}