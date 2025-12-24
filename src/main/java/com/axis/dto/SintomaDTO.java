package com.axis.dto;

public class SintomaDTO {
    private Long id;
    private String nome;
    private String categoria;
    private String descricao;
    private String[] palavrasChave;
    private Integer nivelSeveridade;
    private Integer[] especialidadesRelacionadas;
    private String corHex;
    private Boolean ativo;

    
    public SintomaDTO() {}

    
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

    public String getCategoria() {
        return categoria;
    }

    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String[] getPalavrasChave() {
        return palavrasChave;
    }

    public void setPalavrasChave(String[] palavrasChave) {
        this.palavrasChave = palavrasChave;
    }

    public Integer getNivelSeveridade() {
        return nivelSeveridade;
    }

    public void setNivelSeveridade(Integer nivelSeveridade) {
        this.nivelSeveridade = nivelSeveridade;
    }

    public Integer[] getEspecialidadesRelacionadas() {
        return especialidadesRelacionadas;
    }

    public void setEspecialidadesRelacionadas(Integer[] especialidadesRelacionadas) {
        this.especialidadesRelacionadas = especialidadesRelacionadas;
    }

    public String getCorHex() {
        return corHex;
    }

    public void setCorHex(String corHex) {
        this.corHex = corHex;
    }

    public Boolean getAtivo() {
        return ativo;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }
}