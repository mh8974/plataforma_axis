package com.axis.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EnderecoDTO {

    
    @NotBlank(message = "CEP é obrigatório")
    @Pattern(regexp = "^[0-9]{5}-?[0-9]{3}$", message = "CEP inválido. Use formato: 12345-678")
    private String cep;

    
    private String logradouro;

    
    @Size(max = 10, message = "Número do endereço deve ter no máximo 10 caracteres")
    private String numero;

    
    @Size(max = 100, message = "Complemento deve ter no máximo 100 caracteres")
    private String complemento;

    
    private String referencia;

    
    private String bairro;

    
    private String cidade;

    
    @Pattern(regexp = "^[A-Z]{2}$", message = "UF inválida. Use formato: SP, RJ, MG")
    private String uf;

    
    private String codigoIbge;

    
    private BigDecimal latitude;

    
    private BigDecimal longitude;

    
    private Integer precisaoMetros;

    
    private String fonte;

    
    private String modalidade;

    
    public boolean hasGeolocation() {
        return latitude != null && longitude != null;
    }

    
    public String getCepFormatado() {
        if (cep == null) return null;
        String somenteNumeros = cep.replaceAll("[^0-9]", "");
        if (somenteNumeros.length() == 8) {
            return somenteNumeros.substring(0, 5) + "-" + somenteNumeros.substring(5);
        }
        return cep;
    }

    
    public String getEnderecoFormatado() {
        StringBuilder sb = new StringBuilder();

        if (logradouro != null && !logradouro.isEmpty()) {
            sb.append(logradouro);
        }

        if (numero != null && !numero.isEmpty()) {
            if (sb.length() > 0) sb.append(", ");
            sb.append(numero);
        }

        if (complemento != null && !complemento.isEmpty()) {
            if (sb.length() > 0) sb.append(", ");
            sb.append(complemento);
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
        sb.append("CEP: ").append(getCepFormatado());

        return sb.toString();
    }
}
