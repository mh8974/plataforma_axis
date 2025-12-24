package com.axis.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.math.BigDecimal;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CepConsultaResponseDTO {

    
    private Long idCep;

    
    private String cep;

    
    private String logradouro;

    
    private String bairro;

    
    private String complemento;

    
    private String cidade;

    
    private String codigoIbge;

    
    private String uf;

    
    private String nomeEstado;

    
    private BigDecimal latitude;

    
    private BigDecimal longitude;

    
    private Integer precisaoMetros;

    
    private String fonte;

    
    private String origem;

    
    private Boolean fromCache;

    
    private Boolean temGeolocalizacao;

    
    private String mensagem;

    
    public boolean hasGeolocation() {
        return latitude != null && longitude != null;
    }

    
    public String getEnderecoFormatado() {
        StringBuilder sb = new StringBuilder();

        if (logradouro != null && !logradouro.isEmpty()) {
            sb.append(logradouro);
        }

        if (bairro != null && !bairro.isEmpty()) {
            if (sb.length() > 0) sb.append(" - ");
            sb.append(bairro);
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
        sb.append("CEP: ").append(cep);

        return sb.toString();
    }
}
