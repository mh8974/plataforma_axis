package com.axis.service;

import com.axis.dto.CepConsultaResponseDTO;
import com.axis.dto.ViaCepResponseDTO;
import com.axis.exception.BadRequestException;
import com.axis.model.Cep;
import com.axis.repository.CepRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.Optional;


@Service
public class CepService {

    private static final Logger logger = LoggerFactory.getLogger(CepService.class);

    @Autowired
    private CepRepository cepRepository;

    @Autowired
    private ViaCepService viaCepService;

    
    @Transactional
    public CepConsultaResponseDTO buscarOuCriarCep(
        String cep,
        String modalidade,
        BigDecimal latitudeGPS,
        BigDecimal longitudeGPS
    ) {
        
        String cepLimpo = limparCep(cep);

        if (!validarCep(cepLimpo)) {
            throw new BadRequestException("CEP inválido. Use o formato 00000-000 ou 00000000");
        }

        String cepFormatado = formatarCep(cepLimpo);

        
        Optional<Cep> cepExistente = cepRepository.findByNrCep(cepFormatado);

        if (cepExistente.isPresent()) {
            logger.info("CEP {} encontrado no cache", cepFormatado);
            return mapToResponseDTO(cepExistente.get(), "CACHE");
        }

        
        if (latitudeGPS != null && longitudeGPS != null) {
            logger.info("GPS disponível para CEP {}, usando GPS + ViaCEP", cepFormatado);
            return buscarComGPS(cepFormatado, latitudeGPS, longitudeGPS);
        }

        
        logger.info("GPS não disponível para CEP {}, usando apenas ViaCEP", cepFormatado);
        return buscarComViaCep(cepFormatado);
    }

    
    @Transactional
    public Long processarEnderecoCadastro(
        String cep,
        String modalidadeAtendimento,
        BigDecimal latitudeGPS,
        BigDecimal longitudeGPS
    ) {
        
        if (cep == null || cep.trim().isEmpty()) {
            logger.debug("CEP não informado, retornando null");
            return null;
        }

        
        CepConsultaResponseDTO resultado = buscarOuCriarCep(
            cep,
            modalidadeAtendimento,
            latitudeGPS,
            longitudeGPS
        );

        
        logger.info("CEP processado com sucesso. id_cep={}, origem={}",
            resultado.getIdCep(), resultado.getOrigem());
        return resultado.getIdCep();
    }

    
    private CepConsultaResponseDTO buscarComGPS(String cep, BigDecimal latitude, BigDecimal longitude) {
        
        ViaCepResponseDTO viaCepData = viaCepService.buscar(cep);

        
        Cep novoCep = Cep.builder()
            .nrCep(cep)
            .nmLogradouro(viaCepData.getLogradouro())
            .nmBairro(viaCepData.getBairro())
            .dsComplemento(viaCepData.getComplemento())
            .cidade(viaCepData.getLocalidade())
            .uf(viaCepData.getUf())
            .codigoIbge(viaCepData.getIbge())
            .latitude(latitude)
            .longitude(longitude)
            .precisaoMetros(25) 
            .fonte("GPS")
            .build();

        Cep cepSalvo = cepRepository.save(novoCep);
        logger.info("CEP {} salvo com GPS (lat: {}, lng: {})", cep, latitude, longitude);

        return mapToResponseDTO(cepSalvo, "GPS + ViaCEP");
    }

    
    private CepConsultaResponseDTO buscarComViaCep(String cep) {
        ViaCepResponseDTO viaCepData = viaCepService.buscar(cep);

        
        Cep novoCep = Cep.builder()
            .nrCep(cep)
            .nmLogradouro(viaCepData.getLogradouro())
            .nmBairro(viaCepData.getBairro())
            .dsComplemento(viaCepData.getComplemento())
            .cidade(viaCepData.getLocalidade())
            .uf(viaCepData.getUf())
            .codigoIbge(viaCepData.getIbge())
            .latitude(null) 
            .longitude(null)
            .precisaoMetros(null)
            .fonte("VIACEP")
            .build();

        Cep cepSalvo = cepRepository.save(novoCep);
        logger.info("CEP {} salvo com ViaCEP (sem geolocalização)", cep);

        return mapToResponseDTO(cepSalvo, "ViaCEP");
    }

    
    private CepConsultaResponseDTO mapToResponseDTO(Cep cep, String origem) {
        return CepConsultaResponseDTO.builder()
            .idCep(cep.getIdCep())
            .cep(cep.getNrCep())
            .logradouro(cep.getNmLogradouro())
            .bairro(cep.getNmBairro())
            .complemento(cep.getDsComplemento())
            .cidade(cep.getCidade())
            .uf(cep.getUf())
            .codigoIbge(cep.getCodigoIbge())
            .latitude(cep.getLatitude())
            .longitude(cep.getLongitude())
            .precisaoMetros(cep.getPrecisaoMetros())
            .fonte(cep.getFonte())
            .origem(origem)
            .temGeolocalizacao(cep.hasGeolocation())
            .build();
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

    
    private String formatarCep(String cep) {
        if (cep != null && cep.length() == 8) {
            return cep.substring(0, 5) + "-" + cep.substring(5);
        }
        return cep;
    }
}
