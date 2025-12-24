package com.axis.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import com.fasterxml.jackson.annotation.JsonProperty;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class ViaCepResponseDTO {

    @JsonProperty("cep")
    private String cep;

    @JsonProperty("logradouro")
    private String logradouro;

    @JsonProperty("complemento")
    private String complemento;

    @JsonProperty("unidade")
    private String unidade;

    @JsonProperty("bairro")
    private String bairro;

    @JsonProperty("localidade")
    private String localidade; 

    @JsonProperty("uf")
    private String uf; 

    @JsonProperty("estado")
    private String estado; 

    @JsonProperty("regiao")
    private String regiao; 

    @JsonProperty("ibge")
    private String ibge; 

    @JsonProperty("gia")
    private String gia;

    @JsonProperty("ddd")
    private String ddd;

    @JsonProperty("siafi")
    private String siafi;

    @JsonProperty("erro")
    private Boolean erro; 

    
    public boolean hasErro() {
        return erro != null && erro;
    }

    
    public EnderecoDTO toEnderecoDTO() {
        return EnderecoDTO.builder()
            .cep(cep)
            .logradouro(logradouro)
            .complemento(complemento)
            .bairro(bairro)
            .cidade(localidade)
            .uf(uf)
            .codigoIbge(ibge)
            .latitude(null) 
            .longitude(null)
            .fonte("VIACEP")
            .build();
    }
}
