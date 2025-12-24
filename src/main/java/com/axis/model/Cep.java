package com.axis.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.math.BigDecimal;
import java.time.LocalDateTime;


@Entity
@Table(name = "tb_cep", schema = "core", indexes = {
    @Index(name = "idx_tb_cep_nr_cep", columnList = "nr_cep"),
    @Index(name = "idx_tb_cep_cidade", columnList = "cidade"),
    @Index(name = "idx_tb_cep_uf", columnList = "uf"),
    @Index(name = "idx_tb_cep_geo", columnList = "latitude, longitude")
})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Cep {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_cep")
    private Long idCep;

    @Column(name = "nr_cep", nullable = false, unique = true, length = 10)
    private String nrCep;

    @Column(name = "nm_logradouro", length = 200)
    private String nmLogradouro;

    @Column(name = "nm_bairro", length = 100)
    private String nmBairro;

    @Column(name = "ds_complemento", length = 100)
    private String dsComplemento;

    
    @Column(name = "cidade", length = 100, nullable = false)
    private String cidade;

    
    @Column(name = "uf", length = 2, nullable = false)
    private String uf;

    
    @Column(name = "codigo_ibge", length = 10)
    private String codigoIbge;

    

    @Column(name = "latitude", precision = 10, scale = 8)
    private BigDecimal latitude;

    @Column(name = "longitude", precision = 11, scale = 8)
    private BigDecimal longitude;

    @Builder.Default
    @Column(name = "precisao_metros")
    private Integer precisaoMetros = 100;

    
    @Column(name = "fonte", length = 50)
    private String fonte;

    

    @Builder.Default
    @Column(name = "in_ativo", nullable = false)
    private Boolean inAtivo = true;

    @Column(name = "dt_criacao")
    private LocalDateTime dtCriacao;

    @Column(name = "dt_atualizacao")
    private LocalDateTime dtAtualizacao;

    

    @PrePersist
    protected void onCreate() {
        dtCriacao = LocalDateTime.now();
        dtAtualizacao = LocalDateTime.now();
        if (inAtivo == null) {
            inAtivo = true;
        }
    }

    @PreUpdate
    protected void onUpdate() {
        dtAtualizacao = LocalDateTime.now();
    }

    

    
    public boolean hasGeolocation() {
        return latitude != null && longitude != null;
    }

    
    public String getEnderecoFormatado() {
        StringBuilder sb = new StringBuilder();

        if (nmLogradouro != null && !nmLogradouro.isEmpty()) {
            sb.append(nmLogradouro);
        }

        if (nmBairro != null && !nmBairro.isEmpty()) {
            if (sb.length() > 0) sb.append(" - ");
            sb.append(nmBairro);
        }

        if (cidade != null && !cidade.isEmpty()) {
            if (sb.length() > 0) sb.append(", ");
            sb.append(cidade);
        }

        if (uf != null && !uf.isEmpty()) {
            if (sb.length() > 0) sb.append(" - ");
            sb.append(uf);
        }

        if (sb.length() > 0) sb.append(" - ");
        sb.append("CEP: ").append(nrCep);

        return sb.toString();
    }

    
    public String getCidadeUf() {
        if (cidade == null || cidade.isEmpty()) {
            return null;
        }
        if (uf != null && !uf.isEmpty()) {
            return cidade + " - " + uf;
        }
        return cidade;
    }
}
