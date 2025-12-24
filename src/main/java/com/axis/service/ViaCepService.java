package com.axis.service;

import com.axis.dto.ViaCepResponseDTO;
import com.axis.exception.BadRequestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;


@Service
public class ViaCepService {

    private static final Logger logger = LoggerFactory.getLogger(ViaCepService.class);
    private static final String VIACEP_URL = "https://viacep.com.br/ws/{cep}/json/";

    private final RestTemplate restTemplate;

    public ViaCepService() {
        this.restTemplate = new RestTemplate();
    }

    
    public ViaCepResponseDTO buscar(String cep) {
        
        String cepLimpo = limparCep(cep);

        if (!validarCep(cepLimpo)) {
            logger.warn("CEP inválido fornecido: {}", cep);
            throw new BadRequestException("CEP inválido. Use o formato 00000-000 ou 00000000");
        }

        try {
            logger.info("Consultando ViaCEP para CEP: {}", cepLimpo);

            ViaCepResponseDTO response = restTemplate.getForObject(
                VIACEP_URL,
                ViaCepResponseDTO.class,
                cepLimpo
            );

            
            if (response != null && Boolean.TRUE.equals(response.getErro())) {
                logger.warn("CEP não encontrado no ViaCEP: {}", cepLimpo);
                throw new BadRequestException("CEP não encontrado");
            }

            if (response == null) {
                logger.error("Resposta nula do ViaCEP para CEP: {}", cepLimpo);
                throw new BadRequestException("Erro ao consultar CEP");
            }

            logger.info("CEP {} consultado com sucesso no ViaCEP: {}, {}-{}",
                cepLimpo, response.getLogradouro(), response.getLocalidade(), response.getUf());

            return response;

        } catch (HttpClientErrorException e) {
            logger.error("Erro HTTP ao consultar ViaCEP: {} - {}", e.getStatusCode(), e.getMessage());
            throw new BadRequestException("Erro ao consultar CEP: " + e.getMessage());
        } catch (RestClientException e) {
            logger.error("Erro de rede ao consultar ViaCEP: {}", e.getMessage());
            throw new BadRequestException("Erro de comunicação com o serviço de CEP. Tente novamente.");
        }
    }

    
    private String limparCep(String cep) {
        if (cep == null) {
            return "";
        }
        return cep.replaceAll("[^0-9]", "");
    }

    
    private boolean validarCep(String cep) {
        return cep != null && cep.matches("^[0-9]{8}$");
    }

    
    public String formatarCep(String cep) {
        String cepLimpo = limparCep(cep);
        if (validarCep(cepLimpo)) {
            return cepLimpo.substring(0, 5) + "-" + cepLimpo.substring(5);
        }
        return cep;
    }
}
